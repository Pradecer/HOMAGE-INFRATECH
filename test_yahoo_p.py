import urllib.parse
import requests
import re

query = "RPS Savana Faridabad Haryana real photos"
url = f"https://search.yahoo.com/search?p={urllib.parse.quote(query)}"
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36"
}

try:
    response = requests.get(url, headers=headers, timeout=10)
    print(f"Yahoo Status: {response.status_code}")
    print(f"Yahoo Content length: {len(response.text)}")
    
    # Save to inspect
    with open("yahoo_p_inspect.html", "w", encoding="utf-8") as f:
        f.write(response.text)
        
    title = re.findall(r'<title>(.*?)</title>', response.text, re.IGNORECASE)
    print("Title:", title)
    
    # Yahoo result links are inside href="HTTPS_URL"
    # Find all hrefs starting with http
    links = re.findall(r'href="([^"]+)"', response.text)
    filtered = []
    for l in links:
        l_lower = l.lower()
        if l.startswith("http") and not any(x in l_lower for x in ["yahoo.com", "yimg.com", "yahoo.co.in", "javascript"]):
            filtered.append(l)
            
    print(f"Found {len(filtered)} candidate links:")
    for i, u in enumerate(filtered[:15], 1):
        print(f"  {i}. {u}")
except Exception as e:
    print(f"Yahoo search error: {e}")
