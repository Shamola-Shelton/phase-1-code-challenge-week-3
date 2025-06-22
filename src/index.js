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
            if (posts.length > 0) handlePostClick(posts[0].id);
        })
        .catch(error => console.error('Error fetching posts:', error));
}

function handlePostClick(postId) {
    fetch(`http://localhost:3000/posts/${postId}`)
        .then(response => response.json())
        .then(post => {
            const postDetail = document.getElementById('post-detail');
            postDetail.innerHTML = `
                <div id="post-content">
                    <h2>${post.title}</h2>
                    <p>${post.content}</p>
                    <p><strong>Author:</strong> ${post.author}</p>
                    <button id="edit-post-btn" class="btn primary">Edit</button>
                    <button id="delete-post-btn" class="btn secondary">Delete</button>
                </div>
                <form id="edit-post-form" class="hidden">
                    <h4>Update Post Details</h4>
                    <label for="edit-title">Title:</label>
                    <input type="text" name="title" id="edit-title" class="input-field" required>
                    <label for="edit-content">Content:</label>
                    <textarea name="content" id="edit-content" rows="5" class="input-field" required></textarea>
                    <div class="form-actions">
                        <button type="submit" class="btn primary">Update Post</button>
                        <button type="button" id="cancel-edit" class="btn secondary">Cancel</button>
                    </div>
                </form>
            `;
            setupEditButton(post);
            setupDeleteButton(post.id);
        })
        .catch(error => console.error('Error fetching post details:', error));
}

function setupEditButton(post) {
    const editButton = document.getElementById('edit-post-btn');
    if (editButton) {
        editButton.addEventListener('click', () => {
            showEditForm(post);
        });
    }
}

function setupDeleteButton(postId) {
    const deleteButton = document.getElementById('delete-post-btn');
    if (deleteButton) {
        deleteButton.addEventListener('click', () => {
            if (confirm('Are you sure you want to delete this post?')) {
                deletePost(postId);
            }
        });
    }
}

function showEditForm(post) {
    const editForm = document.getElementById('edit-post-form');
    if (editForm) {
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
                body: JSON.stringify({
                    title: updatedTitle,
                    content: updatedContent
                })
            })
            .then(response => response.json())
            .then(updatedPost => {
                // Update post content
                const postContent = document.getElementById('post-content');
                postContent.innerHTML = `
                    <h2>${updatedPost.title}</h2>
                    <p>${updatedPost.content}</p>
                    <p><strong>Author:</strong> ${updatedPost.author}</p>
                    <button id="edit-post-btn" class="btn primary">Edit</button>
                    <button id="delete-post-btn" class="btn secondary">Delete</button>
                `;
                editForm.classList.add('hidden');

                // Update title in post list
                const postItems = document.querySelectorAll('#post-list div');
                postItems.forEach(item => {
                    if (item.dataset.id == updatedPost.id) {
                        item.textContent = updatedPost.title;
                    }
                });

                setupEditButton(updatedPost);
                setupDeleteButton(updatedPost.id);
            })
            .catch(error => console.error('Error updating post:', error));
        };

        document.getElementById('cancel-edit').onclick = () => {
            editForm.classList.add('hidden');
        };
    }
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

        fetch('http://localhost:3000/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, content, author })
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
