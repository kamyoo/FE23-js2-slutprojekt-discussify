import { displayForm, loadComments, isFormCreated } from "./modules/displayForum";

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