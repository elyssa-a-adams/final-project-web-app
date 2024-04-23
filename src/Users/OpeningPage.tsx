import React from "react";
import Signin from "./Signin";
import Signup from "./Signup";
import NavBar from "../Snapper/NavBar/navbar";
import "./opening.css";

export default function OpeningPage() {
  return (
    <div>
      <NavBar />
      <div className="openingpage">
        <h1>Welcome to Snapper!</h1>
        </div>
        <div className="openingpage">
        <Signin />
        </div>
        <div className="openingpage">
       <Signup />
        </div>
    </div>
  );
}
