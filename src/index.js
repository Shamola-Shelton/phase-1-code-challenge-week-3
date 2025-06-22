function displayPosts() {
    fetch('http://localhost:3000/posts')
        .then(response => response.json())
        .then(posts => {
            const postList = document.getElementById('post-list');
            postList.innerHTML = '';
            posts.forEach(post => {
                const postItem = document.createElement('div');
                postItem.textContent = post.title;
                postItem.dataset.id = post.id;
                postItem.dataset.content = post.content; // Store content for editing
                postItem.dataset.author = post.author;   // Store author for reference
                postItem.addEventListener('click', () => handlePostClick(post.id));
                postList.appendChild(postItem);
            });
            if (posts.length > 0) {
                handlePostClick(posts[0].id);
            }
        })
        .catch(error => console.error('Error fetching posts:', error));
}

function handlePostClick(postId) {
    fetch(`http://localhost:3000/posts/${postId}`)
        .then(response => response.json())
        .then(post => {
            const postDetail = document.getElementById('post-detail');
            postDetail.innerHTML = `
                <h2>${post.title}</h2>
                <p>${post.content}</p>
                <p><strong>Author:</strong> ${post.author}</p>
                <button id="edit-post-btn" class="btn primary">Edit</button>
                <button id="delete-post-btn" class="btn secondary">Delete</button>
            `;
            setupButtons(post);
        })
        .catch(error => console.error('Error fetching post details:', error));
}

function setupButtons(post) {
    const editButton = document.getElementById('edit-post-btn');
    const deleteButton = document.getElementById('delete-post-btn');
    if (editButton) {
        editButton.addEventListener('click', () => showEditForm(post));
    }
    if (deleteButton) {
        deleteButton.addEventListener('click', () => deletePost(post.id));
    }
}

function showEditForm(post) {
    const editForm = document.getElementById('edit-post-form');
    editForm.classList.remove('hidden');
    document.getElementById('edit-title').value = post.title;
    document.getElementById('edit-content').value = post.content;

    editForm.onsubmit = (event) => {
        event.preventDefault();
        const updatedTitle = document.getElementById('edit-title').value;
        const updatedContent = document.getElementById('edit-content').value;

        // Update the DOM without backend persistence
        const postDetail = document.getElementById('post-detail');
        postDetail.innerHTML = `
            <h2>${updatedTitle}</h2>
            <p>${updatedContent}</p>
            <p><strong>Author:</strong> ${post.author}</p>
            <button id="edit-post-btn" class="btn primary">Edit</button>
            <button id="delete-post-btn" class="btn secondary">Delete</button>
        `;
        editForm.classList.add('hidden');

        // Update the post list item
        const postItems = document.querySelectorAll('#post-list div');
        postItems.forEach(item => {
            if (item.dataset.id == post.id) {
                item.textContent = updatedTitle;
                item.dataset.content = updatedContent; // Update stored content
            }
        });

        setupButtons({ id: post.id, title: updatedTitle, content: updatedContent, author: post.author });
    };

    document.getElementById('cancel-edit').onclick = () => {
        editForm.classList.add('hidden');
    };
}

function deletePost(postId) {
    fetch(`http://localhost:3000/posts/${postId}`, { method: 'DELETE' })
        .then(() => {
            const postItems = document.querySelectorAll('#post-list div');
            postItems.forEach(item => {
                if (item.dataset.id == postId) {
                    item.remove();
                }
            });
            document.getElementById('post-detail').innerHTML = '<p>Select a post to view details.</p>';
        })
        .catch(error => console.error('Error deleting post:', error));
}

function addNewPostListener() {
    const form = document.getElementById('new-post-form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;
        const author = document.getElementById('author').value;

        const newPost = { title, content, author };

        fetch('http://localhost:3000/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newPost)
        })
        .then(response => response.json())
        .then(post => {
            const postList = document.getElementById('post-list');
            const postItem = document.createElement('div');
            postItem.textContent = post.title;
            postItem.dataset.id = post.id;
            postItem.dataset.content = post.content;
            postItem.dataset.author = post.author;
            postItem.addEventListener('click', () => handlePostClick(post.id));
            postList.appendChild(postItem);
            handlePostClick(post.id);
        })
        .catch(error => console.error('Error adding new post:', error));

        form.reset();
    });
}

function main() {
    displayPosts();
    addNewPostListener();
}

document.addEventListener('DOMContentLoaded', main);