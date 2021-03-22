import React from "react";
import { ButtonList } from "../../components/ui/buttonsList";
import { NavVar } from "../../components/navBar";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

export const Main = () => {
  const history = useHistory();
  const handleSelectStudy = (element) => {
    console.log("select");
    history.push(`/study/${element.id}`);
  };

  const { studies } = useSelector((state) => state.studies);
  const { isSuperAdmin } = useSelector((state)=>state.auth)

  return (
    <>
      <NavVar></NavVar>
      <ButtonList
        buttons={studies}
        handleSelect={handleSelectStudy}
      ></ButtonList>
      {isSuperAdmin&&
        <Link to="/register" className="link">
          Create new account
        </Link>
      } 
      
    </>
  );
};
