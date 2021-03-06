import { render } from "@testing-library/react";
import { AxiosResponse} from "axios";
import Axios from 'axios';
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-grid-system";
import { useNavigate } from "react-router";
import { Authorize } from "../components/AuthorizeComponent";


const PostPage: React.FC = () => {

    //var Axios = require('axios').default();

    const [currentUser, setCurrentUser] = useState<number>(3);

    const [user, setUser] = useState<number>(1);
    const [replyUser,setReplyUser] = useState<number>(2);

    const [pId, setpId] = useState<number>(0);
    const [body, setBody] = useState<String>("");
    const [upvotes, setUpvotes] = useState<number>(1);
    const [downvotes, setDownvotes] = useState<number>(1);

    const [parent,setParent] = useState<number>(-1);
    const [child, setChild] = useState<number>(-1);

    const [postId, setPostId] = useState<number>(1);
    //const [value, setValue] = useState<string>("");

    const [bodyDisabled, setBodyDisabled] = useState<boolean>(false);
    const [voteDisabled, setVoteDisabled] = useState<boolean>(false);
    const [replyDisabled, setReplyDisabled] = useState<boolean>(false);

    const navigate = useNavigate();

    const GetPostDetailsSuccess = (response:AxiosResponse) => {
        console.log(response.data);
        if(!response.data.isNull){
            
            setpId(response.data.postId);
            
            setBody(response.data.body);

            setUpvotes(response.data.upvotes);
            setDownvotes(response.data.downvotes);

            setParent(response.data.parent)
            setChild(response.data.child);

            setUser(response.data.user);
            setReplyUser(response.data.replyUser);

            if(response.data.body != ""){
                setBodyDisabled(true);
            }
            console.log("Post Details " + response.data.postId + " " + response.data.body + " " + 
                        response.data.upvotes+ " " + response.data.downvotes + " " 
                        + response.data.parent + " " + response.data.child + " "
                        + response.data.user + " " + response.data.replyUser + currentUser);
        }
        
    }
    const GetPostDetails = async() => {
        //setValue("");
        setBody("");
        setBodyDisabled(currentUser != user);
        setVoteDisabled(currentUser == user);
        console.log(postId.toString());

        const result = await Authorize.getResource("http://localhost:3100/postProfile/" + postId.toString())
                    .then((response) => {console.log("fetched"); return GetPostDetailsSuccess(response)})
                    .catch((err: any) => {console.log("error"); return "error"});
        //setValue(body.toString());
        //console.log("Hello value " + value + " body " + body);
    }

    const navigateParent = () =>{
        setPostId(parent);
    }

    const navigateChild = () =>{
        setPostId(child);
    }
    
    const goHome = () =>{
        navigate("/home");
    }

    const upvotePost = () => { 
        setUpvotes(upvotes+1);
    }

    const downvotePost = () => {
        setDownvotes(downvotes+1);
    }

    const savePostBody = () => {
        const result = Authorize.postResource("http://localhost:3100/postProfile/" + postId.toString(), 
                                {"postId":postId, "body":body, "upvotes": upvotes, "downvotes":downvotes, "child": child} )
                            .then((response) => {if(response.data.success) {console.log(response.data);setBodyDisabled(true)}})
                            //.else()
        setBodyDisabled(true);
    }

    const createReplyPost = () => {
        console.log("Reply user is " + replyUser.toString());
        const result = Authorize.postResource("http://localhost:3100/createPost/" + postId.toString(), "")//, replyUser.toString())
                            .then((response) => {if(response.data.success) 
                                        {console.log(response.data); 
                                        setUser(response.data.userId); setReplyUser(response.data.replyId);
                                        setPostId(response.data.child);
                                    }
                                })
                            //.else()
        setBodyDisabled(true);
    }

    /*const saveText = (text:React.ChangeEvent<HTMLTextAreaElement>) => {
        console.log("Text getting saved")
        setBody(text.target.value);
        //setValue(text.target.value);
    }*/

    //<textarea onChange={(text) => setBody(text.target.value)} />

    useEffect(() => {
        GetPostDetails();
    }, [postId]); //[]

    //if current user is not user then body is always disabled. If they are user, then it depends on bodyDisabled. 

    //If post has a child already then nobody can reply. If post does not have, and current user is replyUser then yes. 

    return(
        <Container>
            <Row> Post Details for Post {pId}</Row>
            <Row> 
                <Col> Body </Col> <Col> <textarea value = {body.toString()} disabled = {bodyDisabled} 
                                        onChange={(text) => setBody(text.target.value)} /> </Col>
            </Row>
            <Row>
                <button color="#841584" disabled = {currentUser == user} onClick = {upvotePost}> Upvote {upvotes}</button>
            </Row>
            <Row>
                <button color = "danger" disabled = {currentUser == user} onClick = {downvotePost}> Downvote {downvotes}</button>
            </Row>

            <Row>
                <Col><button color = "danger" disabled = {bodyDisabled} 
                                    onClick={savePostBody}> Submit Post Text</button></Col>
            </Row>

            <Row>
                <Col>{parent > 0?
                    <button color = "danger" onClick={navigateParent}>Go to Previous Post {parent} </button>
                    : <button color = "danger" onClick = {goHome}> Back to Home </button>}</Col>
            </Row>

            <Row>
                {child > 0 && <button color = "danger" onClick={navigateChild}>Go to Child Post {child} </button>}
            </Row>

            <Row>
                {child <0 && <button color = "danger" disabled = {currentUser != replyUser} onClick={createReplyPost}> Reply </button>}
            </Row>

        </Container>
    )

}

export default PostPage;