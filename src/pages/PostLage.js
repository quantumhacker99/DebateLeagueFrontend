import { render } from "@testing-library/react";
import { AxiosResponse } from "axios";
import Axios from 'axios';
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-grid-system";
import { useLocation, useNavigate } from "react-router";
import { Authorize } from "../components/AuthorizeComponent";
//import Cookies from "js-cookie";

/*interface LocationState {
    from : { postId: number };
}*/


const PostPage = () => {

    //var Axios = require('axios').default();

    const [currentUser, setCurrentUser] = useState(Number(localStorage.getItem('userId')));
    //const [user, setUser] = useState(1);
    //const [user, setUser] = useState(Number(localStorage.getItem('userId')));
    const [user, setUser] = useState(-1);
    //console.log("I think " + currentUser + " " + user + currentUser===user);
    const [replyUser, setReplyUser] = useState(-1);


    const [pId, setpId] = useState(0);
    const [body, setBody] = useState("");
    const [upvotes, setUpvotes] = useState(1);
    const [downvotes, setDownvotes] = useState(1);

    const [parent, setParent] = useState(-1);
    const [child, setChild] = useState(-1);

    const { state } = useLocation();
    const [postId, setPostId] = useState(state.postId);


    //const [value, setValue] = useState<string>("");

    const [bodyDisabled, setBodyDisabled] = useState(false);
    const [voteDisabled, setVoteDisabled] = useState(false);
    const [replyDisabled, setReplyDisabled] = useState(false);

    const navigate = useNavigate();

    const [recipientId, setRecipientId] = useState("");

    const GetPostDetailsSuccess = (response) => {
        console.log(response.data);
        if (!response.data.isNull) {

            setpId(response.data.postId);
            setBody(response.data.body);

            setUpvotes(response.data.upvotes);
            setDownvotes(response.data.downvotes);

            setParent(response.data.parent)
            setChild(response.data.child);

            setUser(response.data.user);
            setReplyUser(response.data.replyUser);

            setRecipientId(response.data.replyUser);

            setBodyDisabled(currentUser !== response.data.user || response.data.body !== "");
            setVoteDisabled(currentUser === response.data.user);
            // if(response.data.body != ""){
            //     setBodyDisabled(true);
            // }
            console.log("Post Details " + response.data.postId + " " + response.data.body + " " +
                response.data.upvotes + " " + response.data.downvotes + " "
                + response.data.parent + " " + response.data.child + " "
                + response.data.user + " " + response.data.replyUser + " "
                + user + " " + currentUser);
        }

    }
    const GetPostDetails = async () => {
        //setValue("");
        setBody("");
        //setBodyDisabled(currentUser != user);
        //setVoteDisabled(currentUser == user);
        console.log(postId.toString());



        const result = await Authorize.getResource("http://localhost:3100/postProfile/" + postId.toString())
            .then((response) => { console.log("fetched"); return GetPostDetailsSuccess(response) })
            .catch((err) => { console.log("error"); return "error" });
        //setValue(body.toString());
        //console.log("Hello value " + value + " body " + body);
        if (currentUser === user) {
            console.log("Hurray the user is ", user, " currentUser ", currentUser);
        }
        else {
            console.log("No the user is ", user, " currentUser ", currentUser);
        }
    }

    const navigateParent = () => {
        setPostId(parent);
    }

    const navigateChild = () => {
        setPostId(child);
    }

    const goHome = () => {
        const result = Authorize.postResource("http://localhost:3100/postProfile/" + postId.toString(),
            { "postId": postId, "body": body, "upvotes": upvotes, "downvotes": downvotes, "child": child })
            .then((response) => { if (response.data.success) { console.log(response.data); setBodyDisabled(true) } })
        navigate("/home");
    }

    const upvotePost = () => {
        const result = Authorize.postResource("http://localhost:3100/postProfile/" + postId.toString(),
            { "postId": postId, "body": body, "upvotes": upvotes, "downvotes": downvotes, "child": child })
            .then((response) => { if (response.data.success) { console.log(response.data); setBodyDisabled(true) } })
        setUpvotes(upvotes + 1);
    }

    const downvotePost = () => {
        const result = Authorize.postResource("http://localhost:3100/postProfile/" + postId.toString(),
            { "postId": postId, "body": body, "upvotes": upvotes, "downvotes": downvotes, "child": child })
            .then((response) => { if (response.data.success) { console.log(response.data); setBodyDisabled(true) } })
        setDownvotes(downvotes + 1);
    }

    const savePostBody = () => {
        const result = Authorize.postResource("http://localhost:3100/postProfile/" + postId.toString(),
            { "postId": postId, "body": body, "upvotes": upvotes, "downvotes": downvotes, "child": child })
            .then((response) => { if (response.data.success) { console.log(response.data); setBodyDisabled(true) } })
        //.else()
        setBodyDisabled(true);
    }

    const createReplyPost = () => {
        console.log("Reply user is " + replyUser.toString());
        const result = Authorize.postResource("http://localhost:3100/createPost/" + postId.toString())//, replyUser.toString())
            .then((response) => {
                if (response.data.success) {
                    console.log(response.data);
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
        const result = Authorize.postResource("http://localhost:3100/inviteUser/" + recipientId.toString(), {
            'topic': "Topic",
            'body': body,
            'sendingId': user,
            'postId': postId
        }
        )
            .then((response) => {
                if (response.data.success) { console.log("Invite sent successfully") }
                else { console.log("Invite failed") }
            }
            )
    }

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

    return (
        // <Container>
        //     <Row> Post Details for Post {pId}</Row>
        //     <Row>
        //         <Col> Body </Col>
        //         <Col> <textarea value={body.toString()} disabled={bodyDisabled}
        //             onChange={(text) => setBody(text.target.value)} /> </Col>
        //         {/* <Col><div class="form-floating">
        //             <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style="height: 100px"></textarea>
        //             <label for="floatingTextarea2">Comments</label>
        //         </div></Col> */}
        //     </Row>
        //     <Row>
        //         <button color="#841584" disabled={currentUser === user} onClick={upvotePost}> Upvote {upvotes}</button>
        //     </Row>
        //     <Row>
        //         <button color="danger" disabled={currentUser === user} onClick={downvotePost}> Downvote {downvotes}</button>
        //     </Row>

        //     {
        //         currentUser == user &&

        //         <Row>
        //             <Col><button color="danger" disabled={bodyDisabled}
        //                 onClick={savePostBody}> Submit Post Text</button></Col>
        //         </Row>
        //     }

        //     <Row>
        //         <Col>{parent > 0 ?
        //             <button color="danger" onClick={navigateParent}>Go to Previous Post {parent} </button>
        //             : <button color="danger" onClick={goHome}> Back to Home </button>}</Col>
        //     </Row>

        // <Row>
        //     {child > 0 && <button color="danger" onClick={navigateChild}>Go to Child Post {child} </button>}
        // </Row>

        //     <Row>
        //         {child < 0 && currentUser === replyUser &&
        //             <button color="danger" onClick={createReplyPost}> Reply </button>}
        //     </Row>

        // { currentUser === user && replyUser === -1 &&
        // <Row>
        //     <Col> RecipientID: </Col> <Col><textarea value={recipientId != -1 ? recipientId.toString() : ""}
        //         onChange={(text) => setRecipientId(text.target.value)} /> </Col>
        // </Row>
        //     }

        // {currentUser === user && replyUser === -1 &&
        //     <Row>
        //         <button color="danger" onClick={sendInvite}> Send Invite</button>
        //     </Row>
        // }

        // </Container>

        <div className="container">
            <div className="row">
                <div className="bg-dark text-secondary px-4 py-5 text-center">
                    <div className="py-5">
                        <h1 className="display-5 fw-bold text-white">Post Details for Post {pId}</h1>
                        <div className="col-lg-6 mx-auto">
                            <p className="fs-5 mb-4">Welcome to the Debate!</p>
                            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                                Continue or start a debate by sending an invite. Or spectate the debate and vote the posts accordingly.
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <form>
                <div class="form-group mb-4">
                    <label for="exampleFormControlTextarea1">Enter the post text to post an argument or a counterargument</label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" value={body.toString()} disabled={bodyDisabled}
                        onChange={(text) => setBody(text.target.value)} rows="3" ></textarea>
                </div>
            </form>

            <row mb-4>
                {/* <div class="container">
                    <header class="d-flex justify-content-center py-3">
                        <ul class="nav nav-pills"> */}
                {/* <li class="nav-item"><a href="#" class="nav-link active" aria-current="page">Home</a></li> */}
                {/* <li class="nav-item"><a href="" class="nav-link" disabled={currentUser === user} onClick={upvotePost}>Upvote {upvotes}</a></li>
                            <li class="nav-item"><a href="" class="nav-link">Pricing</a></li>
                            <li class="nav-item"><a href="" class="nav-link">FAQs</a></li>
                            <li class="nav-item"><a href="" class="nav-link">About</a></li>
                        </ul>
                    </header>
                </div> */}
                <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
                    <button type="button" class="btn btn-outline-success" disabled={currentUser === user} onClick={upvotePost}>Upvote {upvotes}</button>
                    <button type="button" class="btn btn-outline-danger" disabled={currentUser === user} onClick={downvotePost}>Downvote {downvotes}</button>
                    {
                        currentUser == user && <button type="button" class="btn btn-outline-primary" disabled={bodyDisabled}
                            onClick={savePostBody}> Submit Post Text</button>
                    }
                    {parent > 0 ?
                        <button type="button" class="btn btn-outline-primary" onClick={navigateParent}>Go to Previous Post {parent} </button>
                        : <button type="button" class="btn btn-outline-primary" onClick={goHome}> Back to Home </button>}
                    {child > 0 && <button type="button" class="btn btn-outline-primary" onClick={navigateChild}>Go to Child Post {child} </button>}
                    {child < 0 && currentUser === replyUser &&
                        <button type="button" class="btn btn-outline-primary" onClick={createReplyPost}> Reply </button>}
                </div>
            </row>

            <form mb-4>
                {currentUser === user && replyUser === -1 &&
                    <div class="form-group mb-4">
                        <label for="exampleFormControlTextarea1">Enter the recipient ID of the user to whom you want to send invite to</label>
                        <textarea class="form-control" id="exampleFormControlTextarea1" value={recipientId != -1 ? recipientId.toString() : ""}
                            onChange={(text) => setRecipientId(text.target.value)} rows="1"></textarea>
                    </div>
                }
            </form>

            <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
                {currentUser === user && replyUser === -1 &&
                    <row>
                        <button type="button" class="btn btn-outline-primary" onClick={sendInvite}> Send Invite</button>
                    </row>
                }
            </div>

            {/* <div className="container">
                <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
                    <div className="col-md-4 d-flex align-items-center">
                        <span className="text-muted">Debate League</span>
                    </div>
                </footer>
            </div> */}

        </div>
    )

}

export default PostPage;
