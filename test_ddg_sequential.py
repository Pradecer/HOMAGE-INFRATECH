import urllib.parse
import requests
import time

queries = [
    "BPTP Resort Sector 75 Faridabad Haryana real photos",
    "Adore Pride Sector 75 Faridabad Haryana real photos",
    "Terra Lavinium Sector 75 Faridabad Haryana real photos"
]

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36"
}

for i, query in enumerate(queries, 1):
    url = f"https://html.duckduckgo.com/html/?q={urllib.parse.quote(query)}"
    try:
        response = requests.get(url, headers=headers, timeout=10)
        print(f"Query {i}: Status={response.status_code}, Length={len(response.text)}")
    except Exception as e:
        print(f"Query {i}: Failed with exception: {e}")
    time.sleep(5)
