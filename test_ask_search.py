import urllib.parse
import requests
import re

query = "RPS Savana Faridabad Haryana real photos"
url = f"https://www.ask.com/web?q={urllib.parse.quote(query)}"
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36"
}

try:
    response = requests.get(url, headers=headers, timeout=10)
    print(f"Ask Status: {response.status_code}")
    print(f"Ask Content length: {len(response.text)}")
    
    # Find links in Ask.com search results
    # Links usually are direct or inside result containers
    urls = re.findall(r'href="(https?://[^"]+)"', response.text)
    filtered = []
    for u in urls:
        if "ask.com" not in u and "static-ask" not in u:
            filtered.append(u)
            
    print(f"Found {len(filtered)} candidate links:")
    for i, u in enumerate(filtered[:10], 1):
        print(f"  {i}. {u}")
except Exception as e:
    print(f"Ask test error: {e}")
