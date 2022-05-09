import { render } from "@testing-library/react";
import { AxiosResponse} from "axios";
import Axios from 'axios';
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-grid-system";
import { useLocation, useNavigate} from "react-router";
import { Authorize } from "../components/AuthorizeComponent";

/*interface LocationState {
    from : { postId: number };
}*/

// class LocalInviteDTO{
//     private Long invitationID;
//     private String topic;
//     private String body;
//     private Long recipientId;
//     private Long receivedFrom;
//     private Long postId;
// }


const InvitePage = () => {

    //var Axios = require('axios').default();

    //const [currentUser, setCurrentUser] = useState(1);

    const [user, setUser] = useState(Number(localStorage.getItem('userId')));
    //console.log("I think " + currentUser + " " + user);
    // [replyUser,setReplyUser] = useState(1);

    const { state } = useLocation();
    const [inviteId, setInviteId] = useState(state.invitationId);

    const [topic, setTopic] = useState("");
    const [body, setBody] = useState("");
    const [recipientId, setRecipientId] = useState(-1);
    const [receivedFrom, setReceivedFrom] = useState(-1);
    const [postId, setPostId] = useState(-1);
    
    const [disabled, setDisabled] = useState(false);

    
    //const [value, setValue] = useState<string>("");

    // const [bodyDisabled, setBodyDisabled] = useState(false);
    // const [voteDisabled, setVoteDisabled] = useState(false);
    // const [replyDisabled, setReplyDisabled] = useState(false);

    const navigate = useNavigate();

    const GetInviteDetailsSuccess = (response) => {
        console.log(response.data);
        if(!response.data.isNull){

            setInviteId(response.data.invitationID);
            setBody(response.data.body);
            setReceivedFrom(response.data.receivedFrom);
            setRecipientId(response.data.recipientId);
            setPostId(response.data.postId);
            
            // setpId(response.data.postId);
            // setBody(response.data.body);

            // setUpvotes(response.data.upvotes);
            // setDownvotes(response.data.downvotes);

            // setParent(response.data.parent)
            // setChild(response.data.child);

            // setUser(response.data.user);
            // setReplyUser(response.data.replyUser);

            // if(response.data.body != ""){
            //     setBodyDisabled(true);
            // }
            // console.log("Post Details " + response.data.postId + " " + response.data.body + " " + 
            //             response.data.upvotes+ " " + response.data.downvotes + " " 
            //             + response.data.parent + " " + response.data.child + " "
            //             + response.data.user + " " + response.data.replyUser + currentUser);
        }
        
    }
    const GetInviteDetails = async() => {
        //setValue("");
        // setBody("");
        // setBodyDisabled(currentUser != user);
        // setVoteDisabled(currentUser == user);
        // console.log(postId.toString());
        //setInviteId(state.invitationId);

        console.log("Invite ID is " + inviteId);

        const result = await Authorize.getResource("http://localhost:3100/invite/" + state.invitationId.toString())
                    .then((response) => {console.log("fetched"); return GetInviteDetailsSuccess(response)})
                    .catch((err) => {console.log("error"); return "error"});
        //setValue(body.toString());
        //console.log("Hello value " + value + " body " + body);
    }

    // const navigateParent = () =>{
    //     setPostId(parent);
    // }

    // const navigateChild = () =>{
    //     setPostId(child);
    // }

    const navigatePost = () =>{
        navigate("/postProfile", { state : { postId: postId} });
    }
    
    const goInbox = () =>{
        navigate("/inbox");
    }

    const approveRequest = async() =>{
        var response = {"approved":"true"};
        console.log(response.approved);
        const result = await Authorize.postResource("http://localhost:3100/confirmInvite/" + inviteId.toString(),response)
                                  .then( (response) => {if(response.data.success){console.log(response.data.success)}})
                                  //.catch()
        
        setDisabled(true);
    }

    const rejectRequest = async() =>{
        const result = await Authorize.postResource("http://localhost:3100/confirmInvite/" + inviteId.toString(), {
                                                        'approved':'false'
                                    })
                                  .then( (response) => {if(response.data.success){console.log(response.data.success)}})
                                  //.catch()
        
        setDisabled(true);
    }

    // const upvotePost = () => { 
    //     setUpvotes(upvotes+1);
    // }

    // const downvotePost = () => {
    //     setDownvotes(downvotes+1);
    // }

    // const savePostBody = () => {
    //     const result = Axios.post("http://localhost:3100/postProfile/" + postId.toString(), 
    //                             {"postId":postId, "body":body, "upvotes": upvotes, "downvotes":downvotes, "child": child} )
    //                         .then((response) => {if(response.data.success) {console.log(response.data);setBodyDisabled(true)}})
    //                         //.else()
    //     setBodyDisabled(true);
    // }

    // const createReplyPost = () => {
    //     console.log("Reply user is " + replyUser.toString());
    //     const result = Axios.post("http://localhost:3100/createPost/" + postId.toString())//, replyUser.toString())
    //                         .then((response) => {if(response.data.success) 
    //                                     {console.log(response.data); 
    //                                     setUser(response.data.userId); setReplyUser(response.data.replyId);
    //                                     setPostId(response.data.child);
    //                                 }
    //                             })
    //                         //.else()
    //     setBodyDisabled(true);
    // }

    //const createNewPost = ()

    /*const saveText = (text:React.ChangeEvent<HTMLTextAreaElement>) => {
        console.log("Text getting saved")
        setBody(text.target.value);
        //setValue(text.target.value);
    }*/

    //<textarea onChange={(text) => setBody(text.target.value)} />

    useEffect(() => {
        GetInviteDetails();
    }, [inviteId]); //[]

    //if current user is not user then body is always disabled. If they are user, then it depends on bodyDisabled. 

    //If post has a child already then nobody can reply. If post does not have, and current user is replyUser then yes. 

    return(
        <Container>
            <Row> Invite Details for Post {postId} by User {receivedFrom}</Row>
            {/* <Row> 
                <Col> Body </Col> <Col> <textarea value = {body.toString()} disabled = {bodyDisabled} 
                                        onChange={(text) => setBody(text.target.value)} /> </Col>
            </Row> */}
            <Row> 
                <Col> Topic </Col> <Col> {topic} </Col>
            </Row>
            <Row>
                <Col> Body </Col> <Col></Col>
            </Row>
            <Row>
                <button color="#841584" onClick = {navigatePost}> Go to Post {postId}</button>
            </Row>
            <Row>
                <button color = "danger" onClick = {goInbox}> Back to Inbox</button>
            </Row>

            <Row>
                <Col><button color = "danger" disabled = {disabled} 
                                    onClick={approveRequest}> Approve Invite</button></Col>
            </Row>

            <Row>
                <Col><button color = "danger" disabled = {disabled} 
                                    onClick={rejectRequest}> Reject Invite</button></Col>
            </Row>

            {/* <Row>
                <Col>{parent > 0?
                    <button color = "danger" onClick={navigateParent}>Go to Previous Post {parent} </button>
                    : <button color = "danger" onClick = {goHome}> Back to Home </button>}</Col>
            </Row>
            <Row>
                {child > 0 && <button color = "danger" onClick={navigateChild}>Go to Child Post {child} </button>}
            </Row>
            <Row>
                {child <0 && <button color = "danger" disabled = {currentUser != replyUser} onClick={createReplyPost}> Reply </button>}
            </Row> */}

        </Container>
    )

}

export default InvitePage;