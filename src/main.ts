<<<<<<< HEAD
import { displayForm } from "./modules/displayForum.ts";
import { getComments, Com, Newuser, createPost, cr8Newuser, createPass } from "./modules/api.ts"
=======
import { displayForm, loadComments, isFormCreated } from "./modules/displayForum";
>>>>>>> 8e936c9a2b5b69b7fff1264ceb909146b24de63d

document.addEventListener('DOMContentLoaded', async () => {
    const forumIds = ['forum1', 'forum2', 'forum3'];

<<<<<<< HEAD
const newEmail = (document.getElementById("cr8Email") as HTMLInputElement).value ;
const newPassword = (document.getElementById("cr8Psw") as HTMLInputElement).value ;

const sendBtn = document.getElementById("sendBtn") as HTMLButtonElement;
const cr8Usr = document.getElementById("cr8UsrBtn") as HTMLButtonElement;

document.addEventListener('DOMContentLoaded', () =>{
    document.getElementById('forum1')?.addEventListener('click', () => displayForm('forum1'));
    document.getElementById('forum2')?.addEventListener('click', () => displayForm('forum2'));
    document.getElementById('forum3')?.addEventListener('click', () => displayForm('forum3'));
});

sendBtn.addEventListener("click", (event) => {
event.preventDefault();

createPost({ title: `${titleText}`, messageText: `${msgText}` })
.then(() => {
  console.log("Post sent!")
})

getComments();

});

cr8Usr.addEventListener("click", (event) => {
  event.preventDefault();
  const newEmail = (document.getElementById("cr8Email") as HTMLInputElement).value ;
const newPassword = (document.getElementById("cr8Psw") as HTMLInputElement).value ;
  createPass({ email: `${newEmail}`, password: `${newPassword}` })
  .then(() => {
    console.log("User created!")
  })
  
  cr8Newuser();
  
  });
=======
    for (const forumId of forumIds) {
        const forumButton = document.getElementById(forumId);
        if (forumButton) {
            forumButton.addEventListener('click', async () => {
                if (!isFormCreated(forumId)) {
                    await displayForm(forumId);
                }
                await loadComments(forumId);
            });
        }
    }
});

>>>>>>> 8e936c9a2b5b69b7fff1264ceb909146b24de63d
