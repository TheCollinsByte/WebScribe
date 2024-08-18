// Handle form submission for scraping requests
document.getElementById('scrapeForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const url = document.getElementById('urlInput').value;
    let actions;
    try {
        actions = JSON.parse(document.getElementById('actionsInput').value);
    } catch (err) {
        alert('Invalid JSON format in actions field.');
        return;
    }

    try {
        const response = await fetch('/api/browser/scrape', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url, actions }),
        });

        const result = await response.json();

        if (response.ok) {
            document.getElementById('output').textContent = `Scrape results:\n${JSON.stringify(result.results, null, 2)}`;
        } else {
            document.getElementById('output').textContent = `Error: ${result.error}`;
        }
    } catch (error) {
        console.error('Fetch error:', error);
        document.getElementById('output').textContent = `Fetch error: ${error.message}`;
    }
});

// Handle loading stored interactions
document.getElementById('loadInteractions').addEventListener('click', async () => {
    try {
        const response = await fetch('/api/browser/interactions');
        const interactions = await response.json();

        if (response.ok) {
            const interactionsList = interactions.map(interaction => {
                return `
                    <div class="interaction">
                        <p><strong>URL:</strong> ${interaction.url}</p>
                        <p><strong>Actions:</strong> ${JSON.stringify(interaction.actions, null, 2)}</p>
                        <p><strong>Results:</strong> ${JSON.stringify(interaction.results, null, 2)}</p>
                        <p><strong>Scraped Content:</strong> <pre>${interaction.scrapedContent}</pre></p>
                        <p><strong>Timestamp:</strong> ${new Date(interaction.timestamp).toLocaleString()}</p>
                        <hr/>
                    </div>
                `;
            }).join('');

            document.getElementById('interactions').innerHTML = interactionsList;
        } else {
            document.getElementById('interactions').textContent = `Error: ${interactions.error}`;
        }
    } catch (error) {
        console.error('Fetch error:', error);
        document.getElementById('interactions').textContent = `Fetch error: ${error.message}`;
    }
});
