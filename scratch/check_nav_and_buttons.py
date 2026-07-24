import os
import re
from pathlib import Path

root = Path(r"c:\Users\HP\Documents\GitHub\HOMAGE-INFRATECH")
html_files = [f for f in root.rglob("*.html") if ".git" not in f.parts and "scratch" not in f.parts and "inspect" not in f.name and "test" not in f.name]

missing_hamburger = []
missing_common_js = []
missing_whatsapp = []
missing_call = []

for html in html_files:
    content = html.read_text(encoding="utf-8", errors="ignore")
    rel_path = str(html.relative_to(root))
    
    if "hamburger" not in content:
        missing_hamburger.append(rel_path)
    if "common.js" not in content:
        missing_common_js.append(rel_path)
    if "btn-whatsapp" not in content and "wa.me" not in content:
        missing_whatsapp.append(rel_path)
    if "btn-call" not in content and "tel:" not in content:
        missing_call.append(rel_path)

print(f"HTML files missing hamburger button: {len(missing_hamburger)}")
for f in missing_hamburger:
    print(f"  - {f}")

print(f"\nHTML files missing common.js: {len(missing_common_js)}")
for f in missing_common_js:
    print(f"  - {f}")

print(f"\nHTML files missing WhatsApp button: {len(missing_whatsapp)}")
for f in missing_whatsapp:
    print(f"  - {f}")

print(f"\nHTML files missing Call button: {len(missing_call)}")
for f in missing_call:
    print(f"  - {f}")
