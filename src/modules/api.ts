
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



function createPost(Com: Com): Promise<void> {

    // const titleText = document.getElementById("title").value;
    // const msgText = document.getElementById("messageText").value;

    const headers: Headers = new Headers()
    headers.set('Content-Type', 'application/json')

    headers.set('Accept', 'application/json')
  
    const request: RequestInfo = new Request('https://slutprojekt-js2-2b1f0-default-rtdb.europe-west1.firebasedatabase.app/forum1.json', {

      method: 'POST',
      headers: headers,

      body: JSON.stringify(Com)
    })

    return fetch(request)
      .then(res => {
        console.log("got response:", res)
      })
  }
  

export { getComments, Com, createPost }
