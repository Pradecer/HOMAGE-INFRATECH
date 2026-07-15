import urllib.parse
import requests
import re

query = "RPS Savana Faridabad Haryana real photos"
url = f"https://www.bing.com/images/search?q={urllib.parse.quote(query)}"
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36"
}

response = requests.get(url, headers=headers, timeout=10)
html = response.text

# Save the full html response to inspect locally
with open("bing_images.html", "w", encoding="utf-8") as f:
    f.write(html)

print("Searching for 'murl' occurrences:")
murl_matches = [m.start() for m in re.finditer('murl', html, re.IGNORECASE)]
print(f"Found {len(murl_matches)} occurrences of 'murl'.")
for idx in murl_matches[:5]:
    print("--- snippet ---")
    print(html[idx-50:idx+150])

print("\nSearching for other image extensions:")
urls = re.findall(r'(https?://[^\s"\'\\<>]+?\.(?:jpg|png|jpeg))', html)
print(f"Found {len(urls)} URLs ending with image extensions directly:")
for u in urls[:5]:
    print("  ", u)
