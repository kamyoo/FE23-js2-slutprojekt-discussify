import { postComments, Com, getComments } from "./fetchdata";

let createdForm: string | null = null;

export async function displayForm(forumId: string) {
    const forumContainer = document.getElementById(`${forumId}Container`);
    if (!forumContainer) return;

    if (createdForm === forumId) return;

    forumContainer.innerHTML = '';

    const comments = await getComments(forumId);

    const forumForm = `
        <form id="${forumId}Form" class="forum-form">
            <label for="title">Title:</label><br>
            <input type="text" id="title" name="title" required><br>
            <label for="message">Message:</label><br>
            <textarea id="message" name="message" required></textarea><br>
            <input type="submit" value="Send" id="sendMsgBtn">
        </form>`;

    forumContainer.insertAdjacentHTML('beforebegin', forumForm);

    createdForm = forumId;

    if (comments.length > 0) {
        comments.forEach(comment => displayComments(comment, forumContainer, forumId));
    }

    const form = document.getElementById(`${forumId}Form`);

    form?.addEventListener('submit', async (event) => {
        event.preventDefault();

        const titleInput = form.querySelector('input[name="title"]') as HTMLInputElement;
        const messageInput = form.querySelector('textarea[name="message"]') as HTMLTextAreaElement;
        const title = titleInput.value;
        const message = messageInput.value;

        const newComment: Com = {
            title: title,
            message: message
        };

        await postComments(newComment, forumId);

        titleInput.value = '';
        messageInput.value = '';

        displayComments(newComment, forumContainer, forumId);
    });
}

export async function loadComments(forumId: string) {
    const comments = await getComments(forumId);
    const container = document.getElementById(`${forumId}Container`);
    if (container) {

        const otherForumIds = ['forum1', 'forum2', 'forum3'].filter(id => id !== forumId);
        otherForumIds.forEach(id => {
            const otherContainer = document.getElementById(`${id}Container`);
            if (otherContainer) {
                otherContainer.innerHTML = '';
            }
        });

        container.innerHTML = '';
        comments.forEach(comment => displayComments(comment, container, forumId));
    }
}

export function isFormCreated(forumId: string): boolean {
    return createdForm === forumId;
}

function displayComments(comment: Com, container: HTMLElement, forumId: string) {
    const commentDiv = document.createElement('div');
    commentDiv.classList.add('comment-wrapper', `forum-${forumId}-comments`);

    const titleEl = document.createElement('h2');
    titleEl.textContent = comment.title;

    const messageEl = document.createElement('p');
    messageEl.textContent = comment.message;

    commentDiv.appendChild(titleEl);
    commentDiv.appendChild(messageEl);
    container.prepend(commentDiv);
}