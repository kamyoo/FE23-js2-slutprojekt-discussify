type Newuser = {
    userEmail: string,
    userPassword: string
  }
  
  async function loginUser(Newuser: string): Promise<Newuser[]>{
    const loginUrl = 'https://slutprojekt-js2-2b1f0-default-rtdb.europe-west1.firebasedatabase.app/users';
    const userUrl = `${loginUrl}`
    const res = await fetch(userUrl);
    const data = await res.json();
    
    const createdUser = Object.keys(data).map(key => data[key]) as Newuser[];
    return createdUser;
  }
  
  async function createUser(Newuser: Newuser): Promise<void> {
    const createUserUrl = 'https://slutprojekt-js2-2b1f0-default-rtdb.europe-west1.firebasedatabase.app/users.json';
  
    const headers: Headers = new Headers();
    headers.set('Content-Type', 'application/json');
    headers.set('Accept', 'application/json');
  
    const request: RequestInfo = new Request(createUserUrl, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(Newuser)
    });
  
    return fetch(request)
      .then(res => {
        console.log("User created!", res);
      });
  }
  
  export { Newuser, createUser, loginUser };
  