
type Com = {
    title: string,
    messageText: string
}

async function getComments(): Promise<Com[]>{
    const url = 'https://slutprojekt-js2-2b1f0-default-rtdb.europe-west1.firebasedatabase.app/forum1.json';

    const res = await fetch(url);
    const comments = await res.json();

    console.log(comments);

    return comments as Com[];
}

export { getComments, Com }
