import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "./firebaseConfig";

const photoUpload = async (photo) => {
  const storage = getStorage(app);
  const storageRef = ref(storage, "images/" + photo.name);

  // Upload the file to Firebase Storage
  try {
    await uploadBytes(storageRef, photo);
    // Get the download URL of the uploaded file
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    return null;
  }
};

export default photoUpload;
