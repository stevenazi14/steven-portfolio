import os

from flask import Flask, jsonify, render_template, send_from_directory

app = Flask(__name__)
CV_DIRECTORY = os.path.join(app.root_path, "files")
CV_FILENAME = "cv.pdf"
CV_DOWNLOAD_NAME = "Steven_Aziavula_Professional_CV.pdf"


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


@app.route("/healthz")
def healthcheck():
    return jsonify({"status": "ok"})


if __name__ == "__main__":
    debug_mode = os.getenv("FLASK_DEBUG", "0") == "1"
    host = os.getenv("FLASK_HOST", "127.0.0.1")
    port = int(os.getenv("PORT", "5000"))
    app.run(host=host, port=port, debug=debug_mode)
