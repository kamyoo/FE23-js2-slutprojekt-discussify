export function profileSite() {
    const changeProfileTextButton = document.getElementById('changeProfileText') as HTMLElement;
    const pElement = document.getElementById('profilText') as HTMLElement;
    const ptext = document.getElementById('ptext') as HTMLFormElement;
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    const imagePreview = document.getElementById('imagePreview') as HTMLImageElement;
    const changeImgButton = document.getElementById('changeImg') as HTMLButtonElement;
    const proSite = document.getElementById('proSite') as HTMLElement;

    changeProfileTextButton.addEventListener('click', () => {
        ptext.style.display = 'block';
        changeProfileTextButton.style.display = 'none';
        pElement.innerText = '';
    });

    ptext.addEventListener('submit', (event: Event) => {
        const writeProfilText = document.getElementById('writeProfilText') as HTMLInputElement;
        event.preventDefault();
        ptext.style.display = 'none';
        changeProfileTextButton.style.display = 'block';
        pElement.innerText = writeProfilText.value;
    });

   /* fileInput.addEventListener('change', function(event: Event) {
        const file = (event.target as HTMLInputElement).files![0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e: ProgressEvent<FileReader>) {
                if (e.target) {
                    imagePreview.src = e.target.result as string;
                }
            }
            reader.readAsDataURL(file);
            fileInput.style.display = 'none';
        } else {
            imagePreview.src = "";
        }
    });

    changeImgButton.innerText = 'Ändra profilbild';
    changeImgButton.addEventListener('click', () => {
        fileInput.click();
    });*/
    proSite.style.display = 'block';
}
