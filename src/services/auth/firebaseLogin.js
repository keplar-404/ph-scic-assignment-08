import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebaseConfig";
import toast from "react-hot-toast";

const login = async (email, password, setUserData) => {
  try {
    const Email = email;
    const Password = password;

    const userCredential = await signInWithEmailAndPassword(
      auth,
      Email,
      Password
    );
    const user = userCredential.user;

    // success
    setUserData({
      id: user.uid,
      email: user.email,
      name: user.displayName,
      profilePic: user.photoURL,
    });

    toast.success("Login successful");
  } catch (err) {
    const error = err.message;
    const match = error.match(/\(auth\/(.+?)\)/);
    const message = match ? match[1] : "An error occurred";
    toast.error(message);
  }
};

export default login;
