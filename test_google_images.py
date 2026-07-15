import urllib.parse
import requests
import re

query = "RPS Savana Faridabad Haryana real photos"
url = f"https://www.google.com/search?q={urllib.parse.quote(query)}&tbm=isch"
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36"
}

response = requests.get(url, headers=headers, timeout=10)
html = response.text

# Find anything that matches http or https
urls = re.findall(r'(https?://[^\s"\'\\<>]+)', html)
print(f"Total URL-like strings found: {len(urls)}")

# Show URLs ending with common extensions or having certain keywords
filtered = [u for u in urls if any(ext in u.lower() for ext in ['.jpg', '.jpeg', '.png', '.webp'])]
print(f"URLs with image extensions: {len(filtered)}")
for u in filtered[:5]:
    print("  ", u)

# Also check for base64 or other encodings
print("\nFirst 500 chars of HTML containing http:")
http_indices = [m.start() for m in re.finditer('http', html)]
for idx in http_indices[:3]:
    print("--- snippet ---")
    print(html[idx:idx+150])
