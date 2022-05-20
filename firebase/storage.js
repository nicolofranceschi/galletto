import { getStorage, ref, uploadBytesResumable, getDownloadURL } from '@firebase/storage';

const storage = getStorage();

// TODO: gestione errori storage: https://firebase.google.com/docs/storage/web/handle-errors
// TODO: se abbiamo bisogno di fermare l'upload e riprenderlo, possiamo usare questo: https://firebase.google.com/docs/storage/web/upload-files#manage_uploads
export const upload = async ({ file, name, setPercent }) => new Promise((resolve, reject) => {

  const uploadTask = uploadBytesResumable(ref(storage, `images/${name}`), file)

  uploadTask.on('state_changed', (snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    setPercent(Math.floor(progress));
  },
  (error) => {
    // TODO: Handle unsuccessful uploads
    reject(error)
  },
  () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      resolve(downloadURL);
      console.log('File available at', downloadURL);
    });
  }
);

 return uploadTask
 
});
export const getFile = ({ name }) => getDownloadURL(ref(storage, name));
