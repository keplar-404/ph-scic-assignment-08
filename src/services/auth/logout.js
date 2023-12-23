import toast from "react-hot-toast";
import { auth } from "./firebaseConfig";
import { signOut } from "firebase/auth";

const logoutUser = (setUserData) => {
  signOut(auth)
    .then(() => {
      setUserData(null);
      toast.success("Log out successfully");
    })
    .catch((err) => toast.error(err.message));
};

export default logoutUser;
