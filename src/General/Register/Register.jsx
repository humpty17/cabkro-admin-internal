import axios from 'axios';
import React, { useState } from 'react'
import { FaEnvelope, FaLock } from "react-icons/fa";

const Register = () => {
  const InitialState = {
    firstName :'',
    lastName : '',
    email: '',
    password: '',
    phoneNo : ''
  }
  const [addData, setAddData] = useState(InitialState);

  const handleChange = (e) =>{
    setAddData({
      ...addData,
      [e.target.name] : e.target.value
    })
    
  }
  const handleSubmit = (e) => {
    //debugger
    e.preventDefault();
      const fetchRegiterData = async () => {
        try {
          const response = await axios({
            method: "post",
            url: "https://admin.cabkro.com/Auth/RegisterAdminUser",
            headers: {
              "Content-Type": "application/json",
            },
            data: {
              firstName: addData.firstName,
              lastName: addData.lastName,
              userEmail: addData.email,
              password: addData.password,
              phoneNo: addData.phoneNo,
            },
          });

          if (response.data.code === 200) {
            setAddData(response.data.data); 
          } else {
            setAddData({});
          }
        } catch (err) {
          
        }
      };
      fetchRegiterData();
  };
  return (
    <main className="d-flex w-100">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            className="form-control"
            id="exampleInputfirst1"
            aria-describedby="emailHelp"
            value={addData.firstName}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            name="lastname"
            className="form-control"
            id="exampleInputlast1"
            aria-describedby="emailHelp"
            value={addData.lastName}
            onChange={handleSubmit}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            name="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={addData.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="form-control"
            id="exampleInputPassword1"
            value={addData.password}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3 ">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Phone No.
          </label>
          <input
            type="number"
            name="phone no"
            className="form-control"
            id="exampleInputPhoneno1"
            value={addData.phoneNo}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </main>
  );
}

export default Register