//import {IonButton, IonContent, useIonRouter} from '@ionic/react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Router } from 'workbox-routing';

type InviteProps = {
    isNull: boolean,
    invitationID: Number,
    topic: string,
    body: string,
    recipientId: Number,
    receivedFrom: Number
    postId: Number,
}
type LocationState = {
    postId: number
}


const InviteComponent: React.FC<InviteProps> = (props: InviteProps) => {

    const navigate = useNavigate();

    const navigateInvitePage = () => {
        navigate("/invitePage", { state: { invitationId: props.invitationID } });
    }

    //const pId = props.postId;
    const body = "New Invite from user with user ID " + props.receivedFrom.toString() + " about " + props.topic;

    return (
        <button type="button" className="btn btn-outline-primary" onClick={() => navigateInvitePage()}> {body}</button>
    );
};

export { InviteComponent };