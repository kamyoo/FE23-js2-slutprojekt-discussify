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

// function displayComments(comments: Com[]): void{
//     const container = document.querySelector('#commentsContainer') as HTMLDivElement;

//     comments.forEach( comment =>{
//         createCommentCard(comment, container);
//     })
// }

// function createCommentCard({title, body, user}: Com, container: HTMLDivElement): void{
//     const card = document.createElement('div');
//     const titleEl = document.createElement('h2');
//     const bodyEl = document.createElement('p');
//     const userEl = document.createElement('p');

//     titleEl.innerText = title;
//     bodyEl.innerText = body;
//     userEl.innerText = user;

//     card.append(titleEl, bodyEl, userEl);
//     container.append(card);
// }

// getComments().then( displayComments )

export { getComments, Com }

// /////////////////////////////
// // Fetch function for Forum 2
// /////////////////////////////

// type Com2 = {
//     title: string,
//     body: string,
//     user: string
// }

// async function getComments2(): Promise<Com2[]>{
//     const url = 'https://slutprojekt-js2-2b1f0-default-rtdb.europe-west1.firebasedatabase.app/forum2.json';

//     const res = await fetch(url);
//     const comments = await res.json();
//     console.log(comments);

//     return comments as Com2[];
// }

// function displayComments2(comments: Com2[]): void{
//     const container = document.querySelector('#commentsContainer') as HTMLDivElement;

//     comments.forEach( comment =>{
//         createCommentCard(comment, container);
//     })
// }

// function createCommentCard2({title, body, user}: Com2, container: HTMLDivElement): void{
//     const card = document.createElement('div');
//     const titleEl = document.createElement('h2');
//     const bodyEl = document.createElement('p');
//     const userEl = document.createElement('p');

//     titleEl.innerText = title;
//     bodyEl.innerText = body;
//     userEl.innerText = user;

//     card.append(titleEl, bodyEl, userEl);
//     container.append(card);
// }

// getComments2().then( displayComments2 )

// /////////////////////////////
// // Fetch function for Forum 3
// /////////////////////////////
// type Com3 = {
//     title: string,
//     body: string,
//     user: string
// }

// async function getComments3(): Promise<Com3[]>{
//     const url = 'https://slutprojekt-js2-2b1f0-default-rtdb.europe-west1.firebasedatabase.app/forum3.json';

//     const res = await fetch(url);
//     const comments = await res.json();
//     console.log(comments);

//     return comments as Com3[];
// }

// function displayComments3(comments: Com3[]): void{
//     const container = document.querySelector('#commentsContainer') as HTMLDivElement;

//     comments.forEach( comment =>{
//         createCommentCard(comment, container);
//     })
// }

// function createCommentCard3({title, body, user}: Com3, container: HTMLDivElement): void{
//     const card = document.createElement('div');
//     const titleEl = document.createElement('h2');
//     const bodyEl = document.createElement('p');
//     const userEl = document.createElement('p');

//     titleEl.innerText = title;
//     bodyEl.innerText = body;
//     userEl.innerText = user;

//     card.append(titleEl, bodyEl, userEl);
//     container.append(card);
// }

// getComments3().then( displayComments3 )
