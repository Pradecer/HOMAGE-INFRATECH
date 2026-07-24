import os
import re
from pathlib import Path

root = Path(r"c:\Users\HP\Documents\GitHub\HOMAGE-INFRATECH")
brochure_dir = root / "brochure"
html_files = [f for f in root.rglob("*.html") if ".git" not in f.parts and "scratch" not in f.parts and "inspect" not in f.name and "test" not in f.name]

print(f"Total HTML pages: {len(html_files)}")

# 1. Check all openBrochureModal calls
obm_regex = re.compile(r"openBrochureModal\(\s*['\"]([^'\"]+)['\"]\s*,\s*['\"]([^'\"]+)['\"]\s*\)")
missing_brochures = []
obm_count = 0

for html in html_files:
    content = html.read_text(encoding="utf-8", errors="ignore")
    for proj_name, pdf_name in obm_regex.findall(content):
        obm_count += 1
        # resolve pdf
        pdf_path = brochure_dir / pdf_name
        if not pdf_path.exists():
            missing_brochures.append((str(html.relative_to(root)), proj_name, pdf_name))

print(f"Total openBrochureModal calls: {obm_count}")
print(f"Missing brochure PDFs from openBrochureModal: {len(missing_brochures)}")
for src, proj, pdf in missing_brochures:
    print(f"  In {src}: Project '{proj}' -> File '{pdf}' NOT FOUND in brochure/")

# 2. Check downloadBrochure calls
db_regex = re.compile(r"downloadBrochure\(\s*['\"]([^'\"]+)['\"]\s*\)")
db_count = 0
for html in html_files:
    content = html.read_text(encoding="utf-8", errors="ignore")
    for proj_key in db_regex.findall(content):
        db_count += 1

print(f"Total downloadBrochure calls: {db_count}")

# 3. Check onclick functions
onclick_regex = re.compile(r'onclick=["\']([^"\']+)["\']')
onclick_calls = set()
for html in html_files:
    content = html.read_text(encoding="utf-8", errors="ignore")
    for fn in onclick_regex.findall(content):
        onclick_calls.add(fn)

print("\nOnclick handlers found in HTML:")
for fn in sorted(onclick_calls):
    print(f"  - {fn}")
