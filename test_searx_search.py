import urllib.parse
import requests
import re

query = "RPS Savana Faridabad Haryana real photos"
url = f"https://searx.be/search?q={urllib.parse.quote(query)}"
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36"
}

try:
    response = requests.get(url, headers=headers, timeout=12)
    print(f"Searx Status: {response.status_code}")
    print(f"Searx Content length: {len(response.text)}")
    
    # Extract links from Searx HTML
    # Searx result links are usually in: <a href="URL" class="result-title" or <h4 class="result-default"><a href="URL"
    links = re.findall(r'href="([^"]+)"', response.text)
    filtered = []
    for l in links:
        if l.startswith("http") and not any(x in l for x in ["searx", "github", "twitter.com", "facebook.com"]):
            filtered.append(l)
            
    print(f"Found {len(filtered)} candidate links:")
    for i, u in enumerate(filtered[:10], 1):
        print(f"  {i}. {u}")
except Exception as e:
    print(f"Searx search error: {e}")
