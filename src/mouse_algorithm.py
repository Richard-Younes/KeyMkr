import hashlib

def get_key_from_mouse_events(mouse_coords: list):
    hashes = [hash_number(x[0]*x[1]) for x in mouse_coords]
    key = 0
    for index, hash in enumerate(hashes):
        if index == 0:
            key = hash
        else:
            key = xor_bytes(key, hash)
    return key.hex()

def hash_number(num: int):
    number_bytes = num.to_bytes(8, byteorder='big')
    sha256 = hashlib.sha256()
    sha256.update(number_bytes)
    return sha256.digest()

def xor_bytes(bytearray1, bytearray2):
    return bytearray([a ^ b for a, b in zip(bytearray1, bytearray2)])


# if __name__ == '__main__':
#     list = [
#         (100, 100),
#         (203, 204),
#         (205, 205)
#     ]
#     key = get_key_from_mouse_events(list)
#     print(key)