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
    userPassword: string
  }
  

  async function loginUser(userEmail: string, userPassword: string): Promise<void> {
    const usersUrl = 'https://slutprojekt-js2-2b1f0-default-rtdb.europe-west1.firebasedatabase.app/users.json';
    
    try {
      const response = await fetch(usersUrl);
      const usersData: { [userId: string]: Newuser } = await response.json();

      let loggedIn = false;

      for (const userId in usersData) {
          const user = usersData[userId];
          if (user.userEmail === userEmail && user.userPassword === userPassword) {
              console.log('User logged in successfully');
              loggedIn = true;
              hidePopupScreen();
              showUser();
              profileSite();
              return;
          }
      }
      if (!loggedIn) {
      console.log('Invalid email or password');
      }
  } catch (error) {
      console.error('Error fetching users data:', error);
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
  const profilePicContainer = (document.getElementById("profilePicContainer") as HTMLDivElement);
  
    profilePicContainer.style.display = "flex";
  
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
  