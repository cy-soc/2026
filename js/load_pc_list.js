function loadPcList() {
    fetch('data/cysoc_pc_list_confirmed.jsonl')
        .then(response => response.text())
        .then(text => {
            if (!text.trim()) { // No file/data case
                return;
            }
            const lines = text.split('\n').filter(line => line.trim() !== '');
            if (lines.length === 0) { // No data in file
                return;
            }
            let listItems = "";
            lines.forEach(line => {
                const item = JSON.parse(line);
                const name = item.name;
                const affiliation = item.affiliation;
                const website = item.website;
                if (website) {
                    listItems += `<li><i class="fa fa-circle"></i> <a href="${website}" target="_blank">${name}</a>, ${affiliation}.</li>`;
                } else {
                    listItems += `<li><i class="fa fa-circle"></i> ${name}, ${affiliation}.</li>`;
                }
            });
            if(listItems === "") { // No confirmed rows
                return;
            }
            const tableHtml = `<table class="tg" width="600" align="center">
    <thead>
        <tr>
            <th class="tg-73oq">
                <ul class="nostyle">
                    ${listItems}
                </ul>
            </th>
        </tr>
    </thead>
</table>`;
            const pcListContainer = document.getElementById("pc-list");
            if(pcListContainer){
                pcListContainer.innerHTML = tableHtml;
            }
        })
        .catch(error => {
            console.error("Error loading JSONL:", error);
        });
}
