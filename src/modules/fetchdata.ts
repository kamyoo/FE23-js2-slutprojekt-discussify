import {getLoggedInUser, Newuser} from "./login.ts"

type Com = {
  userId: string,
  userName: string;
  title: string;
  message: string;
}

async function postComments(comment: Com, forumId: string): Promise<void> {
  const loggedInUser = getLoggedInUser();
  if (!loggedInUser) {
    console.error('No logged in user found.');
    return;
  }

  const userId = loggedInUser.id; // Användar-ID för den inloggade användaren
  comment.userId = userId; // Tilldela användarens Firebase ID till kommentaren

  // Posta kommentaren till databasen
  const baseUrl = 'https://slutprojekt-js2-2b1f0-default-rtdb.europe-west1.firebasedatabase.app/';
  const url = `${baseUrl}${forumId}.json`;

  const headers: Headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Accept', 'application/json');

  const request: RequestInfo = new Request(url, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(comment)
  });

  return fetch(request)
    .then(res => {
      console.log("Comment posted!", res);
    });
}


async function getComments(forumId: string): Promise<Com[]> {
  const baseUrl = 'https://slutprojekt-js2-2b1f0-default-rtdb.europe-west1.firebasedatabase.app/';
  const url = `${baseUrl}${forumId}.json`;

  const res = await fetch(url);
  const data = await res.json();

  const comments: Com[] = Object.keys(data).map(key => {
    const comment = data[key];
    return { ...comment, userName: comment.userName };
  });

  return comments;
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

export async function saveProfileText(profileText: string): Promise<void> {
  const loggedInUser = getLoggedInUser();
  if (!loggedInUser) {
    console.error('No logged in user found.');
    return;
  }

  const userId = loggedInUser.userName; // Användar-ID för den inloggade användaren

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

    if (data !== null && 'profileText' in data) {
      return data.profileText;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching profile text:', error);
    return null;
  }
}

async function getAllUsernames(): Promise<string[]> {
  const usersUrl = 'https://slutprojekt-js2-2b1f0-default-rtdb.europe-west1.firebasedatabase.app/users.json';
  const usernames: string[] = [];
  
  try {
    const response = await fetch(usersUrl);
    const usersData: { [userId: string]: Newuser } = await response.json();

    for (const userId in usersData) {
      const user = usersData[userId];
      usernames.push(user.userName);
    }

    return usernames;
  } catch (error) {
    console.error('Error fetching users data:', error);
    return [];
  }
}

async function deleteUser(userId: string): Promise<void> {
  const deleteUserUrl = `https://slutprojekt-js2-2b1f0-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}.json`;

  const headers: Headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Accept', 'application/json');

  const request: RequestInfo = new Request(deleteUserUrl, {
    method: 'DELETE',
    headers: headers,
  });

  try {
    const response = await fetch(request);
    if (response.ok) {
      console.log(`User with ID ${userId} deleted successfully.`);
    } else {
      console.error(`Failed to delete user with ID ${userId}.`);
    }
  } catch (error) {
    console.error('Error deleting user:', error);
  }
}

export { Com, getComments, postComments, deleteComment, getAllUsernames, deleteUser };
