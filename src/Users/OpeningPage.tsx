import React from "react";
import Signin from "./Signin";
import Signup from "./Signup";
import NavBar from "../Snapper/NavBar/navbar";

export default function OpeningPage() {
    return (
        <div>
        <NavBar />
        <h1>Opening Page</h1>
        <Signin />
        <Signup />
        </div>
    );
    };