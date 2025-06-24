document.addEventListener('DOMContentLoaded', () => {
    displayPosts();
    addNewPostListener();
});


function displayPosts() {
    fetch('http://localhost:3000/posts')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error!Status: ${response.status}`);
            }
            return response.json();
        })
        .then(posts => {
            const postList = document.querySelector('#post-list');
            postList.innerHTML = ''; // Clear existing posts

            const ul = document.createElement('ul');

            posts.forEach(post => {
                const li = document.createElement('li');
                
                const title = document.createElement('h2');
                title.textContent = post.title;

                const image = document.createElement('img');
                image.src = post.imageUrl;
                image.alt = post.title;;

                li.appendChild(title);
                li.appendChild(image);
                ul.appendChild(li);
            });
            postList.appendChild(ul);
        })
        .catch(error => {
            console.error('Error fetching posts:', error);
        });
}

const postList = document.querySelector('#post-list');
const postDetails = document.querySelector('#post-details');
const API_URL = 'http://localhost:3000/posts';  

fetch(API_URL)
    .then(response => response.json())
    .then(posts => {
        posts.forEach(post => {
            const postItem = document.createElement('div');
            postItem.textContent = post.title;
            postItem.classList.add('post-item');
            postItem.dataset.id = post.id; // Store the post ID in a data attribute
            postList.appendChild(postItem);
        });
    });

postList.addEventListener('click', (event) => {
    const postItem = event.target.dataset.id;
    if (postItem) {
        handlePostClick(postId);
    }
});

function handlePostClick(postId) {
    fetch(`${API_URL}/${postId}`)
        .then(response => response.json())
        .then(post => {
            postDetails.innerHTML = `
                <h2>${post.title}</h2>
                <img src="${post.imageUrl}" alt="${post.title}" />
                <p>${post.content}</p>
                <h4>Author: ${post.author}</h4>
            `;
        });
}

function addNewPostListener() {
    const newPostForm = document.querySelector('#new-post-form');
    newPostForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const title = document.querySelector('#post-title').value;
        const imageUrl = document.querySelector('#post-image-url').value;
        const content = document.querySelector('#post-content').value;
        const author = document.querySelector('#post-author').value;

        const newPost = {
            title,
            imageUrl,
            content,
            author
        };

        const postList = document.querySelector('#post-list');
        const postItem = document.createElement('div');
        postItem.classList.add('post-item');
        postItem.innerHTML = `
            <h2>${newPost.title}</h2>
            <img src="${newPost.imageUrl}" alt="${newPost.title}" />
            <p>${newPost.content}</p>
            <h4>Author: ${newPost.author}</h4>
        `;
        postList.appendChild(postItem);

        form.reset(); // Clear the form fields
    });
}

