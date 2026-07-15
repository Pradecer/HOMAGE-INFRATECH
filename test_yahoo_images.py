import urllib.parse
import requests
import re

query = "RPS Savana Faridabad Haryana real photos"
url = f"https://images.search.yahoo.com/search/images?p={urllib.parse.quote(query)}"
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36"
}

response = requests.get(url, headers=headers, timeout=10)
print(f"Yahoo Images Response length: {len(response.text)}")

# Yahoo Images has image URLs in JSON data-src attributes or in data-attributes or plain img tags
# Look for original image links: usually key "imgurl" or similar, or plain http image links
urls = re.findall(r'"imgurl":"(https?://[^"]+?\.(?:jpg|png|jpeg))"', response.text)
print(f"Found {len(urls)} direct image URLs:")
for i, u in enumerate(urls[:10], 1):
    print(f"  {i}. {u}")
