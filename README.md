# Steven Portfolio

A Flask-based personal portfolio for Steven Aziavula, focused on backend development, APIs, web interfaces, and contact information.

## Stack

- Python
- Flask
- HTML
- CSS
- JavaScript

## Current Features

- Responsive one-page portfolio
- Personal portfolio layout
- Animated hero section with particles
- Scroll reveal and stats counter interactions
- Project filtering by category
- Downloadable professional CV
- Downloadable cybersecurity and networking certificates
- SEO metadata and basic structured data

## Run Locally

1. Open the project folder:
```powershell
cd c:\Users\PC\OneDrive\Documents\steven-portfolio
```

2. Activate the virtual environment:
```powershell
.\venv\Scripts\Activate.ps1
```

3. Start the Flask app in local debug mode:
```powershell
set FLASK_DEBUG=1
python app.py
```

4. Open the app in your browser:
```text
http://127.0.0.1:5000
```

## Main Files

- `app.py` - Flask app and CV download route
- `templates/index.html` - Main portfolio markup
- `static/css/style.css` - Portfolio styling and responsive layout
- `static/js/script.js` - Interactions, animations, filters, and effects
- `files/cv.pdf` - Downloadable CV
- `files/introduction-to-cybersecurity-certificate.pdf` - Introduction to Cybersecurity certificate
- `files/cisco-packet-tracer-certificate.pdf` - Cisco Packet Tracer certificate

## Deployment Readiness

- `requirements.txt` is included for dependency installation
- `.gitignore` excludes virtualenv and Python cache files
- `GET /healthz` returns a simple health response for hosting checks
- `PORT` and `FLASK_HOST` are supported through environment variables
- `FLASK_DEBUG` defaults to `0` for safer deployment behavior
- `Procfile` is included for platforms that expect a web process entry
- `runtime.txt` is included for Python runtime pinning on compatible hosts
- `static/images/favicon.svg` provides a branded browser tab icon

## Before Public Release

- Replace placeholder project summaries with real project links and screenshots
- Add GitHub and LinkedIn profile links
- Deploy behind a proper production server instead of Flask debug serving

## Status

Phase 1 completed:
- CV replaced
- Download route improved
- Debug handling cleaned up

Phase 2 completed:
- Public-facing portfolio polish
- SEO/share metadata
- Encoding cleanup
- README added

Phase 3 in progress:
- Release baseline files added
- App runtime configuration improved
- Health endpoint added
- Favicon and production entry files added
