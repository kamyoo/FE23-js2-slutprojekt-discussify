import { displayForm, loadComments, isFormCreated } from "./modules/displayForum";

document.addEventListener('DOMContentLoaded', async () => {
    const forumIds = ['forum1', 'forum2', 'forum3'];

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

