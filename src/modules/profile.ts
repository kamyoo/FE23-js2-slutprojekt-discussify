import { saveProfileText, getProfileText } from './fetchdata';

export function profileSite() {
    const changeProfileTextButton = document.getElementById('changeProfileText') as HTMLElement;
    const pElement = document.getElementById('profilText') as HTMLElement;
    const ptext = document.getElementById('ptext') as HTMLFormElement;
    const writeProfilText = document.getElementById('writeProfilText') as HTMLInputElement;
    const proSite = document.getElementById('proSite') as HTMLElement;

    async function loadProfileText() {
        const userId = 'userId'; // ospecifikt fortfarande
        const profileText = await getProfileText(userId);
        if (profileText) {
            pElement.innerText = profileText;
        }
    }

    loadProfileText();

    changeProfileTextButton.addEventListener('click', () => {
        ptext.style.display = 'block';
        changeProfileTextButton.style.display = 'none';
        pElement.innerText = '';
    });

    ptext.addEventListener('submit', async (event: Event) => {
        event.preventDefault();
        ptext.style.display = 'none';
        changeProfileTextButton.style.display = 'block';

        const userId = 'userId'; // ospecifikt fortfarande
        const newProfileText = writeProfilText.value;

       
        await saveProfileText(userId, newProfileText);

        pElement.innerText = newProfileText;
    });
    proSite.style.display = 'block';

    const forum1 = document.getElementById('forum1') as HTMLButtonElement;
    const forum2 = document.getElementById('forum2') as HTMLButtonElement;
    const forum3 = document.getElementById('forum3') as HTMLButtonElement;

function profileOff (forum: HTMLButtonElement) {
    forum.addEventListener('click', ()=>{
        proSite.style.display = 'none';
    })
}
profileOff(forum1);
profileOff(forum2);
profileOff(forum3);
}

