# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static workshop website for the CySoc 2026 (International Workshop on Cyber Social Threats) conference. The site is a single-page HTML application built with Bootstrap 3, jQuery, and various plugins for animations and UI effects. It will be hosted on GitHub Pages at https://cy-soc.github.io/2026/.

## Architecture

### Core Structure
- **Single-page application**: All content is in `index.html` with anchor-based navigation
- **Static site**: No build process required - the site runs directly from HTML/CSS/JS files
- **Dynamic lists**: Both PC members and organizers are loaded client-side from JSONL data files

### Key Files
- `index.html`: Complete workshop website with all sections (about, dates, program, organizers, etc.)
- `data/cysoc_pc_list_confirmed.jsonl`: Program Committee members data (auto-generated)
- `data/organizers.jsonl`: Workshop organizers data (manually maintained)
- `js/load_pc_list.js`: Custom script that loads PC members from JSONL and renders them
- `js/load_organizers.js`: Custom script that loads organizers from JSONL and renders them
- `script/generate_confirmed_pc_file.py`: Python script to generate the PC JSONL from a CSV

### Data Flow for PC Members
1. Maintain PC members in a CSV file (typically from Google Sheets) with columns: `response`, `name`, `field`, `affiliation`, `website`, `accepted_on_easychair`
2. Run `python script/generate_confirmed_pc_file.py <csv_file>` to generate the JSONL file
3. The JSONL file contains only confirmed members (where `accepted_on_easychair` is true)
4. On page load, `js/load_pc_list.js` fetches and renders this data into the PC list section

### Data Format for Organizers
The `data/organizers.jsonl` file contains one JSON object per line with the following fields:
```json
{
  "name": "Full Name",
  "affiliation": "Institution, Location",
  "email": "email@example.com",
  "photo": "images/team/photo.jpg",
  "twitter": "https://twitter.com/username" or null,
  "linkedin": "https://linkedin.com/in/username" or null,
  "website": "https://example.com" or null
}
```
On page load, `js/load_organizers.js` fetches and renders organizers in rows of 4.

## Common Development Tasks

### Updating Content
- All text content is directly in `index.html` - edit there
- Update dates, program schedule, and other static content in the HTML
- Organizers and PC members are managed via JSONL data files (see below)

### Updating Organizers
Edit `data/organizers.jsonl` directly - each line is a JSON object with organizer information. To reorder organizers, simply rearrange the lines in the file. The website will automatically reflect the new order.

### Updating Program Committee
```bash
# Generate JSONL from CSV (CSV should have the columns mentioned above)
uv run python script/generate_confirmed_pc_file.py path/to/pc_members.csv

# The script outputs to data/cysoc_pc_list_confirmed.jsonl by default
# Or specify output: uv run python script/generate_confirmed_pc_file.py input.csv -o output.jsonl
```

### Setup
This project uses [uv](https://docs.astral.sh/uv/) for Python dependency management. To install dependencies:
```bash
uv sync
```

### Local Development
Since this is a static site, serve it with any HTTP server:
```bash
# Python 3
python -m http.server 8000

# Then visit http://localhost:8000
```

### Publishing to GitHub Pages
The repository is already connected to `git@github.com:cy-soc/2026.git`. To publish updates:
```bash
git add .
git commit -m "Update website content"
git push origin main
```

GitHub Pages will automatically serve from the `main` branch.

## Important Notes

### Year References
The current code still contains multiple references to "2025" that need to be updated to "2026":
- Page title in `<title>` tag (line 9)
- Main heading "CySoc 2025" (line 86)
- Footer copyright (line 841)
- Event dates and locations
- Navigation links to previous years

### CSS and Dependencies
- Uses Bootstrap 3 (not the latest version)
- Multiple jQuery plugins: Owl Carousel, prettyPhoto, isotope, WOW.js for animations
- Custom styles in `css/main.css` and `css/responsive.css`
- All dependencies are vendored (no npm/build process)

### Navigation
The navbar uses anchor links (`#features`, `#about`, etc.) that scroll to sections using smooth scroll. When adding/removing sections, update both the section IDs and navbar links.
