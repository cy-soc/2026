# CySoc 2026

Website for the International Workshop on Cyber Social Threats (CySoc) 2026.

Hosted at https://cy-soc.github.io/2026/.

## Setup

This project uses [uv](https://docs.astral.sh/uv/) to manage Python dependencies for helper scripts.

```bash
uv sync
```

## Local Development

Serve the static site with any HTTP server:

```bash
python -m http.server 8000
# Then visit http://localhost:8000
```

## Updating Content

- **Text content**: Edit `index.html` directly.
- **Organizers**: Edit `data/organizers.jsonl` (one JSON object per line).
- **Program Committee**: Generate from a CSV exported from Google Sheets:
  ```bash
  uv run python script/generate_confirmed_pc_file.py path/to/pc_members.csv
  ```
  The CSV should have columns: `response`, `name`, `field`, `affiliation`, `website`, `accepted_on_easychair`. The script filters to confirmed members and outputs `data/cysoc_pc_list_confirmed.jsonl`.

## Publishing

Push to `main` and GitHub Pages will automatically deploy:

```bash
git push origin main
```
