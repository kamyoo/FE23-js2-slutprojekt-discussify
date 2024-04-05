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
}

