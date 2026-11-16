"""Add the hidden watermark band to photos, in place.

Each photo gets a navy band added under it with the white TP mark and the
company name. The site never shows the band: <BandedImage> sizes its frame to
the photo's own shape and clips the band off (see src/lib/band.ts). Anyone
who opens the file in a new tab, saves it, or finds it on Google Images gets
the whole file, band included. The script also regenerates the photo's
thumb/ copy (from the clean photo, with its own band) and embeds copyright
XMP (creator, credit, rights) that Google Images can show.

NOT idempotent: run it once per photo, on a clean file. After adding a
photo, keep its width/height in site-config as the CLEAN photo's size.
Usage, from the repo root:

    python3 scripts/watermark.py public/images/projects/<slug>/project-NN-NN.webp ...

Needs Pillow and webpmux (brew install webp).
"""

import os
import subprocess
import sys
import tempfile

from PIL import Image, ImageDraw, ImageFont

LOGO = Image.open("public/images/logo-mark-white.png").convert("RGBA")
FONT = "assets/fonts/Poppins-Bold.ttf"
NAVY = (2, 38, 98)
TEXTS = ["Teguh Perintis Sdn. Bhd.  ·  teguhperintis.com", "Teguh Perintis Sdn. Bhd.", "Teguh Perintis"]
XMP = """<?xpacket begin='﻿' id='W5M0MpCehiHzreSzNTczkc9d'?>
<x:xmpmeta xmlns:x='adobe:ns:meta/'><rdf:RDF xmlns:rdf='http://www.w3.org/1999/02/22-rdf-syntax-ns#'>
<rdf:Description rdf:about='' xmlns:dc='http://purl.org/dc/elements/1.1/' xmlns:photoshop='http://ns.adobe.com/photoshop/1.0/' xmlns:xmpRights='http://ns.adobe.com/xap/1.0/rights/'>
<dc:creator><rdf:Seq><rdf:li>Teguh Perintis Sdn. Bhd.</rdf:li></rdf:Seq></dc:creator>
<photoshop:Credit>Teguh Perintis Sdn. Bhd.</photoshop:Credit>
<dc:rights><rdf:Alt><rdf:li xml:lang='x-default'>&#169; Teguh Perintis Sdn. Bhd. All rights reserved.</rdf:li></rdf:Alt></dc:rights>
<xmpRights:Marked>True</xmpRights:Marked>
<xmpRights:WebStatement>https://teguhperintis.com/contact</xmpRights:WebStatement>
</rdf:Description></rdf:RDF></x:xmpmeta>
<?xpacket end='w'?>"""


def band_height(w):
    """Keep in sync with bandHeight() in src/lib/band.ts."""
    return max(24, round(w * 0.06))


def with_band(photo):
    """The photo with the watermark band added under it."""
    w, h = photo.size
    bh = band_height(w)
    out = Image.new("RGB", (w, h + bh), NAVY)
    out.paste(photo.convert("RGB"), (0, 0))

    logo_h = round(bh * 0.55)
    logo = LOGO.resize((round(LOGO.width * logo_h / LOGO.height), logo_h), Image.LANCZOS)
    font = ImageFont.truetype(FONT, max(9, round(bh * 0.36)))
    gap = round(logo_h * 0.4)
    # The longest wording that fits, centred.
    for text in TEXTS:
        total = logo.width + gap + round(font.getlength(text))
        if total <= w - 2 * gap:
            break
    x = (w - total) // 2
    y = h + (bh - logo_h) // 2
    out.paste(logo, (x, y), logo)
    ImageDraw.Draw(out).text(
        (x + logo.width + gap, h + bh / 2), text, font=font, fill=(255, 255, 255), anchor="lm"
    )
    return out


def save_webp(img, path):
    img.save(path, "WEBP", quality=74, method=6)
    with tempfile.NamedTemporaryFile("w", suffix=".xmp", delete=False) as f:
        f.write(XMP)
    try:
        subprocess.run(
            ["webpmux", "-set", "xmp", f.name, path, "-o", path], check=True, capture_output=True
        )
    finally:
        os.unlink(f.name)


def process(path):
    photo = Image.open(path).convert("RGB")
    thumb = os.path.join(os.path.dirname(path), "thumb", os.path.basename(path))
    if os.path.exists(thumb):
        size = Image.open(thumb).size
        save_webp(with_band(photo.resize(size, Image.LANCZOS)), thumb)
    save_webp(with_band(photo), path)


if __name__ == "__main__":
    for p in sys.argv[1:]:
        process(p)
        print("ok", p)
