import React from "react";
import "./CSS/emaillist.css";
import { IconButton, Avatar } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LabelImportantIcon from "@mui/icons-material/LabelImportant";
import PrintIcon from "@mui/icons-material/Print";
import LaunchIcon from "@mui/icons-material/Launch";
import StarIcon from "@mui/icons-material/Star";
import ReplyIcon from "@mui/icons-material/Reply";
import DeleteIcon from "@mui/icons-material/Delete";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { db } from "./firebase";
import { htmlToText } from "html-to-text";

function Emaildetail() {
  const history = useHistory();
  const mail = useSelector((state) => state.mail.selectedMessage);
  const mailType = useSelector((state) => state.mail.mailType);
  const currentUser = useSelector((state) => state.user.value.email);
  const message = htmlToText(mail.message);

  let deleteCollectionType = "ReceivedMails";

  if (mailType === "primary") {
    deleteCollectionType = "ReceivedMails";
  }

  if (mailType === "sent") {
    deleteCollectionType = "SentMails";
  }

  if (mailType === "delete") {
    deleteCollectionType = "deletedMails";
  }

  console.log("deleteCollectionType", deleteCollectionType, mailType);

  const moveToDelete = () => {
    if (mailType === "delete") {
      DeleteMail();
    } else {
      db.collection("deletedMails")
        .doc(currentUser)
        .collection("mail")
        .doc(mail.id)
        .set({
          ...mail.data,
        })
        .then(() => {
          console.log("moved to delete........");
          DeleteMail();
        })
        .catch((error) => console.log(error.message));
    }
  };

  const DeleteMail = () => {
    console.log("deleteaaaa", currentUser);
    db.collection(deleteCollectionType)
      .doc(currentUser)
      .collection("mail")
      .doc(mail.id)
      .delete()
      .then(() => {
        history.replace("/");
      })
      .catch((error) => {
        console.log("emailDetail_delete", error.message);
      });
  };

  console.log("mail", mail);
  return (
    <div className="emaildetails">
      <div className="emaillist__settings">
        <div className="emaillist__settingsLeft">
          <IconButton>
            <ArrowBackIcon
              onClick={(e) => {
                history.push("/");
              }}
            />
          </IconButton>
          <IconButton>
            <ArrowDropDownIcon />
          </IconButton>
          <IconButton>
            <RefreshIcon />
          </IconButton>
          <IconButton>
            <DeleteIcon onClick={moveToDelete} />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
        <div className="emaillist__settingsRight">
          <p>1-50 of 10,222</p>
          <IconButton>
            <ChevronLeftIcon />
          </IconButton>
          <IconButton>
            <ChevronRightIcon />
          </IconButton>
        </div>
      </div>
      <div className="emaildetails__message">
        <div className="emaildetails__header">
          <div className="emaildetails__headerLeft">
            <h4>{mail.subject}</h4>
            <IconButton>
              <LabelImportantIcon />
            </IconButton>
          </div>
          <div className="emaildetails__headerRight">
            <IconButton>
              <PrintIcon />
            </IconButton>
            <IconButton>
              <LaunchIcon />
            </IconButton>
          </div>
        </div>

        <div className="emaildetails__middleheader">
          <div className="emaildetails__middleheaderLeft">
            <IconButton>
              <Avatar />
            </IconButton>
            <h4>{mail.senderName}</h4>
            <p>{mail.senderEmail}</p>
          </div>
          <div className="emaildetails__middleheaderRight">
            <p>{mail.time}</p>
            <IconButton>
              <StarIcon />
            </IconButton>
            <IconButton>
              <ReplyIcon />
            </IconButton>
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </div>
        </div>
        <div className="emaildetails__body">
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
}

export default Emaildetail;
