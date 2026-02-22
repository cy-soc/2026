/**
 * Load and display organizers from JSONL data file
 *
 * Data format (per line):
 * {
 *   "name": "Full Name",
 *   "affiliation": "Institution, Location",
 *   "email": "email@example.com",
 *   "photo": "images/team/photo.jpg",
 *   "twitter": "https://twitter.com/username" or null,
 *   "bluesky": "https://bsky.app/profile/username" or null,
 *   "linkedin": "https://linkedin.com/in/username" or null,
 *   "website": "https://example.com" or null
 * }
 */

document.addEventListener('DOMContentLoaded', function() {
    const organizersContainer = document.getElementById('organizers-list');

    if (!organizersContainer) {
        console.warn('Organizers container not found');
        return;
    }

    // Fetch and parse the JSONL file
    fetch('data/organizers.jsonl')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            // Parse JSONL (one JSON object per line)
            const lines = data.trim().split('\n');
            const organizers = lines.map(line => JSON.parse(line));

            // Render organizers
            renderOrganizers(organizers);
        })
        .catch(error => {
            console.error('Error loading organizers:', error);
            organizersContainer.innerHTML = '<p class="text-center">Error loading organizers list.</p>';
        });
});

function renderOrganizers(organizers) {
    const container = document.getElementById('organizers-list');

    // Group organizers into rows of 4
    let html = '';
    for (let i = 0; i < organizers.length; i += 4) {
        html += '<div class="row">';

        // Add up to 4 organizers per row
        for (let j = i; j < Math.min(i + 4, organizers.length); j++) {
            const org = organizers[j];
            html += renderOrganizerCard(org);
        }

        html += '</div>';
    }

    container.innerHTML = html;
}

function renderOrganizerCard(org) {
    // Build social icons
    let socialIcons = '<ul class="social-icons">';

    if (org.twitter) {
        socialIcons += `<li><a href="${org.twitter}" target="_blank"><i class="fa-brands fa-twitter"></i></a></li>`;
    }

    if (org.bluesky) {
        socialIcons += `<li><a href="${org.bluesky}" target="_blank"><i class="fa-brands fa-bluesky"></i></a></li>`;
    }

    if (org.linkedin) {
        socialIcons += `<li><a href="${org.linkedin}" target="_blank"><i class="fa-brands fa-linkedin"></i></a></li>`;
    }

    if (org.website) {
        socialIcons += `<li><a href="${org.website}" target="_blank"><i class="fa fa-link"></i></a></li>`;
    }

    socialIcons += '</ul>';

    // Build the card HTML
    return `
        <div class="col-sm-6 col-md-3">
            <div class="team-member wow fadeInUp" data-wow-duration="400ms" data-wow-delay="0ms">
                <div class="team-img">
                    <img class="img-responsive" src="${org.photo}" alt="${org.name}">
                </div>
                <div class="team-info">
                    <h3>${org.name}</h3>
                    <span>${org.affiliation}</span>
                </div>
                <a href="mailto:${org.email}">Contact Email</a>
                ${socialIcons}
            </div>
        </div>
    `;
}
