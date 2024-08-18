const allActions = [];
let type = '';
let selector = '';
let value = '';

// event listeners for the inputs
document.getElementById('actionsInputType').addEventListener('change', (e) => {
	type = e.target.value;
});

document.getElementById('actionsInputSelector').addEventListener('input', (e) => {
	selector = e.target.value;
});

document.getElementById('actionsInputValue').addEventListener('input', (e) => {
	value = e.target.value;
});

// Scraping Requests
document.getElementById('addActionBtn').addEventListener('click', async (e) => {
	e.preventDefault();

	if (!type || !selector) {
		alert('Action type and selector are required.');
		return;
	}
	let uuid = self.crypto.randomUUID();
	allActions.push({ type, selector, value, id: uuid });

	// clear the inputs
	document.getElementById('actionsInputType').value = '';
	document.getElementById('actionsInputSelector').value = '';
	document.getElementById('actionsInputValue').value = '';

	// push li into id=actionsList ul
	const li = document.createElement('li');
	li.id = uuid;

	li.innerHTML = `Type: <b>${type}</b> | Selector: <b>${selector}</b> | Value: <b>${value}</b> <button type="button" class="removeActionBtn" id=${
		uuid + '.remove'
	}>Remove</button>`;
	document.getElementById('actionsList').appendChild(li);

	document.getElementById(`${uuid}.remove`).addEventListener('click', (e) => {
		e.preventDefault();
		const id = e.target.id.split('.')[0];
		console.log(id);
		const index = allActions.findIndex((action) => action.id === id);
		allActions.splice(index, 1);

		// remove the li from the ul
		document.getElementById(id).remove();
	});
});

document.getElementById('scrapeForm').addEventListener('submit', async (e) => {
	e.preventDefault();

	const url = document.getElementById('urlInput').value;
	console.log(allActions);
	if (allActions.length < 1) {
		console.log('allActions');
		alert('Please add at least one action.');
		return;
	}

	// remove id from allActions
	let newActions = allActions.map((action) => {
		const { id, ...rest } = action;
		return rest;
	});

	try {
		const response = await fetch('http://localhost:3000/api/browser/scrape', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ url, actions: newActions }),
		});

		const responseText = await response.text();

		if (!response.ok) {
			throw new Error(responseText || 'Unknown error occurred during scraping.');
		}

		let result = {};
		if (responseText) {
			result = JSON.parse(responseText);
		}

		document.getElementById('output').textContent = `Scrape results:\n${JSON.stringify(result.results, null, 2)}`;
	} catch (error) {
		console.error('Fetch error:', error);
		document.getElementById('output').textContent = `Fetch error: ${error.message}`;
	}
});

// Load stored interactions
document.getElementById('loadInteractions').addEventListener('click', async () => {
	try {
		const response = await fetch('http://localhost:3000/api/browser/interactions');

		if (!response.ok) {
			const errorText = await response.text();
			throw new Error(errorText || 'Unknown error occurred while fetching interactions.');
		}

		const interactions = await response.json();

		const interactionsList = interactions
			.map((interaction) => {
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
			})
			.join('');

		document.getElementById('interactions').innerHTML = interactionsList;
	} catch (error) {
		console.error('Fetch error:', error);
		document.getElementById('interactions').textContent = `Fetch error: ${error.message}`;
	}
});

const addNewAction = (type, selector, value) => {};
