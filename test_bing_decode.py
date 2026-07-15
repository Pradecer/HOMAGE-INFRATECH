import urllib.parse
import requests
import re
import base64

query = "RPS Savana Faridabad Haryana real photos"
url = f"https://www.bing.com/search?q={urllib.parse.quote(query)}"
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36"
}

try:
    response = requests.get(url, headers=headers, timeout=10)
    html = response.text
    print(f"Bing HTML length: {len(html)}")
    
    # Search for tracking URLs like: /ck/a?u=a1HR0cHM6Ly93d3cuOTlhY3Jlcy5jb20v...
    # The u parameter is base64 encoded, but sometimes it starts with 'a1' (which corresponds to 'http' when base64 encoded!)
    tracking_urls = re.findall(r'href="([^"]*/ck/a\?u=a1[^"]+)"', html)
    print(f"Found {len(tracking_urls)} tracking URLs:")
    
    for i, t_url in enumerate(tracking_urls[:10], 1):
        # Extract the u parameter
        parsed = urllib.parse.urlparse(t_url)
        params = urllib.parse.parse_qs(parsed.query)
        u_val = params.get('u', [''])[0]
        
        # Remove 'a1' prefix if present
        if u_val.startswith('a1'):
            u_val = u_val[2:]
            
        # Add padding if needed
        padding = len(u_val) % 4
        if padding:
            u_val += '=' * (4 - padding)
            
        try:
            decoded = base64.b64decode(u_val).decode('utf-8', errors='ignore')
            print(f"  {i}. {decoded}")
        except Exception as e:
            print(f"  {i}. Failed to decode {u_val}: {e}")
except Exception as e:
    print(f"Error: {e}")
