import os

from flask import Flask, jsonify, render_template, send_from_directory

app = Flask(__name__)
CV_DIRECTORY = os.path.join(app.root_path, "files")
CV_FILENAME = "cv.pdf"
CV_DOWNLOAD_NAME = "Steven_Aziavula_Midega_CV.pdf"
CERTIFICATES = {
    "introduction-to-cybersecurity": {
        "filename": "introduction-to-cybersecurity-certificate.pdf",
        "download_name": "Steven_Aziavula_Introduction_to_Cybersecurity_Certificate.pdf",
    },
    "cisco-packet-tracer": {
        "filename": "cisco-packet-tracer-certificate.pdf",
        "download_name": "Steven_Aziavula_Cisco_Packet_Tracer_Certificate.pdf",
    },
}


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/download-cv")
def download_cv():
    return send_from_directory(
        CV_DIRECTORY,
        CV_FILENAME,
        as_attachment=True,
        download_name=CV_DOWNLOAD_NAME,
    )


@app.route("/download-certificate/<certificate_id>")
def download_certificate(certificate_id):
    certificate = CERTIFICATES.get(certificate_id)

    if certificate is None:
        return jsonify({"error": "Certificate not found"}), 404

    return send_from_directory(
        CV_DIRECTORY,
        certificate["filename"],
        as_attachment=True,
        download_name=certificate["download_name"],
    )


@app.route("/healthz")
def healthcheck():
    return jsonify({"status": "ok"})


if __name__ == "__main__":
    debug_mode = os.getenv("FLASK_DEBUG", "0") == "1"
    host = os.getenv("FLASK_HOST", "127.0.0.1")
    port = int(os.getenv("PORT", "5000"))
    app.run(host=host, port=port, debug=debug_mode)
