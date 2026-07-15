import urllib.parse
import requests
import re

query = "RPS Savana Faridabad Haryana real photos"
url = f"https://www.bing.com/search?q={urllib.parse.quote(query)}"
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36"
}

try:
    response = requests.get(url, headers=headers, timeout=10)
    print(f"Bing Status: {response.status_code}")
    print(f"Bing Content length: {len(response.text)}")
    
    # Extract links inside h2 elements which are the search result headers
    # Example: <li class="b_algo"><h2><a href="URL" ...>
    h2_blocks = re.findall(r'<li class="b_algo">.*?<h2><a\s+[^>]*href="([^"]+)"', response.text, re.DOTALL)
    print(f"Found {len(h2_blocks)} links in h2 blocks:")
    for i, l in enumerate(h2_blocks, 1):
        print(f"  {i}. {l}")
        
    # General a href extraction
    all_links = re.findall(r'<a\s+[^>]*href="([^"]+)"', response.text)
    external_links = []
    for l in all_links:
        l_lower = l.lower()
        if l.startswith("http") and not any(x in l_lower for x in ["bing.com", "microsoft.com", "msn.com", "live.com", "go.microsoft.com", "javascript", "google.com"]):
            external_links.append(l)
            
    print(f"Found {len(external_links)} total external links:")
    for i, l in enumerate(external_links[:15], 1):
        print(f"  {i}. {l}")
except Exception as e:
    print(f"Bing search error: {e}")
