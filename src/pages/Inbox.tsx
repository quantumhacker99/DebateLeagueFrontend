import { render } from "@testing-library/react";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router";
import PostComponent from "../components/PostComponent";
import {InviteComponent} from "../components/InviteComponent";
import { Authorize } from "../components/AuthorizeComponent";

type Invite = {
  isNull: boolean,
  invitationID:Number,
  topic:string,
  body:string,
  recipientId:Number,
  receivedFrom: Number
  postId:Number,
}


const Inbox: React.FC = () => {

    const [invites, setInvites] = useState<Invite[]>([]);
    //Cookies.set('userId', '2');
    const navigate = useNavigate();

    // const createNewPost =  () =>{
        

    //     const result = Axios.post("http://localhost:3100/createNewPost/" + Cookies.get('userId'))
    //                               .then( (response) => {navigate("/postProfile", { state : { postId: response.data.child} })});
    //                               //.catch( (err: any) => {console.log("error")});
    // }

    const GetInvites = async () => {
        const result = await Authorize.getResource("http://localhost:3100/inbox/" + localStorage.getItem('userId'))
                                  .then( (response) => {console.log("fetched"); setInvites(response.data)})
                                  .catch( (error) => console.log("err"));
        console.log("Invites for User " + localStorage.getItem('userId') + " are " +invites);
    }

    useEffect(() => {
        GetInvites();
    }, []); //[]

    return(
        <div>
            {invites.map((invite,index) =>{
              return (
                <InviteComponent key={index} {...invite}/>
              );
            })}
            {/* <button color = " blue" onClick={() => createNewPost()}> Create New Post</button> */}
        </div>
    )

}

export default Inbox;