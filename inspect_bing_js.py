import urllib.parse
import requests
import re

query = "RPS Savana Faridabad Haryana real photos"
url = f"https://www.bing.com/search?q={urllib.parse.quote(query)}"
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36"
}

response = requests.get(url, headers=headers, timeout=10)
html = response.text

# Extract all script block contents
scripts = re.findall(r'<script[^>]*>(.*?)</script>', html, re.DOTALL | re.IGNORECASE)
print(f"Found {len(scripts)} script blocks.")

# Search for any URL-like strings or portal domains inside the scripts
found_urls = []
for i, s in enumerate(scripts, 1):
    # Search for domains of interest or general absolute URLs
    urls = re.findall(r'(https?://[^\s"\'\\<>]+)', s)
    for u in urls:
        u_clean = u.split('\\')[0].split('"')[0].split("'")[0]  # clean up escapes
        if any(domain in u_clean.lower() for domain in ["99acres", "magicbricks", "housing", "shikharrealty", "realty"]):
            found_urls.append((i, u_clean))

print(f"Found {len(found_urls)} matching URLs in JS scripts:")
for block_num, u in found_urls[:20]:
    print(f"  Block {block_num}: {u}")
