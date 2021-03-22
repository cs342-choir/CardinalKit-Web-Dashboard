import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Select from "react-select";
import { registerUser } from "../../actions/auth";
import { useForm } from "../../hooks/useForm";
import swal from 'sweetalert'

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
