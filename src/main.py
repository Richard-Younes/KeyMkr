from flask import Flask
from flask_socketio import SocketIO, emit
from engineio.payload import Payload
from lava_algorithm import generate_key
from mouse_algorithm import get_key_from_mouse_events
from urllib import request

Payload.max_decode_packets = 1024

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")


@socketio.on("image")
def image(data_image, n: int = 256):
    data = b""
    with request.urlopen(data_image) as response:
        data = response.read()
    emit("response_back_lava", generate_key(data, n))


@socketio.on("mouse-list")
def image(list):
    emit("response_back_mouse", get_key_from_mouse_events(list))


if __name__ == "__main__":
    socketio.run(app, host="0.0.0.0", debug=True)
