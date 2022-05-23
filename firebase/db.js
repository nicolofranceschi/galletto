import {
    addDoc,
    collection,
    getFirestore,
    doc,
    getDoc,
  } from 'firebase/firestore';
import { app } from '.';
  
  async function tryCatcher(fn){
    try {
      return { data: await fn(), error: null };
    } catch (error) {
      console.log(error);
      let message = 'default';
      if (error instanceof Error) {
        message = error.message;
      }
      return { data: null, error: message ?? error.code };
    }
  }
  
  export const db = getFirestore(app);

  export const getDocFromSnap = (snap) => ({ id: snap.id, ...(snap.data()) });
  
  export const createDocument = (table,data) => addDoc(collection(db,table),data);
  
  export const getDocument = (table,id) =>
    tryCatcher(async () => {
      const snap = await getDoc(doc(db, table, id));
      if (snap.exists()) return getDocFromSnap(snap);
      else return null; // TODO: throw new Error(...)
    });