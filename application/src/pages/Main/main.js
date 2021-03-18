import React from "react";
import { ButtonList } from "../../components/ui/buttonsList";
import { NavVar } from "../../components/navBar";
import { useSelector } from "react-redux";

export const Main = () => {
  const { studies } = useSelector((state) => state.studies);
  const studiesFormat = studies.map((element)=>({
    text:element.id,
    ...element
  }))
  return (
    <>
      <NavVar></NavVar>
        <ButtonList 
          buttons={studiesFormat}
        ></ButtonList>
      <h1>HEllo</h1>
    </>
  );
};
