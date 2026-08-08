from __future__ import annotations

import hashlib
import subprocess
import tempfile
from pathlib import Path

from PIL import Image, ImageOps


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "images" / "gallery"
HEIF_CONVERT = Path(r"C:\Users\User\.cache\codex-runtimes\codex-primary-runtime\dependencies\bin\override\heif-convert.cmd")

ASSETS = [
    (r"C:\Users\User\AppData\Local\Temp\codex-clipboard-b43cd287-8434-4fc7-83ca-9ce724bad633.jpg", "fathu-dhoni"),
    (r"C:\Users\User\AppData\Local\Temp\codex-clipboard-d1d9157a-0ad6-4a03-83e9-bf5438f40c54.jpg", "schooling-snapper"),
    (r"C:\Users\User\AppData\Local\Temp\codex-clipboard-a99718fb-9fda-4042-854a-d14153197d1e.jpg", "clownfish-purple-anemone"),
    (r"C:\Users\User\AppData\Local\Temp\codex-clipboard-f5e375e2-e345-4e10-ad99-0d70f289dc99.jpg", "reef-bubbles"),
    (r"C:\Users\User\AppData\Local\Temp\codex-clipboard-73ab061d-e3cc-4cb6-b921-b058ebaf116c.jpg", "feather-star-night"),
    (r"C:\Users\User\AppData\Local\Temp\codex-clipboard-33b6f02d-c01d-4a32-a365-118a791cde45.jpg", "sunlit-coral-garden"),
    (r"C:\Users\User\AppData\Local\Temp\codex-clipboard-cb8f380f-d09f-405e-800c-f1515f1dd6b8.jpg", "clownfish-anemone"),
    (r"C:\Users\User\AppData\Local\Temp\codex-clipboard-447de0a4-d4b5-4458-9d95-6b1143dd7f63.jpg", "black-coral-slope"),
    (r"C:\Users\User\AppData\Local\Temp\codex-clipboard-a5f781f3-cb93-4b5e-a74d-c0a347b5a7ca.jpg", "reef-wall-diver"),
    (r"C:\Users\User\AppData\Local\Temp\codex-clipboard-0f154ccd-25f4-4f7f-ab77-3fb97e22c275.jpg", "reef-slope-diver"),
    (r"C:\Users\User\AppData\Local\Temp\codex-clipboard-bd4209df-a186-487e-8716-c04c5f3106f2.jpg", "anemone-garden-diver"),
    (r"C:\Users\User\AppData\Local\Temp\codex-clipboard-c910d763-90af-4a8c-a036-e3e8c92ccaac.jpg", "anemone-garden"),
    (r"C:\Users\User\AppData\Local\Temp\codex-clipboard-875e60aa-94c6-4ceb-bea1-8568ea3928de.jpg", "diver-schooling-fish"),
    (r"C:\Users\User\AppData\Local\Temp\codex-clipboard-ea5def6e-11c7-4b4a-9090-edc747eec95f.jpg", "guest-diver"),
    (r"C:\Users\User\AppData\Local\Temp\codex-clipboard-f5976156-732d-4a52-9d93-23d4b1aad93b.jpg", "schooling-fish-reef"),
    (r"C:\Users\User\AppData\Local\Temp\codex-clipboard-29191fd7-10b4-4a7a-93ef-a419fde637f0.jpg", "divers-over-reef"),
    (r"C:\Users\User\AppData\Local\Temp\codex-clipboard-93843d3c-5636-49e2-8cdb-0eab359f9829.jpg", "sea-fans-pinnacle"),
    (r"C:\Users\User\AppData\Local\Temp\codex-clipboard-9a8374b5-62b3-43a2-80f1-d09f30312e85.jpg", "manta-front"),
    (r"C:\Users\User\AppData\Local\Temp\codex-clipboard-cac6a13c-f451-4297-a276-e2e9789b739b.jpg", "manta-reef"),
    (r"C:\Users\User\AppData\Local\Temp\codex-clipboard-4f3bdd24-42d6-4848-ae03-295b9978cb33.jpg", "vertical-reef-wall"),
    (r"C:\Users\User\AppData\Local\Temp\codex-clipboard-6f8047ea-6b87-4d91-bbfd-76fb279e0ea6.jpg", "sea-fan-wall"),
    (r"C:\Users\User\AppData\Local\Temp\codex-clipboard-18102779-bebf-467f-9ad0-c734baa079ee.jpg", "sea-fan-dropoff"),
    (r"C:\Users\User\AppData\Local\Temp\codex-clipboard-1c5aa008-07ba-4e1a-86d0-2ad659e95e18.jpg", "manta-and-diver"),
    (r"C:\Users\User\AppData\Local\Temp\codex-clipboard-ee45c5a2-e6ab-4b4a-b7e6-68dfd6f643a0.jpg", "lagoon-training"),
    (r"C:\Users\User\AppData\Local\Temp\codex-clipboard-5d24604d-cfa7-403f-a2e9-c7cc22af5c22.jpg", "dive-centre-exterior"),
    (r"C:\Users\User\AppData\Local\Temp\codex-clipboard-87dc2234-674b-44b7-8d34-adbc3aa98a37.jpg", "dive-centre-reception"),
    (r"C:\Users\User\AppData\Local\Temp\codex-clipboard-30cc0931-3fc1-4db9-8726-bb2f98bdf999.jpg", "dive-centre-interior"),
    (r"C:\Users\User\AppData\Local\Temp\codex-clipboard-309413ba-6961-4d7f-b428-8dc671f6f86c.jpg", "dive-centre-floor"),
    (r"C:\Users\User\AppData\Local\Temp\codex-clipboard-17015a55-c174-49e4-b3f2-8aa50dbcf29d.jpg", "batfish"),
    (r"C:\Users\User\AppData\Local\Temp\codex-clipboard-f4543e2a-abfa-42a3-8b6c-2dd558e6b150.png", "blue-water-diver"),
    (r"C:\Users\User\Downloads\IMG_9854.heic", "guest-dive-9854"),
    (r"C:\Users\User\Downloads\IMG_9872.heic", "guest-dive-9872"),
    (r"C:\Users\User\Downloads\IMG_9878.heic", "guest-dive-9878"),
    (r"C:\Users\User\Downloads\IMG_1079.heic", "guest-dive-1079"),
    (r"C:\Users\User\Downloads\IMG_0296 (1).heic", "guest-dive-0296"),
    (r"C:\Users\User\Downloads\IMG_0293.heic", "guest-dive-0293"),
]


def digest(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def open_image(path: Path, temp_dir: Path) -> Image.Image:
    if path.suffix.lower() != ".heic":
        return Image.open(path)
    converted = temp_dir / f"{path.stem}.jpg"
    subprocess.run([str(HEIF_CONVERT), str(path), str(converted)], check=True)
    return Image.open(converted)


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    seen: set[str] = set()
    with tempfile.TemporaryDirectory() as temp:
        temp_dir = Path(temp)
        for source, name in ASSETS:
            path = Path(source)
            if not path.exists():
                raise FileNotFoundError(path)
            file_hash = digest(path)
            if file_hash in seen:
                print(f"Skipped duplicate: {path.name}")
                continue
            seen.add(file_hash)
            target = OUT / f"{name}.webp"
            if target.exists() and target.stat().st_size > 0:
                print(f"Already imported: {target.name}")
                continue
            with open_image(path, temp_dir) as raw:
                image = ImageOps.exif_transpose(raw).convert("RGB")
                image.thumbnail((2400, 2400), Image.Resampling.LANCZOS)
                image.save(target, "WEBP", quality=86, method=4)
                print(f"{target.name}: {image.width}x{image.height}")


if __name__ == "__main__":
    main()
