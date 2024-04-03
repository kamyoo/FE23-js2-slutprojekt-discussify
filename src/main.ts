import { displayForm, loadComments, isFormCreated } from "./modules/displayForum";
import { Newuser, createUser, loginUser } from "./modules/login.ts";

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
        const newEmail = (document.getElementById("cr8Email") as HTMLInputElement).value ;
        const newPassword = (document.getElementById("cr8Psw") as HTMLInputElement).value ;

        createUser({ userEmail: `${newEmail}`, userPassword: `${newPassword}` })

        .then(() => {
        console.log("User created!")
        })
  
  });