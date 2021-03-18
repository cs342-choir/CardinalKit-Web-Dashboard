import { Button } from "./button";

export const ButtonList = ({ buttons, handleSelect }) => {
  console.log(buttons, "buttons");
  return (
    <>
      {buttons.map((element) =>(
          <Button 
            key={element.id} 
            element={element} handleClick={handleSelect} 
            />
      ))}
    </>
  );
};

export default ButtonList;
