import { postComments, Com, getComments } from "./fetchdata";  

export async function displayForm(forumId: string){
    const forum1Container = document.getElementById('forum1Container');
    if (!forum1Container) return;

    const comments = await getComments();
    if(comments.length > 0){
        comments.forEach(comment => displayComments(comment, forum1Container));
    }

    const forumForm = `
    <form id="${forumId}Form">
        <label for="title">Titel:</label><br>
        <input type="text" id="title" name="title" required><br>
        <label for="message">Message:</label><br>
        <textarea id="message" name="message" required></textarea><br>
        <input type="submit" value="Send" id="sendMsgBtn">
    </form>`;

    forum1Container.innerHTML = forumForm;

    // forum1Container?.insertAdjacentHTML('beforeend', forumForm);

    const form = document.getElementById(`${forumId}Form`) as HTMLElement;

    form?.addEventListener('submit', async(event) =>{
        event.preventDefault();

        const titleInput = form.querySelector('input[name="title"]') as HTMLInputElement;
        const messageInput = form.querySelector('textarea[name="message"]') as HTMLTextAreaElement;
        const title = titleInput.value;
        const message = messageInput.value;

        const newComment: Com ={
            title: title,
            message: message
        };

        await postComments(newComment);

        titleInput.value = '';
        messageInput.value ='';

        displayComments(newComment, forum1Container);
    });
}

function displayComments(comment:Com, container: HTMLElement){
    const commentDiv = document.createElement('div');
    commentDiv.classList.add('comment-wrapper');

    const titleEl = document.createElement('h2');
    titleEl.textContent = comment.title;

    const messageEl = document.createElement('p');
    messageEl.textContent = comment.message;

    commentDiv.appendChild(titleEl);
    commentDiv.appendChild(messageEl);
    container.appendChild(commentDiv);
}