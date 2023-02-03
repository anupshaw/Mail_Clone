import "./CSS/Header.css";
import ReorderIcon from "@mui/icons-material/Reorder";
import { IconButton, Avatar } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import SettingsIcon from "@mui/icons-material/Settings";
import AppsIcon from "@mui/icons-material/Apps";
import { useSelector } from "react-redux";
import firebase from "firebase/compat/app";
const Header = () => {
  const user=useSelector(state=>state.user.value)
  console.log(user)
  return (
    <div className="header">
      <div className="header__left">
        <IconButton>
          <ReorderIcon />
        </IconButton>
        <img
          src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x_r5.png"
          srcset="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x_r5.png 1x, https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_2x_r5.png 2x "
          alt=""
          aria-hidden="true"
          role="presentation"
          style={{ width: "109px", height: "40px" }}
        />
      </div>
      <div className="header__middle">
        <div className="search_mail">
          <IconButton>
            <SearchIcon />
          </IconButton>
          <input type="text" placeholder="Search mail" />
          <IconButton>
            <KeyboardArrowDownIcon />
          </IconButton>
        </div>
      </div>
      <div className="header__right">
        <IconButton>
          <HelpOutlineIcon />
        </IconButton>
        <IconButton>
          <SettingsIcon />
        </IconButton>
        <IconButton>
          <AppsIcon />
        </IconButton>
        <Avatar
          alt="Remy Sharp"
          src={user?.photoURL}
          sx={{ width: 30, height: 30 }}
          onClick={()=>firebase.auth().signOut()}
        />
      </div>
    </div>
  );
};

export default Header;
