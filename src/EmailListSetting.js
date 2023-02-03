import React from "react";
import "./CSS/emaillist.css";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { IconButton } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";


function EmailListSetting() {
  return (
    <div className="emaillist__settings">
      <div className="emaillist__settingsLeft">
        <IconButton>
          <CheckBoxOutlineBlankIcon />
        </IconButton>
        <IconButton>
          <ArrowDropDownIcon />
        </IconButton>
        <IconButton>
          <RefreshIcon />
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
  );
}

export default EmailListSetting;
