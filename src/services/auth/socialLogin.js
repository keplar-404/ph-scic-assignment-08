import {
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
} from "firebase/auth";
import { auth } from "./firebaseConfig";
import toast from "react-hot-toast";

// google sign in
const goodleProvider = new GoogleAuthProvider();
export const handleGoogleSignIn = (setUserData) => {
  signInWithPopup(auth, goodleProvider)
    .then(async (data) => {
      toast.success("Login successfull");

      setUserData({
        id: data.user.uid,
        email: data.user.email,
        name: data.user.displayName,
        profilePic: data.user.photoURL,
      });
    })
    .catch((err) => {
      const error = err.message;
      const match = error.match(/\(auth\/(.+?)\)/);
      const message = match[1];
      toast.error(message);
    });
};

const github = new GithubAuthProvider();
export const handleGithubSignIn = async (setUserData) => {
  try {
    const data = await signInWithPopup(auth, github);

    // // Successful login
    toast.success("Login successfull");

    setUserData({
      id: data.user.uid,
      email: data.user.email,
      name: data.user.displayName,
      profilePic: data.user.photoURL,
    });
  } catch (err) {
    // Handle errors
    const error = err.message;
   
    const match = error.match(/\(auth\/(.+?)\)/);
    const message = match ? match[1] : "An error occurred";
    toast.error(message);
  }
};
