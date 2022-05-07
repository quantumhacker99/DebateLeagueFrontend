import { render } from "@testing-library/react";
import { AxiosResponse} from "axios";
import Axios from 'axios';
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-grid-system";
import { useLocation, useNavigate} from "react-router";
import Cookies from "js-cookie";

/*interface LocationState {
    from : { postId: number };
}*/



const PostPage = () => {

    //var Axios = require('axios').default();

    const [currentUser, setCurrentUser] = useState(Number(Cookies.get('userId')));

    const [user, setUser] = useState(-1);
    console.log("User " + user);
    console.log("Current user " + currentUser);
    //console.log(" Are they equal?" + Number(currentUser) - Number(user));
    //console.log("I think " + currentUser + " " + user + " " + currentUser == user);
    const [replyUser,setReplyUser] = useState(1);


    const [pId, setpId] = useState(0);
    const [body, setBody] = useState("");
    const [upvotes, setUpvotes] = useState(1);
    const [downvotes, setDownvotes] = useState(1);

    const [parent,setParent] = useState(-1);
    const [child, setChild] = useState(-1);

    const { state } = useLocation();
    const [postId, setPostId] = useState(state.postId);

    
    //const [value, setValue] = useState<string>("");

    const [bodyDisabled, setBodyDisabled] = useState(false);
    const [voteDisabled, setVoteDisabled] = useState(false);
    const [replyDisabled, setReplyDisabled] = useState(false);

    const navigate = useNavigate();

    const GetPostDetailsSuccess = (response) => {
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
                        + response.data.user + " " + response.data.replyUser + " " + currentUser);
        }
        
    }
    const GetPostDetails = async() => {
        //setValue("");
        setBody("");
        setBodyDisabled(currentUser != user);
        setVoteDisabled(currentUser == user);
        console.log(postId.toString());

        const result = await Axios.get("http://localhost:3100/postProfile/" + postId.toString())
                    .then((response) => {console.log("fetched"); return GetPostDetailsSuccess(response)})
                    .catch((err) => {console.log("error"); return "error"});
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

    const [recipientId, setRecipientId] = useState("");

    const savePostBody = () => {
        const result = Axios.post("http://localhost:3100/postProfile/" + postId.toString(), 
                                {"postId":postId, "body":body, "upvotes": upvotes, "downvotes":downvotes, "child": child} )
                            .then((response) => {if(response.data.success) {console.log(response.data);setBodyDisabled(true)}})
                            //.else()
        setBodyDisabled(true);
    }

    const createReplyPost = () => {
        console.log("Reply user is " + replyUser.toString());
        const result = Axios.post("http://localhost:3100/createPost/" + postId.toString())//, replyUser.toString())
                            .then((response) => {if(response.data.success) 
                                        {console.log(response.data); 
                                        setUser(response.data.userId); setReplyUser(response.data.replyId);
                                        setPostId(response.data.child);
                                    }
                                })
                            //.else()
        setBodyDisabled(true);
    }

    const sendInvite = () => {
        //setRecipientId("1");
        console.log(recipientId);
        const result = Axios.post("http://localhost:3100/inviteUser/" + recipientId.toString() , {
                                        'topic': "Topic",
                                        'body':body,
                                        'sendingId':user,
                                        'postId':postId
                                        }
                        )
                        .then( (response) => {if(response.data.success) {console.log("Invite sent successfully")} 
                                              else{ console.log("Invite failed")}}
                            )
    }

// type SendInviteDTO{
//     private String topic;
//     private String body;
//     private String sendingId;
//     private String postId;
// }



    //const createNewPost = ()

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

            {/* {currentUser == user && */}
            <Row> 
                <Col> RecipientID: </Col> <Col><textarea value = {recipientId.toString()}  
                                        onChange={(text) => setRecipientId(text.target.value)} /> </Col>
            </Row>
             {/* } */}

            {/* {currentUser == user && */}
            <Row>
                <button color = "danger" onClick={sendInvite}> Send Invite</button>
            </Row>
            {/* } */}

        </Container>
    )

}

export default PostPage;