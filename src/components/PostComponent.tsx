//import {IonButton, IonContent, useIonRouter} from '@ionic/react';
import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Router } from 'workbox-routing';


const PostComponent: React.FC = () => {

    const navigate = useNavigate();

    const navigatePostPage = () => {
        navigate("/postProfile");
    }

    return (
        <button color = " blue" onClick={navigatePostPage}>Go to Post 2 </button>
    );
};

export default PostComponent;