async function cr8Newuser() {
    const url = 'https://slutprojekt-js2-2b1f0-default-rtdb.europe-west1.firebasedatabase.app/users.json';

    const res = await fetch(url);
    const comments = await res.json();

    console.log(comments);
}

const newEmail = document.getElementById("cr8Email").value ;
const newPassword = document.getElementById("cr8Psw").value ;

cr8UsrBtn.addEventListener("click", (event) => {
    preventDefault();
    
    createPost({ Email: `${newEmail}`, Password: `${newPassword}` })
    .then(() => {
      console.log("User created!")
    })
    
    cr8Newuser();
    
    });