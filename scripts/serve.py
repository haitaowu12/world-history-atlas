"""Serve the buildless atlas locally, including its concurrent data requests."""
import argparse
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path


class AtlasServer(ThreadingHTTPServer):
    request_queue_size = 128


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--port", type=int, default=8080)
    args = parser.parse_args()
    directory = Path(__file__).resolve().parent.parent / "dist"
    with AtlasServer(("127.0.0.1", args.port), partial(SimpleHTTPRequestHandler, directory=str(directory))) as server:
        print(f"World History Atlas: http://127.0.0.1:{args.port}", flush=True)
        try:
            server.serve_forever()
        except KeyboardInterrupt:
            print("\nAtlas stopped.")
