document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('dynamic-form');
    const addMoreButton = document.getElementById('add-more');
    const removeInputsButton = document.getElementById('remove-inputs');
    const inputsContainer = document.getElementById('inputs-container');
    const statusMessage = document.getElementById('status-message');
    let inputCount = 2;

    addMoreButton.addEventListener('click', function() {
        inputCount += 2;
        const newInputGroup = document.createElement('div');
        newInputGroup.className = 'input-group';
        newInputGroup.innerHTML = `
            <input type="text" name="input${inputCount - 1}" placeholder="Input ${inputCount - 1}">
            <input type="text" name="input${inputCount}" placeholder="Input ${inputCount}">
        `;
        inputsContainer.appendChild(newInputGroup);
        updateRemoveButtonVisibility();
    });

    removeInputsButton.addEventListener('click', function() {
        if (inputCount > 2) {
            inputsContainer.removeChild(inputsContainer.lastElementChild);
            inputCount -= 2;
            updateRemoveButtonVisibility();
        }
    });

    function updateRemoveButtonVisibility() {
        removeInputsButton.style.display = inputCount > 2 ? 'block' : 'none';
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(form);
        const serializedData = Object.fromEntries(formData.entries());
        console.log(serializedData);
        
        fetch('/submit-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(serializedData),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            statusMessage.textContent = 'Form submitted successfully!';
            statusMessage.style.color = 'green';
        })
        .catch((error) => {
            console.error('Error:', error);
            statusMessage.textContent = 'An error occurred. Please try again.';
            statusMessage.style.color = 'red';
        });
    });

    updateRemoveButtonVisibility();
});