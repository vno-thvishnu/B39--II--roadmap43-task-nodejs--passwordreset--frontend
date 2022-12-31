import React from "react";
import { useFormik } from "formik";
import { config } from "../config";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
function ForgotPassword() {
  const [emailDiv, setEmailDiv] = useState(true);
  const [passId, setPassId] = useState("");
  const [otpDiv, setOtpDiv] = useState(false);
  const [passwordDiv, setPasswordDiv] = useState(false);
  const [modal, setModal] = useState(false);
  const [h3color, setH3color] = useState("");
  const [modalmsg, setModalmsg] = useState("");
  const [modalback, setModalback] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validate: (values) => {
      let error = {};

      if (values.email === "") {
        error.email = "please enter Email";
      }
      if (
        values.email &&
        !/^[A-Z0-9._%+-]+@[A-Z0-9._]+\.[A-z]{2,4}$/i.test(values.email)
      ) {
        error.email = " please enter a valid email";
      }

      return error;
    },
    onSubmit: async (values) => {
      try {
        const createAcc = await axios.post(`${config.api}/forgot`, values);
        // console.log(createAcc)

        if (createAcc.data.message === "id finded") {
          setPassId(createAcc.data.email);

          setEmailDiv(false);
          setOtpDiv(true);
          setPasswordDiv(false);
        }
        if (createAcc.data.message === "Account not found in this email-Id") {
          setModal(true);
          setH3color("h3red");
          setModalmsg(createAcc.data.message);
        }
        // formik.resetForm();
      } catch (error) {
        alert("error");
      }
    },
  });
  const back = () => {
    setEmailDiv(true);
    setOtpDiv(false);
    setPasswordDiv(false);
  };

  const [storeOtp, setStoreOtp] = useState("");

  const [otpErr, setOtpErr] = useState(false);
  const [otpErrtwo, setOtpErrtwo] = useState(false);

  const handleSubmit = async () => {
    try {
      setOtpErrtwo(false);
      setOtpErr(false);

      if (storeOtp.length === 0) {
        setOtpErrtwo(true);
      } else if (storeOtp.length === 5) {
        const createAcc = await axios.post(`${config.api}/forgot/otp`, {
          otp: storeOtp,
          email: passId,
        });

        if (createAcc.data.message === "OTP correct") {
          setOtpDiv(false);

          setPasswordDiv(true);
        }
        setStoreOtp("");
        if (createAcc.data.message === "OTP incorrect") {
          setModal(true);
          setH3color("h3red");
          setModalmsg(createAcc.data.message);
        }
      } else if (storeOtp.length <= 4 || storeOtp.length > 5) {
        setOtpErr(true);
      }
    } catch (error) {
      alert("error");
    }
  };

  const [storeNewpw, setStoreNewpw] = useState("");
  const [storeConpw, setStoreConpw] = useState("");

  const [newpwErrone, setNewpwErrone] = useState(false);
  const [newpwErrtwo, setNewpwErrtwo] = useState(false);
  const [newpwErrthree, setNewpwErrthree] = useState(false);

  const [conpwErrone, setConpwErrone] = useState(false);
  const [conpwErrtwo, setConpwErrtwo] = useState(false);
  const [conpwErrthree, setConpwErrthree] = useState(false);

  // const touching=(e)=>{
  //   setStoreNewpw(e.target.value)
  //   setStoreConpw(e.target.value)
    
  // if (storeNewpw.length === 0) {
  //   setNewpwErrone(true);
  // }
  // if (storeConpw.length === 0) {
  //   setConpwErrone(true);
  // }
  // if (
  //   (storeNewpw.length <= 7 && storeNewpw.length >= 1) ||
  //   storeNewpw.length > 12
  // ) {
  //   setNewpwErrtwo(true);
  // }
  // if (
  //   (storeConpw.length <= 7 && storeConpw.length >= 1) ||
  //   storeConpw.length > 12
  // ) {
  //   setConpwErrtwo(true);
  // }

  // }

  const ChangePassword = async () => {
    try {
      setNewpwErrone(false);
      setNewpwErrtwo(false);
      setNewpwErrthree(false);

      setConpwErrone(false);
      setConpwErrtwo(false);
      setConpwErrthree(false);

      if (
        storeNewpw.length === 0 ||
        storeConpw.length === 0 ||
        storeNewpw.length <= 7 ||
        storeNewpw.length > 12 ||
        storeConpw.length <= 7 ||
        storeConpw.length > 12
      ) {
        if (storeNewpw.length === 0) {
          setNewpwErrone(true);
        }
        if (storeConpw.length === 0) {
          setConpwErrone(true);
        }
        if (
          (storeNewpw.length <= 7 && storeNewpw.length >= 1) ||
          storeNewpw.length > 12
        ) {
          setNewpwErrtwo(true);
        }
        if (
          (storeConpw.length <= 7 && storeConpw.length >= 1) ||
          storeConpw.length > 12
        ) {
          setConpwErrtwo(true);
        }
      } else if (storeNewpw === storeConpw) {
        const createAcc = await axios.post(
          `${config.api}/forgot/otp/password`,
          {
            password: storeConpw,
            confirm_password: storeNewpw,
            email: passId,
          }
        );

        if (createAcc.data.message === "Password Created Successfully") {
          setModalback(true);
          setH3color("h3green");
          setModalmsg(createAcc.data.message);
        }
      } else {
        setConpwErrthree(true);
        setNewpwErrthree(true);
      }
    } catch (error) {
      alert("error");
    }
  };

  const btn = () => {
    setModal(false);
  };
  return (
    <>
      {emailDiv ? (
        <>
          <div className="content">
            <div className="inside-content">
              <div className="content-top">
                <div className="inside-content-top">
                  <h2>Forgot Password</h2>

                  <p>
                    Hi , please enter your registered <br /> mail id. Click the
                    button below to <br />
                    proceed , OTP has been sended to email
                  </p>
                </div>
              </div>
              <div className="content-bottom">
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  required
                  id="input"
                  className={`
							${formik.touched.email && formik.errors.email ? "error-box" : ""}
							${formik.touched.email && !formik.errors.email ? "success-box" : ""}

							`}
                />
                {formik.touched.email && formik.errors.email ? (
                  <span className="err" style={{ color: "red" }}>
                    {formik.errors.email}{" "}
                  </span>
                ) : null}
                <button
                  onClick={formik.handleSubmit}
                  type="submit"
                  className="green_btn"
                >
                  proceed
                </button>
              </div>
            </div>

            <Link to="/" className="navy_btn">
              Back
            </Link>
          </div>
        </>
      ) : null}

      {otpDiv ? (
        <>
          <div className="content">
            <div className="inside-content">
              <div className="content-top-red">
                <div className="inside-content-top">
                  <h2>OTP</h2>

                  <p>
                    Hi , please enter your Received <br /> OTP. Click the button
                    below to <br />
                    proceed , to change your password
                  </p>
                </div>
              </div>
              <div className="content-bottom">
                <input
                  type="text"
                  placeholder="OTP"
                  name="otp"
                  value={storeOtp}
                  onChange={(e) => setStoreOtp(e.target.value)}
                  required
                  id="input"
                />
                {otpErr ? (
                  <span className="err" style={{ color: "red" }}>
                    OTP must be 5 characters
                  </span>
                ) : null}
                {otpErrtwo ? (
                  <span className="err" style={{ color: "red" }}>
                    please enter OTP
                  </span>
                ) : null}

                <button
                  onClick={handleSubmit}
                  type="submit"
                  className="red_btn"
                >
                  proceed
                </button>
              </div>
            </div>

            <Link onClick={back} className="navy_btn">
              Back
            </Link>
          </div>
        </>
      ) : null}
      {passwordDiv ? (
        <>
          <div className="content">
            <div className="inside-content">
              <div className="content-top-green">
                <div className="inside-content-top-green">
                  <h2>Create Your Password</h2>

                  <p>
                    Hi , please enter your New password. <br /> Click the button
                    below to proceed .
                  </p>
                </div>
              </div>
              <div className="content-bottom-green">
                <input
                  type="text"
                  placeholder="New Password"
                  name="New Password"
                  value={storeNewpw}
                  onChange={(e) => setStoreNewpw(e.target.value)}
                  // onChange={(e)=>touching(e)}

                  required
                  id="input"
                />
                {newpwErrone ? (
                  <span className="err" style={{ color: "red" }}>
                    please enter new password
                  </span>
                ) : null}
                {newpwErrtwo ? (
                  <span className="err" style={{ color: "red" }}>
                    Password must be between 8 to 12 characters
                  </span>
                ) : null}
                {newpwErrthree ? (
                  <span className="err" style={{ color: "red" }}>
                    Password's not matching
                  </span>
                ) : null}

                <input
                  type="text"
                  placeholder="Confirm New Password"
                  name="Confirm New Password"
                  value={storeConpw}
                  onChange={(e) => setStoreConpw(e.target.value)}
                  // onChange={(e)=>touching(e)}
                  required
                  id="input"
                />
                {conpwErrone ? (
                  <span className="err" style={{ color: "red" }}>
                    please enter confirm password
                  </span>
                ) : null}
                {conpwErrtwo ? (
                  <span className="err" style={{ color: "red" }}>
                    Password must be between 8 to 12 characters
                  </span>
                ) : null}
                {conpwErrthree ? (
                  <span className="err" style={{ color: "red" }}>
                    Password's not matching
                  </span>
                ) : null}
                <button
                  onClick={ChangePassword}
                  type="submit"
                  className="red-green_btn"
                >
                  proceed
                </button>
              </div>
            </div>

            <Link onClick={back} className="navy_btn">
              Back
            </Link>
          </div>
        </>
      ) : null}
      {modal ? (
        <>
          <div className="forbg"></div>
          <div className="popup">
            <div className="inside-popup">
              <h2 className="h2msg">Oops!</h2>
              <hr></hr>

              <div className="inside-popup-content">
                <div className="msg">
                  <h3 className={h3color}>{modalmsg}</h3>
                </div>
                <hr></hr>

                <Link onClick={btn} className="green_btn">
                  Try again
                </Link>
              </div>
            </div>
          </div>
        </>
      ) : null}

      {modalback ? (
        <>
          <div className="forbg"></div>
          <div className="popup">
            <div className="inside-popup">
              <h2 className="h2msg">Oops!</h2>
              <hr></hr>

              <div className="inside-popup-content">
                <div className="msg">
                  <h3 className={h3color}>{modalmsg}</h3>
                </div>
                <hr></hr>

                <Link to="/" className="green_btn">
                  Okay
                </Link>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}

export default ForgotPassword;
