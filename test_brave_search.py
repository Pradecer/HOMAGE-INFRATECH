import urllib.parse
import requests
import re

query = "RPS Savana Faridabad Haryana real photos"
url = f"https://search.brave.com/search?q={urllib.parse.quote(query)}"
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36"
}

try:
    response = requests.get(url, headers=headers, timeout=10)
    print(f"Brave Status: {response.status_code}")
    print(f"Brave Content length: {len(response.text)}")
    
    # Extract links
    links = re.findall(r'href="([^"]+)"', response.text)
    filtered = []
    for l in links:
        if l.startswith("http") and "brave.com" not in l:
            filtered.append(l)
            
    print(f"Found {len(filtered)} candidate links:")
    for i, u in enumerate(filtered[:10], 1):
        print(f"  {i}. {u}")
except Exception as e:
    print(f"Brave search error: {e}")
