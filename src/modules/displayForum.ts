import { postComments, Com, getComments, deleteComment, getAllUsernames } from "./fetchdata";
import { getLoggedInUser } from "./login";

let createdForm: string | null = null;
let loggedInUser = getLoggedInUser(); // Hämta den inloggade användaren här

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
        const userName = loggedInUser ? loggedInUser.userName : 'Guest';
        const userId = loggedInUser ? loggedInUser.id: '';

        const newComment: Com = {
            userId: userId,
            userName: userName,
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

    const usernameEl = document.createElement('h2');
    usernameEl.textContent = comment.userName;

    const titleEl = document.createElement('h2');
    titleEl.textContent = comment.title;

    const messageEl = document.createElement('p');
    messageEl.textContent = comment.message;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent ='X';
    deleteBtn.addEventListener('click', async () =>{
        await deleteComment(comment.title, forumId);
        container.removeChild(commentDiv);
    });

    commentDiv.appendChild(usernameEl);
    commentDiv.appendChild(titleEl);
    commentDiv.appendChild(messageEl);
    commentDiv.appendChild(deleteBtn);
    container.prepend(commentDiv);
}

export function getCommentsByUserId(userId: string): Promise<Com[]> {
    const forumIds = ["forum1", "forum2", "forum3"];
    const promises = forumIds.map(forumId => getComments(forumId));
    
    return Promise.all(promises)
      .then(forumComments => {
        const allComments = forumComments.flat(); //Sammanfogar forumen
        const commentsByUser = allComments.filter(comment => comment.userId === userId);
        return commentsByUser;
      })
      .catch(error => {
        console.error('Error fetching comments by user ID:', error);
        return [];
      });
}

//för att tömma forum vid profilsida
function clearAllForums() {
    ['forum1', 'forum2', 'forum3'].forEach(forumId => {
        const container = document.getElementById(`${forumId}Container`);
        if (container) {
            container.innerHTML = '';
        }
    });
}

const myPage = document.getElementById('myPage') as HTMLButtonElement;

myPage.addEventListener('click', () => {
    const forumForm = document.querySelector('.forum-form') as HTMLElement;
    const memberSite = document.getElementById('memberSite') as HTMLElement;

    if (forumForm) {
        forumForm.style.display = 'none';
        clearAllForums();
    }
    if (memberSite) {
        memberSite.style.display = 'none';
    }
});

async function displayUsernames() {
    const usernamesContainer = document.getElementById('usernamesContainer');
    const memberSite = document.getElementById('memberSite') as HTMLElement;
    memberSite.style.display = 'block';
    clearAllForums();

    const forumForm = document.querySelector('.forum-form') as HTMLElement;
    if (forumForm) {
        forumForm.style.display = 'none';
    }

    if (!usernamesContainer) return;
  
    const usernames = await getAllUsernames();
  
    usernames.forEach(username => {
        const usernameElement = document.createElement('div');
        usernameElement.textContent = username;
        usernamesContainer.appendChild(usernameElement);
    });
} 

  
  const memberSiteBtn = document.getElementById('members') as HTMLButtonElement;

  memberSiteBtn.addEventListener('click', displayUsernames);

  const forum1 = document.getElementById('forum1') as HTMLButtonElement;
  const forum2 = document.getElementById('forum2') as HTMLButtonElement;
  const forum3 = document.getElementById('forum3') as HTMLButtonElement;

  function memberListOff (forum: HTMLButtonElement) {
    forum.addEventListener('click', ()=>{
        const memberSite = document.getElementById('memberSite') as HTMLElement;
        memberSite.style.display = 'none';
    })
}

memberListOff(forum1);
memberListOff(forum2);
memberListOff(forum3);