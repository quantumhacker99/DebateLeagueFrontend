//import {IonButton, IonContent, useIonRouter} from '@ionic/react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Router } from 'workbox-routing';

type PostProps = {
    postId: Number,
    body: string,
    upvotes: Number,
    downvotes: Number,
    parent: Number,
    child: Number,
    user: Number,
    replyUser: Number
}

type LocationState = {
    postId: number
}


const PostComponent: React.FC<PostProps> = (props: PostProps) => {

    const navigate = useNavigate();

    const navigatePostPage = () => {
        navigate("/postProfile", { state: { postId: props.postId } });
    }

    const pId = props.postId;
    const body = "Go to Post " + props.postId.toString();

    return (
        // <button color=" blue" onClick={() => navigatePostPage()}> {body}</button>
        <button type="button" className="btn btn-outline-light btn-lg px-4" onClick={() => navigatePostPage()}>{body}</button>
    );
};

export default PostComponent;