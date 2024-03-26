type Com = {
    title: string,
    body: string,
    user: string
}

async function getComments(): Promise<Com[]>{
    const url = 'https://slutprojekt-js2-2b1f0-default-rtdb.europe-west1.firebasedatabase.app/forum1.json';

    const res = await fetch(url);
    const comments = await res.json();
    console.log(comments);

    return comments as Com[];
}

function displayComments(comments: Com[]): void{
    const container = document.querySelector('#commentsContainer') as HTMLDivElement;

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