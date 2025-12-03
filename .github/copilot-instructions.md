<!-- Auto-generated draft. Please review and refine with repo-specific details. -->
# Copilot instructions for this repository

This file gives succinct, actionable guidance for AI coding agents (Copilot-like assistants) to be immediately productive in this codebase.

**Repository status:** No source files or conventional project layout were detected by an automated scan. If this repository contains code, update the paths and commands below to match the actual layout.

**Primary goals for the assistant**
- **Understand:** Locate the runtime entrypoints (`Dockerfile`, `Makefile`, `package.json`, `pyproject.toml`, `src/`, `services/`).
- **Respect conventions:** Follow the repository's existing test, lint, and CI patterns when making changes.
- **Minimize scope:** Make minimal, focused edits; update docs/tests when changing behavior.

**Where to look first**
- **Top-level files:** Check for `README.md`, `CONTRIBUTING.md`, `package.json`, `pyproject.toml`, `setup.py`, `poetry.lock`, `requirements.txt`, `Dockerfile`, and `Makefile` for build/runtime clues.
- **Source directories:** Typical locations: `src/`, `app/`, `services/`, `packages/`, `cmd/`.
- **Tests:** Search `tests/`, `spec/`, or `__tests__/` to learn expected behavior and edge cases.
- **CI:** Inspect `.github/workflows/` for build/test commands and environment variables.

**Build / Test / Debug workflows**
- **Windows dev shell:** Use PowerShell commands since the environment uses `powershell.exe` (Windows). Example: `python -m pytest -q` or `npm test` depending on detected stack.
- **Common quick checks:** If `package.json` exists, prefer `npm ci` then `npm test`. If `pyproject.toml` or `requirements.txt` exists, prefer a venv: `python -m venv .venv; .\.venv\Scripts\Activate.ps1; pip install -r requirements.txt; pytest`.
- **When Docker is present:** Build and run the container locally: `docker build -t repo-local .; docker run --rm -it repo-local`.

**Project-specific patterns (how to infer and apply)**
- **Service boundaries:** Look for directories named `api`, `worker`, `web`, or `service-` -- changes to one service should preserve public HTTP/queue contracts and update integration tests.
- **Configuration:** Prefer reading `config/*`, `env/*.example`, or `.env` files. Make code changes that keep backward-compatible config keys.
- **Database migrations:** If `migrations/` or tools like `alembic`, `flyway`, or `liquibase` exist, do not alter migration history — add new migration files instead.
- **API surfaces:** If OpenAPI/Swagger files exist, update the spec alongside request/response model changes.

**Files and examples to reference when making edits**
- **Entrypoints:** `README.md` or `cmd/*` show how the project is run.
- **Tests as spec:** Use failing or existing tests to infer intended behavior; mirror style used in `tests/` (pytest, jest, etc.).
- **CI workflows:** `.github/workflows/*` contain exact commands to reproduce CI locally.

**Commit and PR guidance for the assistant**
- **Scope PRs narrowly:** One behavior/bugfix per PR. Include test and changelog entry if present.
- **Follow repo commit style:** If `CONTRIBUTING.md` defines commit message formats, adhere to it (otherwise use concise imperative messages).

**What not to guess**
- Do not invent undocumented runtime secrets, deployment targets, or external service credentials.
- Do not rework large architectural decisions without an explicit maintainer instruction.

If any of the above sections are incomplete or incorrect for this repository, please provide the missing project-specific details (key folders, build commands, test commands, CI expectations) and I will update this file accordingly.

---
Last automated scan: please verify paths/commands when code is added.
