import { render } from "@testing-library/react";
import { AxiosResponse} from "axios";
import Axios from 'axios';
import React, { useEffect, useState } from "react";

const GrowthMap : Record<number, String> = {
    1: "Hello",
    2: "Bello"
}

/*const GetFollowupDetailsSuccess = (response:AxiosResponse) => {
    return response.data;
    //if(response.data.nullObj==false){
    //  "setLstFollowups(response.data.lstFollowups);
    //}
};*/


const PostPage: React.FC = () => {

    //var Axios = require('axios').default();

    const [pId, setpId] = useState<number>(0);
    const [body, setBody] = useState<String>("");
    const [upvotes, setUpvotes] = useState<number>(1);
    const [downvotes, setDownvotes] = useState<number>(1);
    const [child, setChild] = useState<number>(1);

    const GetPostDetailsSuccess = (response:AxiosResponse) => {
        setpId(response.data.postId);
        setBody(response.data.body);
        setUpvotes(response.data.upvotes);
        setDownvotes(response.data.downvotes);
        setChild(response.data.child);
    }

    const postId = 2;

    const GetPostDetails = async() => {
        const result = Axios.get("http://localhost:3100/postProfile/" + postId)
                    .then((response: AxiosResponse) => {return GetPostDetailsSuccess(response)})
                    //.else((err: any) => {console.log("error")});
    }

    useEffect(() => {
        GetPostDetails();
    }, []);

    return(
        <div>
            <h1> Post Details for Post {pId}</h1>
            <h2>Body: {body}</h2>
            <h2>Upvotes: {upvotes}</h2>
            <h2>Downvotes: {downvotes}</h2>
            <h2>Child ID: {child}</h2>

        </div>
    )

}

export default PostPage;