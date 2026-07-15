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

# Let's search for "http" and print what surrounds it
print("Occurrences of http in html:")
for match in re.finditer(r'href="([^"]+)"', html):
    val = match.group(1)
    if "rps" in val.lower() or "savana" in val.lower() or "99acres" in val.lower():
        print("  Found key link:", val)

# Print first few link attributes
links = re.findall(r'<a\s+[^>]*href=["\']([^"\']+)["\']', html)
print(f"Total links found using <a href>: {len(links)}")
for l in links[:20]:
    print("  Link:", l)
