import { useEffect } from "react";

import { db } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { mailAction } from "../features/mailSlice";

const useRetrieve = (collection) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.value);

  
  useEffect(() => {
    db.collection(collection)
      .doc(currentUser.email)
      .collection("mail")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        console.log(snapshot);
        if (collection === "ReceivedMails") {
          dispatch(
            mailAction.setReceivedMails(
              snapshot.docs.map((doc) => {
                return {
                  id: doc.id,
                  data: doc.data(),
                };
              })
            )
          );
        }
        if (collection === "SentMails") {
          dispatch(
            mailAction.setSentMails(
              snapshot.docs.map((doc) => {
                return {
                  id: doc.id,
                  data: doc.data(),
                };
              })
            )
          );
        }
        if (collection === "deletedMails") {
          dispatch(
            mailAction.setDeleteMails(
              snapshot.docs.map((doc) => {
                return {
                  id: doc.id,
                  data: doc.data(),
                };
              })
            )
          );
        }
      });
  }, [currentUser]);
};

export default useRetrieve;
