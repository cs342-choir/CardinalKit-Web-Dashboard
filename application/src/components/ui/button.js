import PropTypes from "prop-types";

export const Button = ({element, handleClick})=>{
console.log(element.id);
    return(
        <button
            key={element.id}
            onClick={handleClick}
        >
            {element.text}
        </button>
    );
}

Button.protoTypes = {
    text : PropTypes.object.isRequired,
    handleClick: PropTypes.func.isRequired
}

export default Button;