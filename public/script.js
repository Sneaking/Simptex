async function saveText() {
    const editor = document.getElementById('editor');
    const content = editor.value;
    
    try {
        const response = await fetch('/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ content })
        });
        const data = await response.json();
        if (data.success) {
            alert('Text saved successfully!');
        }
    } catch (error) {
        alert('Error saving text');
    }
}

async function loadText() {
    try {
        const response = await fetch('/load');
        const data = await response.json();
        document.getElementById('editor').value = data.content;
    } catch (error) {
        alert('Error loading text');
    }
}

function clearText() {
    document.getElementById('editor').value = '';
}