import { createSlice } from "@reduxjs/toolkit";

const mailSlice = createSlice({
  name: "mail",
  initialState: {
    sendMessageIsOpen: false,
    selectedMessage: null,
    mailType:'primary',
    active:'inbox',
    recievedMails: [],
    sentMails: [],
    deleteMails: [],
    onScreenMails:[]
 
  },
  reducers: {
    toggleHandler(state, actions) {
      state.sendMessageIsOpen = !state.sendMessageIsOpen;
    },
    setMessage(state, action) {
      state.selectedMessage = action.payload;
    },
    setReceivedMails(state, action) {
      state.recievedMails = action.payload;
    },
    setSentMails(state, action) {
      state.sentMails = action.payload;
    },
    setDeleteMails(state, action) {
      state.deleteMails = action.payload;
    },
    setOnScreenMails(state, action) {
      state.onScreenMails = action.payload;
    },
    setMailType(state,action){
      state.mailType=action.payload;
    },
    setActive(state,action){
      state.active=action.payload;
    }
  },
});

export const mailAction = mailSlice.actions;

export default mailSlice.reducer;
