import { displayForm, loadComments, isFormCreated } from "./modules/displayForum";
import { Newuser, createUser, loginUser, getLoggedInUser, highlightChosenProfilePic } from "./modules/login.ts";
import { profileSite } from "./modules/profile.ts";
let loggedIn = false;
const loggedInUser = getLoggedInUser();
if (loggedInUser) {
  console.log('Logged-in user:', loggedInUser.userName);
} else {
    console.log('No user logged in.');
}
const myPage = document.getElementById('myPage') as HTMLButtonElement;

document.addEventListener('DOMContentLoaded', async () => {
    let activeForumId: string | null = null;

    const forumIds = ['forum1', 'forum2', 'forum3'];

    for (const forumId of forumIds) {
        const forumButton = document.getElementById(forumId);
        if (forumButton) {
            forumButton.addEventListener('click', async () => {
                if (activeForumId === forumId) {
                    await loadComments(forumId);
                } else {
                    if (activeForumId && isFormCreated(activeForumId)) {
                        const previousForm = document.getElementById(`${activeForumId}Form`);
                        if (previousForm) {
                            previousForm.remove();
                        }
                    }
                    if (!isFormCreated(forumId)) {
                        await displayForm(forumId);
                    }
                    await loadComments(forumId);

                    activeForumId = forumId;
                }
            });
        }
    }

});

      const cr8UsrBtn = (document.getElementById('cr8UsrBtn') as HTMLInputElement); 

      cr8UsrBtn.addEventListener("click", (event) => {
        event.preventDefault();
        const newName = (document.getElementById("cr8Name") as HTMLInputElement).value ;
        const newEmail = (document.getElementById("cr8Email") as HTMLInputElement).value ;
        const newPassword = (document.getElementById("cr8Psw") as HTMLInputElement).value ;
        const loginWrap = (document.querySelector("#createUserPopup") as HTMLDivElement);
        const loginPopup = (document.getElementById("loginPopup") as HTMLDivElement);

        createUser({ userName: `${newName}`, userEmail: `${newEmail}`, userPassword: `${newPassword}`, id: ``})

        .then(() => {
        console.log("User created!")
        loginWrap.style.display = "none";
        loginPopup.style.display = "flex";
        })
  
  });

        const loginBtn = (document.getElementById("loginBtn") as HTMLButtonElement);
        loginBtn.addEventListener("click", (event) => {

            const loginWrap = (document.querySelector("#createUserPopup") as HTMLDivElement);
            
            loginWrap.style.display = "flex";
        
        })

        const loginLink = document.getElementById("loginLink") as HTMLAnchorElement;
        loginLink.addEventListener("click", (event) => {
            event.preventDefault();
            const loginPopup = (document.getElementById("loginPopup") as HTMLDivElement);
            const loginWrap = (document.querySelector("#createUserPopup") as HTMLDivElement);
            loginWrap.style.display = "none";
            loginPopup.style.display = "flex";
        })

        const closeBtn = (document.getElementById("closeBtn") as HTMLImageElement);
        closeBtn.addEventListener("click", (event) => {

            const loginWrap = (document.querySelector("#createUserPopup") as HTMLDivElement);
            
            loginWrap.style.display = "none";
        })

        const closeBtn2 = (document.getElementById("closeBtn2") as HTMLImageElement);
        closeBtn2.addEventListener("click", (event) => {

            const loginWrap = (document.querySelector("#loginPopup") as HTMLDivElement);
            
            loginWrap.style.display = "none";
        })

        const signInBtn = (document.getElementById("signInBtn") as HTMLInputElement);
        signInBtn.addEventListener("click", async (event) => {
            event.preventDefault();

            const email = (document.getElementById("loginEmail") as HTMLInputElement).value;
            const password = (document.getElementById("loginPassword") as HTMLInputElement).value;
            getLoggedInUser();
            try {
                await loginUser(email, password);
                myPage.addEventListener('click', profileSite);
              } 
              catch (error) {
               console.log("Login failed!")
              }
        })

