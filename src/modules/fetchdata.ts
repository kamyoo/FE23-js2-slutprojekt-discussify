type Com = {
  title: string,
  message: string;
}

async function getComments(forumId: string): Promise<Com[]>{
  const baseUrl = 'https://slutprojekt-js2-2b1f0-default-rtdb.europe-west1.firebasedatabase.app/';
  const url = `${baseUrl}${forumId}.json`;

  const res = await fetch(url);
  const data = await res.json();
  
  const comments = Object.keys(data).map(key => data[key]) as Com[];
  return comments;
}

async function postComments(com: Com, forumId: string): Promise<void> {
  const baseUrl = 'https://slutprojekt-js2-2b1f0-default-rtdb.europe-west1.firebasedatabase.app/';
  const url = `${baseUrl}${forumId}.json`;

  const headers: Headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Accept', 'application/json');

  const request: RequestInfo = new Request(url, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(com)
  });

  return fetch(request)
    .then(res => {
      console.log("got response:", res);
    });
}

async function deleteComment(commentId: string, forumId: string): Promise<void> {
  const baseUrl = 'https://slutprojekt-js2-2b1f0-default-rtdb.europe-west1.firebasedatabase.app/';
  const url = `${baseUrl}${forumId}/${commentId}.json`;

  const headers: Headers = new Headers();
  headers.set('Content-Type', 'application/json');

  const request: RequestInfo = new Request(url, {
    method: 'DELETE',
    headers: headers,
  });

  return fetch(request)
    .then(res => {
      console.log("post deleted:", res);
    });
}

export async function saveProfileText(userId: string, profileText: string): Promise<void> {
  const baseUrl = 'https://slutprojekt-js2-2b1f0-default-rtdb.europe-west1.firebasedatabase.app/';
  const url = `${baseUrl}users/${userId}/profileText.json`;

  const headers: Headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Accept', 'application/json');

  const request: RequestInfo = new Request(url, {
    method: 'PUT',
    headers: headers,
    body: JSON.stringify({ profileText: profileText })
  });

  return fetch(request)
    .then(res => {
      console.log("Profile text saved!", res);
    });
}

export async function getProfileText(userId: string): Promise<string | null> {
  const baseUrl = 'https://slutprojekt-js2-2b1f0-default-rtdb.europe-west1.firebasedatabase.app/';
  const url = `${baseUrl}users/${userId}/profileText.json`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return data.profileText;
  } catch (error) {
    console.error('Error fetching profile text:', error);
    return null;
  }
}


export { Com, getComments, postComments, deleteComment };
