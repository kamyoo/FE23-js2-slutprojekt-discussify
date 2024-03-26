import { displayForm } from "./modules/displayForum";

document.addEventListener('DOMContentLoaded', () =>{
    document.getElementById('forum1')?.addEventListener('click', () => displayForm('forum1'));
    document.getElementById('forum2')?.addEventListener('click', () => displayForm('forum2'));
    document.getElementById('forum3')?.addEventListener('click', () => displayForm('forum3'));
});