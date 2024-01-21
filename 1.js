const API_URL = 'https://api.github.com';

let currentPage = 1;
let repositoriesPerPage = 5;
let currentUsername = 'johnpapa'; // Change this to the desired GitHub username

function fetchRepositories() {
    const repositoriesContainer = document.getElementById('repositories');
    const paginationContainer = document.getElementById('pagination');

    repositoriesContainer.innerHTML = '<div class="loader"></div>';
    paginationContainer.innerHTML = '';

    const url = `${API_URL}/users/${currentUsername}/repos?page=${currentPage}&per_page=${repositoriesPerPage}`;

    fetch(url)
        .then(response => response.json())
        .then(repositories => {
            repositoriesContainer.innerHTML = '';
            repositories.forEach(repo => {
                const repoElement = document.createElement('div');
                repoElement.classList.add('repository');
                repoElement.innerHTML = `<h3>${repo.name}</h3><p>${repo.description}</p>`;
                repositoriesContainer.appendChild(repoElement);
            });

            if (repositories.length > 0) {
                // Pagination logic (if needed)
                // You can implement pagination here based on your requirements
            } else {
                repositoriesContainer.innerHTML = '<p>No repositories found.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching repositories:', error);
            repositoriesContainer.innerHTML = '<p>Error fetching repositories.</p>';
        });
}

// Initial load
fetchRepositories();
