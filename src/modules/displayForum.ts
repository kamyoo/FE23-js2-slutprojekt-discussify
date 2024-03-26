import { getComments, Com } from "./api.ts";   

export function displayForm(forumId: string){
    const formContainer = document.getElementById('formContainer');
    if (!formContainer) return;

    formContainer.innerHTML = '';

    const forumForm = `
    <form id="${forumId}Form">
        <label for="title">Titel:</label><br>
        <input type="text" id="title" name="title" required><br>
        <label for="message">Message:</label><br>
        <textarea id="message" name="message" required></textarea><br>
        <input type="submit" value="Send">
    </form>`;

    
    formContainer?.insertAdjacentHTML('beforeend', forumForm);
}

function displayComments(comments: Com[]): void{
    const container = document.querySelector('#formContainer') as HTMLDivElement;

    comments.forEach( comment =>{
        createCommentCard(comment, container);
    })
}
function createCommentCard({title, body, user}: Com, container: HTMLDivElement): void{
    const card = document.createElement('div');
    const titleEl = document.createElement('h2');
    const bodyEl = document.createElement('p');
    const userEl = document.createElement('p');

    titleEl.innerText = title;
    bodyEl.innerText = body;
    userEl.innerText = user;

    card.append(titleEl, bodyEl, userEl);
    container.append(card);
}
getComments().then( displayComments )