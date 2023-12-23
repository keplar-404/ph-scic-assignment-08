import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";

const checkUser = (setUserData) => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      await setUserData({
        id: user.uid,
        email: user.email,
        name: user.displayName,
        profilePic: user.photoURL,
      });
    } else {
      setUserData(null);
    }
  });
};

export default checkUser;
