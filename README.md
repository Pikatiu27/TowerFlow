# TowerFlow

TowerFlow is a lightweight web-based engineering tool for Australian communication and utility towers.

## Phase 1 Static Prototype

This repository currently contains a mobile-friendly static digital twin prototype:

- Offline Python truss analysis.
- Versioned JSON result output.
- Static Three.js tower viewer.
- Member colouring by axial force sign and magnitude.
- Member click or tap information panel.

## Generate Result Data

```powershell
py -3 analysis/generate_static_case.py
```

The script writes:

```text
public/data/tower-001.results.json
```

## Run Locally

Use any static file server from the repository root. For example:

```powershell
py -3 -m http.server 5173
```

Open:

```text
http://localhost:5173
```

For phone testing on the same Wi-Fi network, replace `localhost` with the computer's local network IP address.

## Notes

The viewer imports Three.js from a CDN. It is intentionally static so it can later be published to GitHub Pages without a backend.

GitHub Pages is not currently enabled for this private repository because the active GitHub plan does not support Pages for this repository visibility. To publish a phone-accessible hosted page later, either make the repository public or use another static host that supports private-source deployments.
