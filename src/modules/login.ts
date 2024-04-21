import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { profileSite } from "./profile.ts";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCMe09850eI5d3S_MZw8Rt9BTtSg4qb0rc",
  authDomain: "slutprojekt-js2-2b1f0.firebaseapp.com",
  databaseURL: "https://slutprojekt-js2-2b1f0-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "slutprojekt-js2-2b1f0",
  storageBucket: "slutprojekt-js2-2b1f0.appspot.com",
  messagingSenderId: "1003067095805",
  appId: "1:1003067095805:web:a854bbf61459c0cb679c94",
  measurementId: "G-15E59VFZSL"
};

const app = initializeApp(firebaseConfig);

type Newuser = {
    userName: string,
    userEmail: string,
    userPassword: string,
    id: string
  }
  

  async function loginUser(userEmail: string, userPassword: string): Promise<void> {
    const usersUrl = 'https://slutprojekt-js2-2b1f0-default-rtdb.europe-west1.firebasedatabase.app/users.json';
  
    try {
      const response = await fetch(usersUrl);
      const usersData: { [userId: string]: Newuser & { id: string } } = await response.json();
  
      let loggedInUser: Newuser | null = null;
  
      for (const userId in usersData) {
        const user = usersData[userId];
        if (user.userEmail === userEmail && user.userPassword === userPassword) {
          console.log('User logged in successfully');
          loggedInUser = { ...user, id: userId }; // Adding Firebase ID to loggedInUser
          hidePopupScreen();
          showUser();
          profileSite();
  
          localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
  
          return;
        }
      }
  
      console.log('Invalid email or password');
    } catch (error) {
      console.error('Error fetching users data:', error);
    }
  }
  

// Function to retrieve logged-in user's data from localStorage
function getLoggedInUser(): Newuser | null {
  const userJson = localStorage.getItem('loggedInUser');
  if (userJson) {
    const loggedInUser = JSON.parse(userJson);
    // Om id finns i loggedInUser, returnera hela objektet
    if ('id' in loggedInUser) {
      return loggedInUser;
    } else {
      // Om det inte finns, returnera null
      return null;
    }
  } else {
    return null;
  }
}


function hidePopupScreen() {
  const signinupBtn = (document.getElementById("signInBtn") as HTMLButtonElement);
  const popupScreen = (document.getElementById("loginPopup") as HTMLDivElement) ;
  if (popupScreen) {
      popupScreen.style.display = "none";
  }
  if (signinupBtn) {
    signinupBtn.style.display = "none";
  }
}


function showUser() {
  const profilePicContainer = document.getElementById("profilePicContainer") as HTMLDivElement;
  const foto = document.getElementById('foto') as HTMLDivElement;
  profilePicContainer.style.display = "flex";

  profilePicContainer.innerHTML = '';
  const chosenPicId = localStorage.getItem('chosenProfilePic');
  
  if (chosenPicId) {

    const chosenPicElement = document.getElementById(chosenPicId);
    if (chosenPicElement && chosenPicElement instanceof HTMLImageElement) {

      const chosenPic = document.createElement('img');
      chosenPic.src = chosenPicElement.src; 
      chosenPic.classList.add('chosen');
      profilePicContainer.appendChild(chosenPic);
      const chosenPicCopy = chosenPic.cloneNode(true) as HTMLImageElement;
      foto.appendChild(chosenPicCopy);
    } else {
      console.error('Chosen picture element not found or not an image:', chosenPicId);
    }
  } else {
    console.error('No chosen picture ID found in localStorage.');
  }
  const loggedInUser = localStorage.getItem('loggedInUser');
  
  if (loggedInUser) {

    const userData = JSON.parse(loggedInUser);
    

    const usernameElement = document.createElement('div');
    usernameElement.textContent = userData.userName; 


    profilePicContainer.appendChild(usernameElement);
  } else {
    console.error('No logged-in user found in localStorage.');
  }

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
  
  async function checkUserName(userName: string): Promise<void> {
    const usersUrl = 'https://slutprojekt-js2-2b1f0-default-rtdb.europe-west1.firebasedatabase.app/users.json';
    
    try {
      const response = await fetch(usersUrl);
      const usersData: { [userId: string]: Newuser } = await response.json();

      for (const userId in usersData) {
          const user = usersData[userId];
          if (user.userName === userName) {
              return;
          }
        }        console.log(usersData);
        return;
  } catch (error) {
      console.error('Error fetching users data:', error);
      return;
  }
}
  
document.querySelectorAll('.createUserProfilePic').forEach(pic => {
  pic.addEventListener('click', () => {
    
    document.querySelectorAll('.createUserProfilePic').forEach(pic => {
      pic.classList.remove('chosen');
    });
    
    pic.classList.add('chosen');
    
    localStorage.setItem('chosenProfilePic', pic.id);
  });
});

// Function to highlight the chosen profile picture
function highlightChosenProfilePic() {
  const chosenPicId = localStorage.getItem('chosenProfilePic');
  if (chosenPicId) {
    const chosenPic = document.getElementById(chosenPicId);
    if (chosenPic) {
      chosenPic.classList.add('chosen');
    }
  }
}

  export { Newuser, createUser, loginUser, checkUserName, getLoggedInUser, highlightChosenProfilePic, showUser };
  