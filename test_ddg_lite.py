import urllib.parse
import requests
import re

query = "RPS Savana Faridabad Haryana real photos"
url = "https://lite.duckduckgo.com/lite/"
data = {
    "q": query
}
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
    "Content-Type": "application/x-www-form-urlencoded"
}

response = requests.post(url, data=data, headers=headers, timeout=10)
print(f"DDG Lite Status: {response.status_code}")
print(f"DDG Lite Content length: {len(response.text)}")

# Find all form submissions or links containing external URLs in the search results
links = re.findall(r'href="([^"]+)"', response.text)
external_links = []
for l in links:
    if "duckduckgo" not in l and l.startswith("http"):
        external_links.append(l)

print(f"Found {len(external_links)} external links:")
for i, l in enumerate(external_links[:15], 1):
    print(f"  {i}. {l}")
