import React from "react";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import LabelOutlinedIcon from "@mui/icons-material/LabelOutlined";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import "./CSS/emaillist.css";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { mailAction } from "./features/mailSlice";
import { db } from "./firebase";
import { htmlToText } from "html-to-text";

function Emailbody(props) {
  const { data, id, senderName, subject, senderEmail, message, time } = props;
  console.log("email", senderEmail);
  const dispatch = useDispatch();
  const history = useHistory();
  const currentUser = useSelector((state) => state.user.value.email);
  const mailType = useSelector((state) => state.mail.mailType);

  const openMessage = () => {
    dispatch(
      mailAction.setMessage({
        data,
        senderName,
        subject,
        senderEmail,
        message,
        time,
        id,
      })
    );

    db.collection("ReceivedMails")
      .doc(currentUser)
      .collection("mail")
      .doc(id)
      .update({
        ...data,
        read: true,
      });
    history.push("/mail");
  };

  //   const updateRead=()=>{
  // db.collection('ReceivedMails').doc(currentUser).collection('mail').doc(id).update({
  //   ...data,
  //   read:true
  // })
  //   }
  return (
    <div
      className={`emailbody ${data.read === true && "emailbody--unread"}`}
      onClick={(e) => openMessage()}
    >
      <div
        className={`emailbody__left ${
          data.read === true && "emailbody__left--read"
        }`}
      >
        <div className="emailbody__leftLabel">
          <CheckBoxOutlineBlankIcon />
          <StarBorderIcon />
          <LabelOutlinedIcon />
          {data.read === false && <FiberManualRecordIcon className="msgRead" />}
        </div>
<div className="emailbody__left_RightLabel">
{mailType === "sent" ? (
          <h4>To:{data.recipents}</h4>
        ) : (
          <h4>{senderName}</h4>
        )}
</div>
      
      </div>
      <div className="emailbody__middle">
        <div
          className={`emailbody__middle__msg ${
            data.read === true && "emailbody__middle__msg--read"
          }`}
        >
          <p>
            <b>{subject}</b> {htmlToText(message)}
          </p>
        </div>
      </div>
      <div className="emailbody__right">
        <p>{time}</p>
      </div>
    </div>
  );
}

export default Emailbody;
