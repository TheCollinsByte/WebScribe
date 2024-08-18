document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('scrapeForm');
    const urlInput = document.getElementById('urlInput');
    const resultDiv = document.getElementById('result');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const url = urlInput.value;

        resultDiv.textContent = `Attempting to scrape: ${url}`;

        try {
            const response = await fetch('http://localhost:3000/api/scrape', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url }),
            });

            const data = await response.json();
            resultDiv.textContent = JSON.stringify(data, null, 2);
        } catch (error) {
            resultDiv.textContent = `Error: ${error.message}`;
        }
    });
});