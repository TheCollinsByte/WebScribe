document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('scrapeForm')
    const urlInput = document.getElementById('urlInput')
    const resultDiv = document.getElementById('result')

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const url = urlInput.value;

        try {
            const response = await fetch('/api/scrape', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url }),
            });

            const data = await response.json();
            resultDiv.innerHTML = `
                <h2>Scraped Data:</h2>
                <pre>${JSON.stringify(data, null, 2)}</pre>
            `;
        } catch (error) {
            resultDiv.innerHTML = `<p>Error: ${error}</p>`;
        }
    });
});