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
            document.getElementById('edit-post-btn').addEventListener('click', () => showEditForm(post));
            document.getElementById('delete-post-btn').addEventListener('click', () => deletePost(post.id));
        })
        .catch(error => console.error('Error fetching post details:', error));
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

        fetch(`http://localhost:3000/posts/${post.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: updatedTitle, content: updatedContent })
        })
        .then(response => response.json())
        .then(updatedPost => {
            const postDetail = document.getElementById('post-detail');
            postDetail.innerHTML = `
                <h2>${updatedPost.title}</h2>
                <p>${updatedPost.content}</p>
                <p><strong>Author:</strong> ${updatedPost.author}</p>
                <button id="edit-post-btn" class="btn primary">Edit</button>
                <button id="delete-post-btn" class="btn secondary">Delete</button>
            `;
            editForm.classList.add('hidden');
            const postItems = document.querySelectorAll('#post-list div');
            postItems.forEach(item => {
                if (item.dataset.id == updatedPost.id) {
                    item.textContent = updatedPost.title;
                }
            });
            document.getElementById('edit-post-btn').addEventListener('click', () => showEditForm(updatedPost));
            document.getElementById('delete-post-btn').addEventListener('click', () => deletePost(updatedPost.id));
        })
        .catch(error => console.error('Error updating post:', error));
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