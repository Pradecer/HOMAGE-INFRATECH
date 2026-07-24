import os
import re
from pathlib import Path

root = Path(r"c:\Users\HP\Documents\GitHub\HOMAGE-INFRATECH")
html_files = [f for f in root.rglob("*.html") if ".git" not in f.parts and "scratch" not in f.parts]

broken_links = []
href_regex = re.compile(r'href=["\']([^"\']+)["\']')
src_regex = re.compile(r'src=["\']([^"\']+)["\']')

for html_file in html_files:
    content = html_file.read_text(encoding="utf-8", errors="ignore")
    
    # Check HREFs
    for href in href_regex.findall(content):
        clean_href = href.split("#")[0].split("?")[0]
        if not clean_href or clean_href.startswith(("http:", "https:", "tel:", "mailto:", "javascript:", "https://wa.me", "wa.me", "#")):
            continue
        target_path = (html_file.parent / clean_href).resolve()
        if not target_path.exists():
            broken_links.append((str(html_file.relative_to(root)), "href", href, str(target_path)))
            
    # Check SRCs
    for src in src_regex.findall(content):
        clean_src = src.split("#")[0].split("?")[0]
        if not clean_src or clean_src.startswith(("http:", "https:", "data:", "javascript:")):
            continue
        target_path = (html_file.parent / clean_src).resolve()
        if not target_path.exists():
            broken_links.append((str(html_file.relative_to(root)), "src", src, str(target_path)))

print(f"Total HTML files scanned: {len(html_files)}")
print(f"Total broken references found: {len(broken_links)}")
for src_file, ref_type, link, target in broken_links:
    print(f"[{ref_type.upper()}] In {src_file}: {link}")
