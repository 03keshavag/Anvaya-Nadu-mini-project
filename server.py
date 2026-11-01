import http.server
import socketserver
import webbrowser
import threading
import socket
import os
import sys
# Use nilo  TO GENERATE 3d glb files and then it shall be hoseted here with the help of three.js

# Ensure server serves from the script's directory
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        # Enable CORS and caching headers if needed
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        super().end_headers()

    # Ensure correct MIME types for 3D assets and modern JS modules
    extensions_map = http.server.SimpleHTTPRequestHandler.extensions_map.copy()
    extensions_map.update({
        '.glb': 'model/gltf-binary',
        '.gltf': 'model/gltf+json',
        '.js': 'application/javascript',
        '.mjs': 'application/javascript',
        '.json': 'application/json',
        '.wasm': 'application/wasm',
        '.mp4': 'video/mp4',
    })

def find_available_port(start_port=8080, max_attempts=20):
    """Find an available port starting from start_port."""
    for port in range(start_port, start_port + max_attempts):
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            try:
                s.bind(('127.0.0.1', port))
                return port
            except OSError:
                continue
    return start_port

def open_browser_delayed(url, delay=0.8):
    """Open default browser after a brief delay ensuring server is ready."""
    def _open():
        print(f"Opening browser at: {url}")
        webbrowser.open(url)
    threading.Timer(delay, _open).start()

def main():
    port = find_available_port(8080)
    url = f"http://localhost:{port}/index.html"

    # Allow fast restart without TIME_WAIT port issues
    socketserver.TCPServer.allow_reuse_address = True

    print("=" * 60)
    print(" 3D Monument Viewer (Three.js)")
    print("=" * 60)
    print(f" Serving directory : {DIRECTORY}")
    print(f" Local URL         : {url}")
    print("-" * 60)
    print(" Camera Controls:")
    print("   * Orbit / Rotate : Left Mouse Drag  | Touch Drag")
    print("   * Pan            : Right Mouse Drag | Two-finger Drag")
    print("   * Zoom           : Mouse Wheel      | Pinch")
    print("   * Shortcuts      : [R] Reset View   | [Space] Auto Rotate")
    print("-" * 60)
    print(" Press Ctrl+C in this terminal to stop the server.\n")

    open_browser_delayed(url)

    try:
        with socketserver.TCPServer(('127.0.0.1', port), CustomHTTPRequestHandler) as httpd:
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped. Goodbye!")
        sys.exit(0)

if __name__ == '__main__':
    main()
