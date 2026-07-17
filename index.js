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

// Function to get random posts
function getRandomPosts(posts, count = 5) {
    const shuffled = [...posts];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, count);
}

// Function to fetch and display random posts
async function fetchRandomPosts(count = 5) {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const posts = await response.json();
        const randomPosts = getRandomPosts(posts, count);
        displayPosts(randomPosts);
        return randomPosts;
    } catch (error) {
      console.error('Error fetching random posts:', error);
      displayError('Failed to load random posts.');
      throw error;
    }
}

// Call the function when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    fetchAndDisplayPosts();
});

// Export for testing (using CommonJS for Node.js)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
     fetchAndDisplayPosts,
     fetchRandomPosts,
     displayPosts,
     getRandomPosts,
     displayError,
     API_URL
    };
}
