// API endpoint
const API_URL = 'https://jsonplaceholder.typicode.com/posts';

// Main function to fetch and display posts using async/await
async function fetchAndDisplayPosts() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const posts = await response.json();
        displayPosts(posts);
        return posts;
    } catch (error) {
        console.error('Error fetching posts:', error);
        displayError('Failed to load posts. Please try again later.');
        throw error;
    }
}

// Function to display posts on the page
function displayPosts(posts) {
    const container = document.getElementById('post-container');
    if (!container) {
        console.error('Container not found');
        return;
    }
    container.innerHTML = '';
    posts.forEach(function(post) {
        const postCard = document.createElement('div');
        postCard.className = 'post-card';
        
        const postTitle = document.createElement('h2');
        postTitle.textContent = post.title;
        postCard.appendChild(postTitle);
        
        const postBody = document.createElement('p');
        postBody.textContent = post.body;
        postCard.appendChild(postBody);
        
        const postUserId = document.createElement('small');
        postUserId.textContent = `User ID: ${post.userId} | Post ID: ${post.id}`;
        postCard.appendChild(postUserId);
        
        container.appendChild(postCard);
    });
}

// Function to display error message
function displayError(message) {
    const container = document.getElementById('post-container');
    if (container) {
        container.innerHTML = `<p class="error">${message}</p>`;
    }
}

// Call the function when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    fetchAndDisplayPosts();
});

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        fetchAndDisplayPosts,
        displayPosts,
        displayError,
        API_URL
    };
}
