const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');

const showMessage = (message, className) => {
    const div = document.createElement('div');
    const searchContainer = document.querySelector('#search-container');
    const search = document.querySelector('#search');

    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));
    
    searchContainer.insertBefore(div, search);

    // set a timeout
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
}

// Form event listener
searchForm.addEventListener('submit', e => {
    const searchTerm = searchInput.value;
    const sortBy = document.querySelector('input[name="sortby"]:checked').value;
    const searchLimit = document.querySelector('#limit').value;
    
    if (searchTerm === '') {
        showMessage('Please add a search term', 'alert-danger');
    }

    e.preventDefault();
});

