
type Com = {
    title: string,
    messageText: string
}

type Newuser = {
    email: string,
    password: string
}

const titleText = (document.getElementById("title") as HTMLInputElement).value ;
const msgText = (document.getElementById("messageText") as HTMLInputElement).value ;

async function getComments(): Promise<Com[]>{
    const url = 'https://slutprojekt-js2-2b1f0-default-rtdb.europe-west1.firebasedatabase.app/forum1.json';

    const res = await fetch(url);
    const comments = await res.json();

    console.log(comments);

    return comments as Com[];
}

async function cr8Newuser(): Promise<Newuser[]>{
  const url = 'https://slutprojekt-js2-2b1f0-default-rtdb.europe-west1.firebasedatabase.app/users.json';

  const res = await fetch(url);
  const newUsers = await res.json();

  console.log(newUsers);

  return newUsers;
}



async function createPost(Com: Com): Promise<void> {

    console.log(titleText, msgText);

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

  async function createPass(Newuser: Newuser): Promise<void> {

    const headers: Headers = new Headers()
    headers.set('Content-Type', 'application/json')
    headers.set('Accept', 'application/json')
  
    const request: RequestInfo = new Request('https://slutprojekt-js2-2b1f0-default-rtdb.europe-west1.firebasedatabase.app/users.json', {

      method: 'POST',
      headers: headers,
      body: JSON.stringify(Newuser)
    })

    return fetch(request)
      .then(res => {
        console.log("got response:", res)
      })
  }

export { getComments, Com, Newuser, createPost, cr8Newuser, createPass }
