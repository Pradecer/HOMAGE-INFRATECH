import urllib.parse
import requests
import re

query = "RPS Savana Faridabad Haryana real photos"
url = f"https://www.ecosia.org/search?q={urllib.parse.quote(query)}"
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36"
}

try:
    response = requests.get(url, headers=headers, timeout=10)
    print(f"Ecosia Status: {response.status_code}")
    print(f"Ecosia Content length: {len(response.text)}")
    
    # Find candidate links
    # Ecosia search results links typically have class="result-title" or hrefs matching external sites
    urls = re.findall(r'href="(https?://[^"]+)"', response.text)
    filtered = []
    for u in urls:
        if "ecosia" not in u and "microsoft" not in u:
            filtered.append(u)
            
    print(f"Found {len(filtered)} candidate links:")
    for i, u in enumerate(filtered[:10], 1):
        print(f"  {i}. {u}")
except Exception as e:
    print(f"Ecosia test error: {e}")
