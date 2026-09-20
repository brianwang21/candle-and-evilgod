from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent / 'images'


def max_width_for(path: Path) -> int:
    rel = path.as_posix()
    if '/profile_icon/' in rel:
        return 512
    if '/HomePage/' in rel:
        return 1920
    if 'force_' in path.name:
        return 1600
    if 'FullSize' in path.name:
        return 1600
    if 'Head' in path.name:
        return 1200
    if 'ICON' in path.name.upper() or 'icon' in path.name:
        return 512
    return 1600


def prepare(im: Image.Image) -> Image.Image:
    if im.mode in ('RGBA', 'RGB'):
        return im
    if im.mode == 'P':
        return im.convert('RGBA' if 'transparency' in im.info else 'RGB')
    if im.mode == 'LA':
        return im.convert('RGBA')
    return im.convert('RGB')


rows = []
for src in sorted(ROOT.rglob('*')):
    if src.suffix.lower() not in {'.png', '.jpg', '.jpeg'} or src.name.startswith('.'):
        continue
    out = src.with_suffix('.webp')
    with Image.open(src) as im:
        im = prepare(im)
        max_w = max_width_for(src)
        if im.width > max_w:
            ratio = max_w / im.width
            im = im.resize((max_w, max(1, round(im.height * ratio))), Image.Resampling.LANCZOS)
        im.save(out, 'WEBP', quality=78, method=6)
    before = src.stat().st_size
    after = out.stat().st_size
    rows.append((before, after, src.relative_to(ROOT).as_posix()))

rows.sort(reverse=True)
print('file'.ljust(72), 'before', 'after')
for before, after, rel in rows[:35]:
    print(f'{rel:72} {before/1024:8.1f} {after/1024:8.1f}')
print(f'\nconverted {len(rows)} files: {sum(r[0] for r in rows)/1024:.0f} KB -> {sum(r[1] for r in rows)/1024:.0f} KB webp')
