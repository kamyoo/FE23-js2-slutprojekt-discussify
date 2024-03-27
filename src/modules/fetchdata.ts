type Com = {
    title: string,
    message: string
}

async function getComments(): Promise<Com[]>{
    const url = 'https://slutprojekt-js2-2b1f0-default-rtdb.europe-west1.firebasedatabase.app/forum1.json';

    const res = await fetch(url);
    const comments = await res.json();
    return comments as Com[];
}

async function postComments(Com: Com): Promise<void> {

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

export {Com, getComments, postComments}