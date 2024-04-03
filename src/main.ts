import { displayForm } from "./modules/displayForum.ts";
import { getComments, Com, Newuser, createPost, cr8Newuser, createPass } from "./modules/api.ts"

const titleText = (document.getElementById("title") as HTMLInputElement).value ;
const msgText = (document.getElementById("messageText") as HTMLInputElement).value ;

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
