import { render } from "@testing-library/react";
import { AxiosResponse} from "axios";
import Axios from 'axios';
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-grid-system";


const PostPage: React.FC = () => {

    //var Axios = require('axios').default();

    const [pId, setpId] = useState<number>(0);
    const [body, setBody] = useState<String>("");
    const [upvotes, setUpvotes] = useState<number>(1);
    const [downvotes, setDownvotes] = useState<number>(1);
    const [child, setChild] = useState<number>(1);
    const [postId, setPostId] = useState<number>(1);
    const [value, setValue] = useState<string>("");

    const [disabled, setDisabled] = useState<boolean>(false);

    const GetPostDetailsSuccess = (response:AxiosResponse) => {
        if(!response.data.isNull){
            
            setpId(response.data.postId);
            setBody(response.data.body);
            setUpvotes(response.data.upvotes);
            setDownvotes(response.data.downvotes);
            setChild(response.data.child);
            if(response.data.body != ""){
                setDisabled(true);
            }
            console.log("Post Details " + response.data.postId + " " + response.data.body + " " + response.data.upvotes+ " " + response.data.downvotes + " " + response.data.child);
        }
        
    }
    const GetPostDetails = async() => {
        setValue("");
        setBody("");
        setDisabled(false);

        const result = await Axios.get("http://localhost:3100/postProfile/" + postId.toString())
                    .then((response) => {console.log("fetched"); return GetPostDetailsSuccess(response)})
                    //.else((err: any) => {console.log("error"); return "error"});
        setValue(body.toString());
        console.log("Hello value " + value + " body " + body);
    }

    const navigateChild = () =>{
        setPostId(child);
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

    const saveText = (text:React.ChangeEvent<HTMLTextAreaElement>) => {
        console.log("Text getting saved")
        setBody(text.target.value);
        setValue(text.target.value);
    }

    //<textarea onChange={(text) => setBody(text.target.value)} />

    useEffect(() => {
        GetPostDetails();
    }, [postId]); //[]

    return(
        <Container>
            <Row> Post Details for Post {pId}</Row>
            <Row> 
                <Col> Body </Col> <Col> <textarea value = {body.toString()} disabled = {disabled} onChange={(text) => saveText(text)} /> </Col>
            </Row>
            <Row>
                <button color="#841584" disabled = {disabled} onClick = {upvotePost}> Upvote {upvotes}</button>
            </Row>
            <Row>
                <button color = "danger" disabled = {disabled} onClick = {downvotePost}> Downvote {downvotes}</button>
            </Row>

            <Row>
                <Col><button color = "danger" disabled = {disabled} onClick={savePostBody}> Submit Post Text</button></Col>
            </Row>

            <Row>
                <button color = "danger" onClick={navigateChild}>Go to Post {child} </button>
            </Row>

        </Container>
    )

}

export default PostPage;