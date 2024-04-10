import hashlib
import random

def generate_key(img_bytes: bytes, n: int = 256):
    img_hash = hashlib.sha256(img_bytes).hexdigest()
    random.seed(img_hash)
    return (random.randbytes(n // 8)).hex()
