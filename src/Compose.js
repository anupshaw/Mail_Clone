import React, { useEffect, useRef, useState } from "react";
import "./CSS/compose.css";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import HeightIcon from "@mui/icons-material/Height";
import CloseIcon from "@mui/icons-material/Close";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import FormatColorTextIcon from "@mui/icons-material/FormatColorText";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import LinkIcon from "@mui/icons-material/Link";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import PhotoIcon from "@mui/icons-material/Photo";
import PhonelinkLockIcon from "@mui/icons-material/PhonelinkLock";
import CreateIcon from "@mui/icons-material/Create";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import { mailAction } from "./features/mailSlice";
import { useDispatch, useSelector } from "react-redux";
import { db } from "./firebase";
// import 'firebase/compat/firestore';
import { serverTimestamp } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
function Compose() {
  const dispatch = useDispatch();
  const toRef = useRef();
  const subjectRef = useRef();
  const messageRef = useRef();
  const user = useSelector((state) => state.user.value);
  const [id, setId] = useState();
  const [state,setState]=useState("")
  useEffect(() => {
    setId(uuidv4());
  }, []);

  const createMailId = () => {
    setId(uuidv4());
  };

  let enteredEmail;
  let enteredSubject;

  const onContentStateChange=(contentState) => {
    setState({
         contentState,
       });
     };
   
   
     console.log("state",draftToHtml(state.contentState));

  const sendMail = (event) => {
    event.preventDefault();
    enteredEmail = toRef.current.value;
    enteredSubject = subjectRef.current.value;

    createMailId();

    toRef.current.value = "";
    subjectRef.current.value = "";
console.log('sendddddddddddddddddddddd')
    db.collection("SentMails")
      .doc(user.email)
      .collection("mail")
      .doc(id)
      .set({
        id: id,
        recipents: enteredEmail,
        subject: enteredSubject,
        body: draftToHtml(state.contentState),
        sender: user.email,
        read: true,
        senderName: user.displayName,
        timestamp: serverTimestamp(),
      })
      .then(() => {
        addReceivedMail();
      })
      .catch((error) => {
        console.log(error);
      });

    dispatch(mailAction.toggleHandler());
  };

  const addReceivedMail = () => {
    db.collection("ReceivedMails")
      .doc(enteredEmail)
      .collection("mail")
      .doc(id)
      .set({
        id: id,
        recipents: enteredEmail,
        subject: enteredSubject,
        body: draftToHtml(state.contentState),
        sender: user.email,
        read: false,
        senderName: user.displayName,
        timestamp: serverTimestamp(),
      })
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="compose">
      <div className="compose__header">
        <div className="compose__header__left">
          <span>New Message</span>
        </div>
        <div className="compose__header__right">
          <RemoveOutlinedIcon />
          <HeightIcon />
          <CloseIcon
            onClick={() => {
              dispatch(mailAction.toggleHandler());
            }}
          />
        </div>
      </div>
      <form onSubmit={sendMail}>
        <div className="compose__body">
          <div className="compose__bodyForm">
            <input type="email" placeholder="Receipents" ref={toRef} required />
            <input type="text" placeholder="Subject" ref={subjectRef} />
               <Editor
              // editorState={editorState}
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              onContentStateChange={onContentStateChange}
            />
          </div>
        </div>

        <div className="compose__footer">
          <div className="compose__footer__Left">
            <button type="submit">
              Send <ArrowDropDownIcon />
            </button>
          </div>
          <div className="compose__footer__Right">
            <FormatColorTextIcon />
            <AttachFileIcon />
            <LinkIcon />
            <InsertEmoticonIcon />
            <NoteAddIcon />
            <PhotoIcon />
            <PhonelinkLockIcon />
            <CreateIcon />
            <MoreVertIcon />
            <DeleteIcon />
          </div>
        </div>
      </form>
    </div>
  );
}

export default Compose;
