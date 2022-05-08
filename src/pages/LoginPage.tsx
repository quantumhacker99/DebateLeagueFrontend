// import { IonContent, 
//     IonHeader, 
//     IonPage, 
//     IonTitle, 
//     IonToolbar,
//     IonInput,
//     IonButton,
//     useIonRouter, 
//     IonGrid,
//     IonRow,
//     IonCol,
//     IonCard,
//     IonCardContent,
//     IonMenuButton,
//     IonButtons,
//     IonRouterOutlet,
//     IonCardSubtitle} from '@ionic/react';
import Axios, { AxiosResponse} from 'axios';
import React, {useState, useEffect, useContext} from 'react';
//import { IonReactRouter } from '@ionic/react-router';
// import MenuContainer from '../components/MenuContainer';
// import LoginClient from '../httpClient/LoginClient';
// import "./Login.css"
// import { RouteComponentProps, useNavigate } from 'react-router';
// import { BrowserRouter, Link, Switch} from 'react-router-dom';
// import  Axios, {AxiosResponse } from 'axios';
// import {AuthContext } from '../contexts/AuthContextProvider';
// import useAuth from '../hooks/useAuth';
// import LocalDB from '../storage/LocalDB';
//import {RouteComponentProps} from 'react-router';
import { Container, Row } from 'react-grid-system';
import { useNavigate } from 'react-router';


const Login:React.FC = ({history}: any) => {

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("")
    const [errorMsg, setErrorMsg] = useState<string>("");
    const [pressed, setPressed] = useState<boolean>(false);
    

    // const router = useIonRouter();
    // var pressed:boolean = false;
    
    // const navigateToRegistration = () => {
    //   history.push("/register")
    // };
    
    const navigate = useNavigate();

    const loginSuccess = (response: AxiosResponse) => {
      if(!response.data.isNull && response.data.id && response.data.accessToken){
        // successful login
        // console.log(response.data.awwId); // remove this in production
        if(localStorage.getItem('userId')){
            localStorage.removeItem('userId');
        }

        if(localStorage.getItem('token')){
          localStorage.removeItem('token');
        }
        console.log('userId is ' + response.data.id + ' token is ' + response.data.accessToken);;
        localStorage.setItem('userId', response.data.id);
        localStorage.setItem('token', response.data.accessToken);
        return "valid";
      }
      else
          return "invalid";
    };

    const login = async() =>{
        navigate("/home");
        const result = await Axios.post("http://localhost:3100/login",
                                        {
                                            "userID":username,
                                            "password":password
                                        }
                                    )
                                    .then( (response) => {return loginSuccess(response);})
                                    .catch( (err) => {console.log("Login Error");return "error";});
        
        if(result == "valid"){
            setPressed(true);
            navigate("/");
        }
        
        if(result == "invalid"){
            alert("Credentials are incorrect, enter again");
        }
        
        if(result == "error"){
            setErrorMsg("There was a problem connecting to server.");
        }


    };


    return (
      <Container>
        <header>
          {/* <toolbar>
            <IonTitle>Login</IonTitle>
          </IonToolbar> */}
          <title>
              Login
          </title>
        </header>

        <form>
          {/* <IonCard color="warning">
            <IonCardContent className="ion-padding"> */}
                <input className="credential" placeholder="Username?" onChange={(e: any) => setUsername(e.target.value)} />
                <input className="credential" type="password" placeholder="Password?" onChange={(e: any) => setPassword(e.target.value)}/>
                <Row>{errorMsg}</Row>
                <Row className="ion-justify-content-center">
                  <button type = "button" disabled={pressed} onClick={login}>Login</button>
                </Row>
                {/* <Row className="ion-padding ion-justify-content-center">
                    <p onClick={navigateToRegistration}>forget password?</p>
                </IonRow> */}
            {/* </IonCardContent>
          </IonCard> */}
        </form>    
      </Container>
    );
};



export default Login;


