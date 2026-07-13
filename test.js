// test/test.js
const assert = require('assert');
const fs = require('fs');
const path = require('path');

// Read the HTML file
const html = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');

describe('Random Social Media Posts', function() {
    // Test 1: Fetch data from external API
    it('should fetch data from external API using async/await', async function() {
        // Import the function from index.js
        const { fetchAndDisplayPosts } = require('../index.js');
        
        // Mock the fetch function
        const mockPosts = [
            { id: 1, userId: 1, title: 'Test Post 1', body: 'Test body 1' },
            { id: 2, userId: 2, title: 'Test Post 2', body: 'Test body 2' }
        ];
        
        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: async () => mockPosts
        });
        
        const result = await fetchAndDisplayPosts();
        
        expect(result).toEqual(mockPosts);
        expect(global.fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/posts');
    });

    // Test 2: Display data on page
    it('should display posts on the page', function() {
        // Set up DOM
        document.body.innerHTML = '<div id="post-container"></div>';
        const container = document.getElementById('post-container');
        
        const { displayPosts } = require('../index.js');
        
        const mockPosts = [
            { id: 1, userId: 1, title: 'Test Post 1', body: 'Test body 1' },
            { id: 2, userId: 2, title: 'Test Post 2', body: 'Test body 2' }
        ];
        
        displayPosts(mockPosts);
        
        // Check if posts are displayed
        expect(container.children.length).toBe(2);
        expect(container.innerHTML).toContain('Test Post 1');
        expect(container.innerHTML).toContain('Test Post 2');
    });

    // Test 3: Use Async and Await
    it('should use async and await keywords', function() {
        const { fetchAndDisplayPosts } = require('../index.js');
        
        // Check if the function is async
        expect(fetchAndDisplayPosts.constructor.name).toBe('AsyncFunction');
    });

    // Test 4: Handle errors
    it('should handle errors gracefully', async function() {
        const { fetchAndDisplayPosts } = require('../index.js');
        
        global.fetch = jest.fn().mockRejectedValue(new Error('Network error'));
        
        try {
            await fetchAndDisplayPosts();
        } catch (error) {
            expect(error.message).toBe('Network error');
        }
    });
});
