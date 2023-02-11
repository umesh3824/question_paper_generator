import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link,Route,Routes, BrowserRouter as Router,Navigate  } from 'react-router-dom';
export default function LoginUser(email, password) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            sessionStorage.setItem('LoginToken', userCredential._tokenResponse.refreshToken)
            // alert("Login Successful!")
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // console.log(error)
            alert("Email/Password is Wrong!")
        });
}