
function main() {
    displayPosts();
    addNewPostListener();
}

document.addEventListener('DOMContentLoaded', main);

function displayPosts() {
    fetch('http://localhost:3000/posts')
    .then(response => response.json())
    .then(posts => { 
        console.log(posts);

        const postList = document.getElementById('post-list');
        posts.forEach(post => {
            const postItem = document.createElement('div');
            postItem.classList.add('post-item');

            postItem.innerHTML = `
                <h3>${post.title}</h3>
                <img src="${post.imageURL}" alt="${post.title}" />
            `;
            postList.appendChild(postItem);

            postItem.addEventListener('click', () => handlePostClick(post.id))
        });
    })
    .catch(error => {
        console.error('Error fetching posts:', error);
    })
}

function handlePostClick(postId) {
    fetch(`http://localhost:3000/posts/${postId}`)
    .then(response => response.json())
    .then(post => {
        const postDetails = document.getElementById('post-detail');
        postDetails.innerHTML = `
            <h2>${post.title}</h2>
            <img src="${post.imageURL}" alt="${post.title}" />
            <p>Author : ${post.author}</p>
            <p>${post.content}</p>
        `;
    })
}

function addNewPostListener() {
    const form = document.getElementById('new-post-form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const title = event.target.elements['Post-title'].value;
        const imageURL = event.target.elements['Image-URL'].value;
        const content = event.target.elements['post-content'].value;
        const author = event.target.elements['Author-name'].value;

        const postList = document.getElementById('post-list');
        const postItem = document.createElement('div');
        postItem.classList.add('post-item');

        postItem.innerHTML = `
            <h3>${title}</h3>
            <img src="${imageURL}" alt="${title}" />
            <p>${content}</p>
            <p>Author: ${author}</p>
        `;
        postList.appendChild(postItem);

        form.reset();
    });
}




