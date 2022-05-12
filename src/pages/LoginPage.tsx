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
import Axios, { AxiosResponse } from 'axios';
import React, { useState, useEffect, useContext } from 'react';
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


const Login: React.FC = ({ history }: any) => {

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
    if (!response.data.isNull && response.data.id && response.data.accessToken) {
      // successful login
      // console.log(response.data.awwId); // remove this in production
      if (localStorage.getItem('userId')) {
        localStorage.removeItem('userId');
      }

      if (localStorage.getItem('token')) {
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

  const login = async () => {
    navigate("/home");
    const result = await Axios.post("http://localhost:3100/login",
      {
        "userID": username,
        "password": password
      }
    )
      .then((response) => { return loginSuccess(response); })
      .catch((err) => { console.log("Login Error"); return "error"; });

    if (result == "valid") {
      setPressed(true);
      navigate("/");
    }

    if (result == "invalid") {
      alert("Credentials are incorrect, enter again");
    }

    if (result == "error") {
      setErrorMsg("There was a problem connecting to server.");
    }


  };


  return (
    <div className="container">
      {/* <div className="bg-dark bg-gradient"> */}
      <header>
        {/* <toolbar>
              <IonTitle>Login</IonTitle>
            </IonToolbar> */}
        <title>
          Login
        </title>
      </header>

      {/* <span className="border"></span> */}


      <div className="bg-info bg-gradient">
        <div className="row">
          <h1>Welcome to the Debate League! Please login.</h1>
        </div>
      </div>

      <form>
        {/* <IonCard color="warning">
              <IonCardContent className="ion-padding"> */}
        {/* <input className="credential" placeholder="Username?" onChange={(e: any) => setUsername(e.target.value)} /> */}
        <div className="row mt-3">
          <div className="col">
            {/* <div className="mb-3"> */}
            <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e: any) => setUsername(e.target.value)} />
            {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
            {/* </div> */}
          </div>
          {/* <input className="credential" type="password" placeholder="Password?" onChange={(e: any) => setPassword(e.target.value)} /> */}
          <div className="col">
            {/* <div className="mb-3"> */}
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" onChange={(e: any) => setPassword(e.target.value)} />
            {/* </div> */}
          </div>
        </div>

        <div className="row">{errorMsg}</div>

        {/* one col button - */}
        {/* <div className="row mt-4 justify-content-center">
            <div className="col-md-1">
              <button type="button" className="btn btn-outline-primary" disabled={pressed} onClick={login}>Login</button>
            </div>
          </div> */}

        {/* small button */}
        <div className="row mt-4">
          <button type="button" className="btn btn-outline-primary" disabled={pressed} onClick={login}>Login</button>
        </div>

        {/* <Row className="ion-padding ion-justify-content-center">
                      <p onClick={navigateToRegistration}>forget password?</p>
                  </IonRow> */}
        {/* </IonCardContent>
            </IonCard> */}
      </form>

      {/* <div className="b-example-divider"></div> */}

      <div className="row mt-4">
        <div className="bg-dark text-secondary px-4 py-5 text-center">
          <div className="py-5">
            <h1 className="display-5 fw-bold text-white">Debate League</h1>
            <div className="col-lg-6 mx-auto">
              <p className="fs-5 mb-4">An Online Platform where users can debate with each other without any need of a moderator! Sharpen your skills and build connections with others! </p>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}

      <div className="container">
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
          <div className="col-md-4 d-flex align-items-center">
            <span className="text-muted">Debate League</span>
          </div>
        </footer>
      </div>
    </div>
  );
};



export default Login;


