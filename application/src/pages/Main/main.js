import React from "react";
import { ButtonList } from "../../components/ui/buttonsList";
import { NavVar } from "../../components/navBar";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchUsersStudy } from "../../actions/studies";
import Button from "../../components/ui/button";

export const Main = () => {
  const history = useHistory();
  const handleSelectStudy = (element) => {
    console.log("select");
    history.push(`/study/${element.id}`);
  };

  const { studies } = useSelector((state) => state.studies);
  const { isSuperAdmin } = useSelector((state)=>state.auth)

  const handleRegisterNewAdmin=()=>{
    console.log("RegisterAction");
  }
  return (
    <>
      <NavVar></NavVar>
      <ButtonList
        buttons={studies}
        handleSelect={handleSelectStudy}
      ></ButtonList>
      {isSuperAdmin&&
        <Button
        key={"Register"}
        element={{
          id:"Register",
          text: "Register New admin User",
        }}
        handleClick={handleRegisterNewAdmin}
      />
      } 
      
    </>
  );
};
