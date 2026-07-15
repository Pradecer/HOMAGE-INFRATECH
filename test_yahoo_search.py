import urllib.parse
import requests
import re

query = "RPS Savana Faridabad Haryana real photos"
url = f"https://search.yahoo.com/search?q={urllib.parse.quote(query)}"
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36"
}

response = requests.get(url, headers=headers, timeout=10)
print(f"Yahoo Response length: {len(response.text)}")

# Find links starting with http in Yahoo search results
# Yahoo links are typically inside class=" d-ib fz-20 lh-26 td-hu title" or similar
urls = re.findall(r'href="(https?://[^"]+)"', response.text)
filtered = []
for u in urls:
    if "yahoo.com" not in u and "yimg.com" not in u:
        filtered.append(u)

print(f"Found {len(filtered)} candidate links:")
for i, u in enumerate(filtered[:10], 1):
    print(f"  {i}. {u}")
