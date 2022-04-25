import { render } from "@testing-library/react";
import { AxiosResponse} from "axios";
import Axios from 'axios';
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-grid-system";

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
    const [postId, setPostId] = useState<number>(2);

    const [disabled, setDisabled] = useState<boolean>(false);

    const GetPostDetailsSuccess = (response:AxiosResponse) => {
        setpId(response.data.postId);
        setBody(response.data.body);
        setUpvotes(response.data.upvotes);
        setDownvotes(response.data.downvotes);
        setChild(response.data.child);
    }
    const GetPostDetails = async() => {
        const result = await Axios.get("http://localhost:3100/postProfile/" + postId.toString())
                    .then((response) => {console.log("fetched"); return GetPostDetailsSuccess(response)})
                    //.else((err: any) => {console.log("error"); return "error"});
    }

    const navigateChild = () =>{
        setPostId(child);
        //GetPostDetails();
        console.log(postId);
    }

    const upvotePost = () => { 
        setUpvotes(upvotes+1);
    }

    const downvotePost = () => {
        setDownvotes(downvotes+1);
    }

    const savePostBody = () => {
        const result = Axios.post("http://localhost:3100/postProfile/" + postId.toString(), {"postId":postId, "body":body, "upvotes": upvotes, "downvotes":downvotes, "child": child} )
                            .then((response) => {if(response.data) {console.log(response.data);setDisabled(true)}})
                            //.else()
        setDisabled(true);
    }

    //<textarea onChange={(text) => setBody(text.target.value)} />

    useEffect(() => {
        GetPostDetails();
    }, [postId]);

    return(
        <Container>
            <Row> Post Details for Post {pId}</Row>
            <Row> 
                <Col> Body </Col> <Col> <textarea disabled = {disabled} onChange={(text) => setBody(text.target.value)} /> </Col>
                <Col> <button color = "danger" onClick={savePostBody}> Submit Post Text</button></Col>
            </Row>
            <Row>
                <button color="#841584" onClick = {upvotePost}> Upvote {upvotes}</button>
            </Row>
            <Row>
                <button color = "danger" onClick = {downvotePost}> Downvote {downvotes}</button>
            </Row>
            <Row>
                <button color = "danger" onClick={navigateChild}>Go to Post {child} </button>
            </Row>
        </Container>
    )

}

export default PostPage;