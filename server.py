#!/usr/bin/env python3
"""
Simple HTTP server for QA/QC Data Entry application
Handles Excel export using openpyxl to preserve all formatting
"""

from http.server import HTTPServer, SimpleHTTPRequestHandler
import json
import os
import sys
from pathlib import Path
from export_excel import export_to_excel

class QAQCHandler(SimpleHTTPRequestHandler):
    """Custom handler for QA/QC application"""

    def do_POST(self):
        """Handle POST requests for Excel export"""
        if self.path == '/export':
            try:
                # Read the posted JSON data
                content_length = int(self.headers['Content-Length'])
                post_data = self.rfile.read(content_length)
                data = json.loads(post_data.decode('utf-8'))

                # Get custom filename if provided
                custom_filename = data.get('filename', None)

                print(f"\n{'='*60}")
                print(f"📥 Export request received")
                print(f"{'='*60}")

                # Export to Excel using Python
                output_file = export_to_excel(data, custom_filename)

                # Read the generated file
                with open(output_file, 'rb') as f:
                    file_content = f.read()

                # Send response
                self.send_response(200)
                self.send_header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
                self.send_header('Content-Disposition', f'attachment; filename="{Path(output_file).name}"')
                self.send_header('Content-Length', len(file_content))
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(file_content)

                print(f"\n✅ File sent to browser successfully!")
                print(f"{'='*60}\n")

                # Clean up the temporary file
                os.remove(output_file)

            except Exception as e:
                print(f"\n❌ Error during export: {str(e)}")
                import traceback
                traceback.print_exc()

                # Send error response
                self.send_response(500)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                error_msg = json.dumps({'error': str(e)})
                self.wfile.write(error_msg.encode('utf-8'))

        else:
            self.send_response(404)
            self.end_headers()

    def do_OPTIONS(self):
        """Handle OPTIONS requests for CORS"""
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def end_headers(self):
        """Override to add CORS headers"""
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()


def run_server(port=8000):
    """Run the HTTP server"""
    server_address = ('', port)
    httpd = HTTPServer(server_address, QAQCHandler)

    print(f"\n{'='*60}")
    print(f"🚀 QA/QC Data Entry Server Started")
    print(f"{'='*60}")
    print(f"📍 Server running at: http://localhost:{port}")
    print(f"📄 Open: http://localhost:{port}/index.html")
    print(f"🛑 Press Ctrl+C to stop the server")
    print(f"{'='*60}\n")

    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print(f"\n\n{'='*60}")
        print(f"🛑 Server stopped by user")
        print(f"{'='*60}\n")
        httpd.shutdown()


if __name__ == '__main__':
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
    run_server(port)
