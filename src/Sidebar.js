import React from "react";
import "./CSS/sidebar.css";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import InboxIcon from "@mui/icons-material/Inbox";
import Sidebaroptions from "./Sidebaroptions";
import StarRateIcon from "@mui/icons-material/StarRate";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import LabelImportantIcon from "@mui/icons-material/LabelImportant";
import SendIcon from "@mui/icons-material/Send";
import DraftsIcon from "@mui/icons-material/Drafts";
import LabelIcon from "@mui/icons-material/Label";
import DeleteIcon from "@mui/icons-material/Delete";
import FindInPageIcon from "@mui/icons-material/FindInPage";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import VideocamIcon from "@mui/icons-material/Videocam";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import { useDispatch, useSelector } from "react-redux";
import { mailAction } from "./features/mailSlice";
import { useHistory } from "react-router-dom";
function Sidebar() {
  const dispatch = useDispatch();
  const history=useHistory();
  const active = useSelector((state) => state.mail.active);
  const mails = useSelector((state) => state.mail.onScreenMails);
 
 //inbox
  const inboxActive = () => {
    dispatch(mailAction.setMailType("primary"));
    dispatch(mailAction.setActive("inbox"));
    history.push('/')
  };

   //sent
  const sentActive = () => {
    dispatch(mailAction.setMailType("sent"));
    dispatch(mailAction.setActive("sent"));
    history.push('/')
  };


   //delete
  const deleteActive = () => {
    dispatch(mailAction.setMailType("delete"));
    dispatch(mailAction.setActive("delete"));
    history.push('/')
  };
  return (
    <div className="sidebar">
      <Button
        startIcon={<AddIcon />}
        className="compose__btn"
        onClick={() => {
          dispatch(mailAction.toggleHandler());
        }}
      >
        Compose
      </Button>
      <Sidebaroptions
        ICON={InboxIcon}
        title="Inbox"
        number={mails.length}
        isactive={active === "inbox" ? true : false}
        onClick={inboxActive}
      />
      <Sidebaroptions ICON={StarRateIcon} title="starred" number="500" />
      <Sidebaroptions ICON={WatchLaterIcon} title="snoozed" number="224" />
      <Sidebaroptions
        ICON={LabelImportantIcon}
        title="Important"
        number="452"
      />
      <Sidebaroptions
        ICON={SendIcon}
        title="Sent"
        number={mails.length}
        isactive={active === "sent" ? true : false}
        onClick={sentActive}
      />
      <Sidebaroptions ICON={DraftsIcon} title="Drafts" number="254" />
      <Sidebaroptions ICON={LabelIcon} title="Category" number="224" />
      <Sidebaroptions
        ICON={DeleteIcon}
        title="[Map]/Trash"
        number={mails.length}
        isactive={active === "delete" ? true : false}
        onClick={deleteActive}
      />
      <Sidebaroptions ICON={FindInPageIcon} title="Documents" number="224" />
      <Sidebaroptions ICON={ExpandMoreIcon} title="More" number="224" />
      <hr />
      <h3 className="sidebaroptions--heading">Meet</h3>
      <Sidebaroptions ICON={VideocamIcon} title="New meeting" />

      <Sidebaroptions ICON={KeyboardIcon} title="Join a meeting" />
    </div>
  );
}

export default Sidebar;
