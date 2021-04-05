import { Card } from "react-bootstrap";
import { GiSevenPointedStar } from "react-icons/gi";
import { GoRocket, GoFlame } from "react-icons/go";
import { useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./TopBar.css";

import { useAppDispatch } from "../../store/store";
import CheckAuth from "../CheckAuth";
import { emptyPostsSlice } from "../../store/postSlice";
function TopBar() {
  const dispatch = useAppDispatch();
  const history = useHistory();

  return (
    <Card
      className="d-flex flex-row w-100 align-items-center "
      style={{ height: "50px", marginTop: "25px", marginBottom: "25px" }}
    >
      {/* ----------best---------------- */}
      <CheckAuth isPrivate={true}>
        <div
          className="top-bar-icon-wrapper"
          onClick={() => {
            dispatch(emptyPostsSlice());
            history.push("/best");
          }}
        >
          <GoRocket className="top_bar_icon" />
          Best
        </div>
      </CheckAuth>
      {/* ----------hot---------------- */}
      <div
        className="top-bar-icon-wrapper"
        onClick={() => {
          dispatch(emptyPostsSlice());
          history.push("/hot");
        }}
      >
        <GoFlame className="top_bar_icon" />
        Hot
      </div>
      {/* ----------new---------------- */}
      <div
        className="top-bar-icon-wrapper"
        onClick={() => {
          dispatch(emptyPostsSlice());

          history.push("/");
        }}
      >
        <GiSevenPointedStar className="top_bar_icon" />
        New
      </div>
    </Card>
  );
}

export default TopBar;
