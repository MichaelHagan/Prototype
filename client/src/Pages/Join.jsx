import React, { useState } from "react";
import Register from "./Register";
import Login from "./Login";

const joinStyles = {
  App: {
    background: "#f6f5f7",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    fontFamily: '"Poppins", sans-serif',
    height: "100vh",
    margin: "-20px 0 50px",
  },

  container: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow:
      "0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)",
    position: "relative",
    overflow: "hidden",
    width: "768px",
    maxWidth: "100%",
    minHeight: "500px",
    justifyContent: "center",
  },
};

const Join = () => {
  const [type, setType] = useState("signUp");
  const handleOnClick = (text) => {
    if (text !== type) {
      setType(text);
      return;
    }
  };
  const containerClass =
    "container " + (type === "signUp" ? "right-panel-active" : "");

  return (
    <div style={joinStyles.App}>
      {/* <h2 style={{ fontSize: "3rem", padding: "2rem" }}>Sign in/up Form</h2> */}
      <div
        className={containerClass}
        id="container"
        style={joinStyles.container}
      >
        <Register />
        <Login />
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1 style={{ fontWeight: "bold" }}>Welcome Back!</h1>
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: "100",
                  lineHeight: "20px",
                  letterSpacing: "0.5",
                  margin: "20px 0 30px",
                }}
              >
               Login to account
              </p>
              <button
                className="ghost"
                id="signIn"
                onClick={() => handleOnClick("signIn")}
              >
               Click to log In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1 style={{ fontWeight: "bold" }}>Hello, Friend!</h1>
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: "100",
                  lineHeight: "20px",
                  letterSpacing: "0.5",
                  margin: "20px 0 30px",
                }}
              >
                Enter your personal details and start your journey with us
              </p>
              <button
                className="ghost "
                id="signUp"
                onClick={() => handleOnClick("signUp")}
              >
                Click to sign up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Join;
