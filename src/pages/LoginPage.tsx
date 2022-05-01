 import Axios, { AxiosResponse } from "axios";
// import Cookies from 'js-cookie';
// import React, { useState }  from "react"
// import { Col, Row } from "react-grid-system";
// import { Navigate, useNavigate } from "react-router";

//  const LoginPage:React.FC = () =>{
//      const [username, setUsername] = useState<String>("");
//      const [password, setPassword] = useState<String>("");

//      const LoginSuccess = (response:AxiosResponse) =>{
//          if(!response.data.isNull){
//              Cookies.set("id", response.data.userId);
//              Cookies.set("username", response.data.username);
             
//              //const navigate = useNavigate();
//              //navigate("/home");
//          }
//      }

//      const Login = async() => {
//          const result = await Axios.post("http://localhost:3100/login", 
//                                     {
//                                         "username":username,
//                                         "password":password
//                                     })
//                                    .then( (response) => LoginSuccess(response))
//                                    .catch((error) => console.log("error"));

//      }

//     //  function handleChange(event) {
//     //     this.setState({value: event.target.value});
//     //   }
    
//     //   function handleSubmit(event:any) {
//     //     alert('A name was submitted: ' + username);
//     //     event.preventDefault();
//     //   }


//      return(
//         <form onSubmit={Login}>
//             <Row>

//             <Col />
//             <Col>
//         <label>
//           Username:
//           <input type="text" value={username.toString()} onChange={(event) => {setUsername(event.target.value)}} />
//         </label>
//         </Col>
//         </Row>
//         <Row>
//             <Col />
//             <Col>
//         <label>
//           Password:
//           <input type="text" value={password.toString()} onChange={(event) => {setPassword(event.target.value)}} />
//         </label>
//         </Col>
//         </Row>
//         <input type="submit" value="Submit" />
//       </form>
//      )
//  }

//  export default LoginPage;