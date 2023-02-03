import React, { useEffect } from "react";
import EmailListSetting from "./EmailListSetting";
import "./CSS/emaillist.css";
import Emailtype from "./Emailtype";
import Emailbody from "./Emailbody";
import { useDispatch, useSelector } from "react-redux";
import { mailAction } from "./features/mailSlice";
import useRetrieve from "./hooks/use-Retrieve";

function EmailList() {
  const dispatch = useDispatch();
  const receivedEmails = useSelector((state) => state.mail.recievedMails);
  const sentEmails = useSelector((state) => state.mail.sentMails);
  const deleteMails = useSelector((state) => state.mail.deleteMails);
  const currentUser = useSelector((state) => state.user.value);
  const mailType = useSelector((state) => state.mail.mailType);
  const onScreenMails = useSelector((state) => state.mail.onScreenMails);

  console.log("deleteMails", deleteMails);

  console.log("currentUser", currentUser);
  useRetrieve("ReceivedMails");
  useRetrieve("SentMails");
  useRetrieve("deletedMails");

  useEffect(() => {
    if (mailType === "primary") {
      dispatch(mailAction.setOnScreenMails(receivedEmails));
    }
    if (mailType === "sent") {
      dispatch(mailAction.setOnScreenMails(sentEmails));
    }

    if (mailType === "delete") {
      dispatch(mailAction.setOnScreenMails(deleteMails));
    }
  }, [mailType, receivedEmails, sentEmails]);

  console.log("receivedEmails", receivedEmails);

  console.log("sentEmails", sentEmails);
  console.log("onScreenMails", onScreenMails);
  return (
    <div className="emaillist">
      <EmailListSetting />
      {mailType === "primary" && <Emailtype />}
      {onScreenMails.map(({ id, data }) => {
        return (
          <Emailbody
            key={id}
            data={data}
            id={id}
            senderName={data.senderName}
            subject={data.subject}
            senderEmail={data.sender}
            message={data.body}
            time={new Date(data.timestamp?.seconds * 1000).toLocaleTimeString()}
          />
        );
      })}
    </div>
  );
}

export default EmailList;
