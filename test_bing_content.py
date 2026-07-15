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
    html = response.text
    
    output = []
    output.append(f"HTML length: {len(html)}")
    
    # Save occurrence contexts
    for match in re.finditer(r'savana', html, re.IGNORECASE):
        start = max(0, match.start() - 100)
        end = min(len(html), match.end() + 100)
        output.append(f"--- Context ---\n{html[start:end]}\n")
        
    with open("bing_savana_contexts.txt", "w", encoding="utf-8") as f:
        f.write("\n".join(output))
    print("Contexts written to bing_savana_contexts.txt successfully!")
except Exception as e:
    print(f"Error: {e}")
