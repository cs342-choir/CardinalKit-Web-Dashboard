import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Select from "react-select";
import { registerUser } from "../../actions/auth";
import { useForm } from "../../hooks/useForm";
import swal from 'sweetalert'
// import { useEffect } from "react/cjs/react.development";
// let studiesFormatted = [
// { value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true },
// { value: 'blue', label: 'Blue', color: '#0052CC', isDisabled: true },
// { value: 'purple', label: 'Purple', color: '#5243AA' },
// { value: 'red', label: 'Red', color: '#FF5630', isFixed: true },
// { value: 'orange', label: 'Orange', color: '#FF8B00' },
// { value: 'yellow', label: 'Yellow', color: '#FFC400' },
// { value: 'green', label: 'Green', color: '#36B37E' },
// { value: 'forest', label: 'Forest', color: '#00875A' },
// { value: 'slate', label: 'Slate', color: '#253858' },
// { value: 'silver', label: 'Silver', color: '#666666' },
//   ];

export const RegisterScreen = () => {
  const history = useHistory();
  const [values, handleInputChange] = useForm({
    username: "",
    email: "",
  });
  const [studiesSelected, handleStudiesChange] = useState([]);
  const [error, setError] = useState();
  const { username, email } = values;

  const dispatch = useDispatch();
  const { studies } = useSelector((state) => state.studies);
  const studiesFormatted = studies?.map((study) => ({
    value: study.id,
    label: study.text,
  }));

  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(registerUser(username, email, studiesSelected)).then((res)=>{
      if(res.status){
        swal("Congrats!", ", Your account is created!", "success").then(()=>{
          history.push(`/`);
        });
      }
      else{
        setError(res.error)
      }
    });
    
  };

  return (
    <>
      <h3 className="auth__title">Register</h3>

      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Name"
          name="username"
          className="auth__input"
          autoComplete="off"
          value={username}
          onChange={handleInputChange}
        />

        <input
          type="text"
          placeholder="Email"
          name="email"
          className="auth__input"
          autoComplete="off"
          value={email}
          onChange={handleInputChange}
        />

        <Select
          defaultValue={[]}
          isMulti
          name="studies"
          options={studiesFormatted}
          className="basic-multi-select"
          classNamePrefix="select"
          onChange={handleStudiesChange}
        />
        {error&&
          <div>{error}</div>}

        <button type="submit" className="btn btn-primary btn-block mb-5">
          Register
        </button>

        <Link to="/" className="link">
          Go Back
        </Link>

      </form>
    </>
  );
};
