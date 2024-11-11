// Initialize the editor with saved content
window.addEventListener('DOMContentLoaded', () => {
    loadText();
});

window.saveText = () => {
    const editor = document.getElementById('editor');
    const content = editor.value;
    localStorage.setItem('editorContent', content);
    alert('Text saved successfully!');
};

window.loadText = () => {
    const content = localStorage.getItem('editorContent') || '';
    document.getElementById('editor').value = content;
};

window.clearText = () => {
    document.getElementById('editor').value = '';
    document.getElementById('gpt-response').style.display = 'none';
};

window.askGPT = async () => {
    const editor = document.getElementById('editor');
    const responseDiv = document.getElementById('gpt-response');
    const content = editor.value;

    if (!content.trim()) {
        alert('Please enter some text first!');
        return;
    }

    responseDiv.textContent = 'Thinking...';
    responseDiv.style.display = 'block';

    try {
        const response = await fetch('/.netlify/functions/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt: content })
        });

        const data = await response.json();
        
        if (data.error) {
            throw new Error(data.error);
        }

        responseDiv.textContent = data.response;
        responseDiv.classList.add('active');
    } catch (error) {
        responseDiv.textContent = 'Error: Could not get a response from ChatGPT. Please try again.';
    }
};