import urllib.parse
import requests
import re

query = "RPS Savana Faridabad Haryana real photos"
url = f"https://html.duckduckgo.com/html/?q={urllib.parse.quote(query)}"
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36"
}

response = requests.get(url, headers=headers, timeout=10)
print(f"DDG Response length: {len(response.text)}")

# Find links containing uddg (DuckDuckGo's result redirection links)
links = re.findall(r'href="[^"]*?uddg=([^"&]+)', response.text)
decoded_links = []
for link in links:
    decoded = urllib.parse.unquote(link)
    if decoded.startswith("http"):
        decoded_links.append(decoded)

print(f"Found {len(decoded_links)} candidate links:")
for i, l in enumerate(decoded_links[:10], 1):
    print(f"  {i}. {l}")
