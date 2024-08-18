document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('scrapeForm') as HTMLFormElement;
    const urlInput = document.getElementById('urlInput') as HTMLInputElement;
    const resultDiv = document.getElementById('result') as HTMLDivElement;

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