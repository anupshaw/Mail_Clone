import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { mailAction } from "../features/mailSlice";



const useSidebar = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const actionActive = (action1, action2) => {
    dispatch(mailAction.setMailType(action1));
    dispatch(mailAction.setActive(action2));
    history.push("/");
  };

  return actionActive;
};

export default useSidebar;
