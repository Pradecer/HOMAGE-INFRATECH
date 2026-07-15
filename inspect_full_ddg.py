import urllib.parse
import requests
import re

query = "RPS Savana Faridabad Haryana real photos"
url = f"https://html.duckduckgo.com/html/?q={urllib.parse.quote(query)}"
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36"
}

response = requests.get(url, headers=headers, timeout=10)
html = response.text

# Find all a tags and print those containing "uddg=" or other result indicators
links = re.findall(r'href="([^"]+)"', html)
print(f"Total hrefs in full response: {len(links)}")

# Search for "result__a" class or links containing typical search result domains
result_links = []
for l in links:
    if "uddg=" in l:
        result_links.append(urllib.parse.unquote(l.split("uddg=")[1].split("&")[0]))
    elif "duckduckgo" not in l and l.startswith("http"):
        result_links.append(l)

print(f"Parsed {len(result_links)} result links:")
for i, l in enumerate(result_links[:10], 1):
    print(f"  {i}. {l}")

# Let's inspect the middle of the document if result_links is empty
if len(result_links) == 0:
    print("\nNo result links found! Showing part of body:")
    body_match = re.search(r'<body[^>]*>(.*)</body>', html, re.DOTALL | re.IGNORECASE)
    if body_match:
        body = body_match.group(1)
        print(body[:2000])
