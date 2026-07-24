import fitz, PIL.Image, io, os

def compress_pdf(pdf_path):
    if not os.path.exists(pdf_path):
        return
    print(f"Compressing {pdf_path}...")
    doc = fitz.open(pdf_path)
    for page in doc:
        for img_info in page.get_images():
            xref = img_info[0]
            try:
                base_img = doc.extract_image(xref)
                image = PIL.Image.open(io.BytesIO(base_img["image"])).convert("RGB")
                buf = io.BytesIO()
                image.save(buf, format="JPEG", quality=45, optimize=True)
                page.replace_image(xref, stream=buf.getvalue())
            except Exception:
                pass
    tmp_path = pdf_path + ".tmp"
    doc.save(tmp_path, garbage=4, deflate=True)
    doc.close()
    os.replace(tmp_path, pdf_path)
    print(f"Done {pdf_path}: {os.path.getsize(pdf_path)/(1024*1024):.2f} MB")

compress_pdf(r"brochure\Emerald Maple sec- 97 (1).pdf")
compress_pdf(r"assets\brochures\Emerald Maple sec- 97 (1).pdf")
