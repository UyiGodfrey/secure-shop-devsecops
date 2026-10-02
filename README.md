# Secure Shop DevSecOps Lab

A small Node.js service used to demonstrate security checks in a GitHub Actions delivery workflow.

## What is implemented

- Minimal HTTP service with a `/health` endpoint
- Gitleaks secret detection on pushes and pull requests
- A custom Gitleaks rule in `.gitleaks.toml`
- Semgrep static analysis on the application source in GitHub Actions

The service is intentionally small. This repository demonstrates pipeline security gates; it is not a production e-commerce application.

## Run the service

Prerequisite: Node.js 18 or later.

```bash
node app/server.js
```

In a second terminal:

```bash
curl -i http://localhost:3000/health
```

Set a different port with `PORT=8080 node app/server.js`.

## Run the security checks locally

Install Gitleaks and Semgrep first, then run:

```bash
gitleaks detect --source . --config .gitleaks.toml --redact
semgrep scan --config auto --error app
```

The Gitleaks configuration includes a lab-specific pattern for values beginning with `DEVSECOPS_SECRET=`. Never commit real credentials, even to test a scanner.

## CI workflow

[`.github/workflows/security.yml`](.github/workflows/security.yml) runs the secret scan and Semgrep scan on pushes and pull requests. A finding should fail the relevant job so the change can be fixed before merge. Review the [Actions history](../../actions) for the recorded test-secret detection and cleanup runs.

## Repository map

- `app/server.js` — demo HTTP service
- `.gitleaks.toml` — custom secret detection rule
- `.github/workflows/security.yml` — automated security checks

## Scope and next steps

This lab currently demonstrates secret detection and static analysis. It does not yet build or deploy an image, scan dependencies, or provide a production security policy. Those can be added as separate gates and documented with their results.
