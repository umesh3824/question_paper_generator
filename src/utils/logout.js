import { getAuth, signOut } from "firebase/auth";

export default function LogoutUser(email, password) {
    const auth = getAuth();
    signOut(auth).then(() => {
      sessionStorage.clear()
    }).catch((error) => {
      // An error happened.
    });
}