import { render } from "@testing-library/react";
import React from "react";
import { Navigate } from "react-router";
import PostComponent from "../components/PostComponent";


const Home: React.FC = () => {
    return(
        <div>
            <PostComponent/>
        </div>
    )

}

export default Home;

