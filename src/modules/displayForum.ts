
export function displayForm(forumId: string){
    const formContainer = document.getElementById('formContainer');
    if (!formContainer) return;

    formContainer.innerHTML = '';

    const forumForm = `
    <form id="${forumId}Form">
        <label for="title">Titel:</label><br>
        <input type="text" id="title" name="title" required><br>
        <label for="message">Message:</label><br>
        <textarea id="message" name="message" required></textarea><br>
        <input type="submit" value="Send">
    </form>`;

    
    formContainer?.insertAdjacentHTML('beforeend', forumForm);
}