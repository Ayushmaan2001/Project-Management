import { useEffect, useState } from "react";
import { unstable_batchedUpdates } from "react-dom";
import { projectFirestore } from "../firebase/config";
export const useDocument = (collection, id) => {
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);

  //realtime data for document
  useEffect(() => {
    const ref = projectFirestore.collection(collection).doc(id);

    // const unsubscribe = ref.onSnapshot;
    ref.onSnapshot(
      (snapshot) => {
        if (snapshot.data()) {
          setDocument({ ...snapshot.data(), id: snapshot.id });
          setError(null);
        } else {
          setError("No such document such exist");
        }
      },
      (error) => {
        console.log(error.message);
        setError("failed to get document");
      }
    );
    // return() => {
    // unstable_batchedUpdates()
    // }
  }, [collection, id]);
  return { error, document };
};
