import reddit from './reddit-api';

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

const truncateText = (text, limit) => {
    const shortened = text.indexOf(' ', limit);
    if (shortened === -1) return text;
    return text.substring(0, shortened);
}

// Form event listener
searchForm.addEventListener('submit', e => {
    const searchTerm = searchInput.value;
    const sortBy = document.querySelector('input[name="sortby"]:checked').value;
    const searchLimit = document.querySelector('#limit').value;

    if (searchTerm === '') {
        showMessage('Please add a search term', 'alert-danger');
    }

    // searchInput.value = ''; // Clear input after a search
    reddit.search(searchTerm, sortBy, searchLimit)
        .then(res => {
            let output = '<div class="card-columns">';
            res.forEach(post => {
                // Check for image
                let image = post.preview ? post.preview.images[0].source.url : 'http://media.gizmodo.co.uk/wp-content/uploads/2016/11/ytzaorwdu0e7byvs7zmn.jpg';

                output += `
                <div class="card">
                <img class="card-img-top" src="${image}" alt="Card image cap">
                <div class="card-body">
                  <h5 class="card-title">${post.title}</h5>
                  <p class="card-text">${truncateText(post.selftext, 100)}</p>
                  <a href="${post.url}" target="_blank" class="btn btn-primary">Read more</a>
                  <hr>
                  <span class="badge badge-secondary">Subreddit: ${post.subreddit}</span>
                  <span class="badge badge-dark">Score :${post.score} </span>
                  </div>
                </div>
                `;
            });
            output += '</div>';
            document.querySelector('#results').innerHTML = output;
        });

    e.preventDefault();
});