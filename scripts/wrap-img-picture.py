from pathlib import Path
import re

ROOT = Path(__file__).resolve().parent.parent
FILES = [
    ROOT / 'anomaly-event.html',
    ROOT / 'faction-morris-major.html',
    ROOT / 'anomaly_html' / 'O-EXM-125.html',
    ROOT / 'anomaly_html' / 'OP-UKS-420.html',
    ROOT / 'anomaly_html' / 'P-ANM-111.html',
    ROOT / 'anomaly_html' / 'P-ANS-909.html',
]

IMG = re.compile(
    r'<img(?P<pre>\s[^>]*?)src="(?P<src>[^"]+\.(?:png|jpe?g|PNG|JPG|JPEG))"(?P<post>[^>]*)>',
    re.IGNORECASE,
)


def webp_src(src: str) -> str:
    return re.sub(r'\.(png|jpe?g)$', '.webp', src, flags=re.I)


def transform(text: str) -> str:
    def repl(m: re.Match) -> str:
        start = m.start()
        prefix = text[max(0, start - 120) : start]
        if '<source type="image/webp"' in prefix or '<!--' in prefix.splitlines()[-1]:
            return m.group(0)
        pre, src, post = m.group('pre'), m.group('src'), m.group('post')
        attrs = pre + post
        if 'loading=' not in attrs:
            attrs += ' loading="lazy"'
        if 'decoding=' not in attrs:
            attrs += ' decoding="async"'
        return (
            f'<picture><source type="image/webp" srcset="{webp_src(src)}">'
            f'<img{attrs} src="{src}"></picture>'
        )

    return IMG.sub(repl, text)


for path in FILES:
    original = path.read_text(encoding='utf-8')
    updated = transform(original)
    if updated != original:
        path.write_text(updated, encoding='utf-8')
        print('updated', path.name)
    else:
        print('unchanged', path.name)
