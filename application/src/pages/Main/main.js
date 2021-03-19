import React from "react";
import { ButtonList } from "../../components/ui/buttonsList";
import { NavVar } from "../../components/navBar";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchUsersStudy } from "../../actions/studies";

export const Main = () => {
  const history = useHistory()
  const handleSelectStudy = (element) => {
    history.push(`/study/${element.id}`)
  };



  const { studies } = useSelector((state) => state.studies);
  return (
    <>
      <NavVar></NavVar>
        <ButtonList 
          buttons={studies}
          handleSelect={handleSelectStudy}
        ></ButtonList>
    </>
  );
};
