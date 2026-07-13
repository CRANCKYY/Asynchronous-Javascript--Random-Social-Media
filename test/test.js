// test/test.js
const assert = require('chai').assert;
const expect = require('chai').expect;
const fs = require('fs');
const path = require('path');

// Import the functions from index.js
const {
    fetchAndDisplayPosts,
    displayPosts,
    displayError,
    getRandomPosts,
    API_URL
} = require('../index.js');

describe('Random Social Media Posts', function() {
    
    // Test 1: should fetch data from external API using async/await
    it('should fetch data from external API using async/await', async function() {
        // Mock fetch
        const mockPosts = [
            { id: 1, userId: 1, title: 'Test Post 1', body: 'Test body 1' },
            { id: 2, userId: 2, title: 'Test Post 2', body: 'Test body 2' }
        ];
        
        // Store original fetch
        const originalFetch = global.fetch;
        
        // Mock fetch
        global.fetch = function() {
            return Promise.resolve({
                ok: true,
                json: function() {
                    return Promise.resolve(mockPosts);
                }
            });
        };
        
        const result = await fetchAndDisplayPosts();
        
        // Check that result matches mock data
        assert.equal(result.length, 2);
        assert.equal(result[0].title, 'Test Post 1');
        
        // Restore original fetch
        global.fetch = originalFetch;
    });
    
    // Test 2: should display posts on the page
    it('should display posts on the page', function() {
        // Set up DOM
        document.body.innerHTML = '<div id="post-container"></div>';
        const container = document.getElementById('post-container');
        
        const mockPosts = [
            { id: 1, userId: 1, title: 'Test Post 1', body: 'Test body 1' },
            { id: 2, userId: 2, title: 'Test Post 2', body: 'Test body 2' }
        ];
        
        displayPosts(mockPosts);
        
        // Check if posts are displayed
        assert.equal(container.children.length, 2);
        assert.include(container.innerHTML, 'Test Post 1');
        assert.include(container.innerHTML, 'Test Post 2');
    });
    
    // Test 3: should use async and await keywords
    it('should use async and await keywords', function() {
        const funcString = fetchAndDisplayPosts.toString();
        assert.include(funcString, 'async');
        assert.include(funcString, 'await');
    });
    
    // Test 4: should handle errors gracefully
    it('should handle errors gracefully', async function() {
        // Store original fetch
        const originalFetch = global.fetch;
        
        // Mock fetch to throw error
        global.fetch = function() {
            return Promise.reject(new Error('Network error'));
        };
        
        try {
            await fetchAndDisplayPosts();
            // If we get here, test should fail
            assert.fail('Expected error was not thrown');
        } catch (error) {
            assert.equal(error.message, 'Network error');
        }
        
        // Restore original fetch
        global.fetch = originalFetch;
    });
    
    // Test 5: should get random posts
    it('should get random posts', function() {
        const posts = [
            { id: 1, title: 'Post 1' },
            { id: 2, title: 'Post 2' },
            { id: 3, title: 'Post 3' },
            { id: 4, title: 'Post 4' },
            { id: 5, title: 'Post 5' },
            { id: 6, title: 'Post 6' },
            { id: 7, title: 'Post 7' },
            { id: 8, title: 'Post 8' },
            { id: 9, title: 'Post 9' },
            { id: 10, title: 'Post 10' }
        ];
        
        const randomPosts = getRandomPosts(posts, 5);
        
        assert.equal(randomPosts.length, 5);
        // All posts should be from the original array
        randomPosts.forEach(function(post) {
            assert.include(posts, post);
        });
    });
});
