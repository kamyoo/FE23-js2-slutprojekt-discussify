import { displayForm } from "./modules/displayForum.ts";
import { getComments, Com, createPost } from "./modules/api.ts"

const sendBtn = document.getElementById("sendBtn") as HTMLButtonElement;

document.addEventListener('DOMContentLoaded', () =>{
    document.getElementById('forum1')?.addEventListener('click', () => displayForm('forum1'));
    document.getElementById('forum2')?.addEventListener('click', () => displayForm('forum2'));
    document.getElementById('forum3')?.addEventListener('click', () => displayForm('forum3'));
});

sendBtn.addEventListener("submit", (event) => {
event.preventDefault();

createPost({ title: 'titleText', messageText: `msgText` })
.then(() => {
  console.log("Post sent!")
})

getComments();

});