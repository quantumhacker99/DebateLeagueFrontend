import { render } from "@testing-library/react";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { Authorize } from "../components/AuthorizeComponent";
import PostComponent from "../components/PostComponent";

type Post = {
    postId:Number,
    body:string,
    upvotes:Number,
    downvotes:Number,
    parent:Number,
    child:Number,
    user:Number,
    replyUser:Number
  }


const Home: React.FC = () => {

    const [headPosts, setHeadPosts] = useState<Post[]>([]);
    //localStorage.setItem('userId', '1');
    const navigate = useNavigate();

    const createNewPost =  () =>{
        

        const result = Authorize.postResource("http://localhost:3100/createNewPost/" + localStorage.getItem('userId'), "")
                                  .then( (response) => {navigate("/postProfile", { state : { postId: response.data.child} })});
                                  //.catch( (err: any) => {console.log("error")});
    }

    const GetHeadPosts = async () => {
        const result = await Authorize.getResource("http://localhost:3100/fetchPosts")
                                  .then( (response) => {console.log("fetched");setHeadPosts(response.data)})
                                  .catch( (error) => console.log("err"));
    }

    const goInbox = () => {
      navigate("/inbox");
    }

    const logoutButton = async() =>{
      Authorize.logout();
    }

    useEffect(() => {
        GetHeadPosts();
    }, []); //[]

    return(
        <div>
            {headPosts.map((post,index) =>{
              return (
                <PostComponent key={index} {...post}/>
              );
            })}
            <button color = " blue" onClick={() => createNewPost()}> Create New Post</button>
            <button color = "blue" onClick = {() => logoutButton()}> Logout </button>
            <button color = " blue" onClick={() => goInbox()}> Your Inbox</button>
        </div>
    )

}

export default Home;