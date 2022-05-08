import Axios from "axios";
import React from 'react';

export class Authorize {

  static getUserId(){
    return localStorage.getItem('userId');
  }


  static getHeaders(){
    if (localStorage.getItem('userId') && localStorage.getItem('token')) {
       return {Authorization: "Bearer " + localStorage.getItem('token')};
    }
  }

  static getResource(resourceUrl:string){ 
    var headers = this.getHeaders(); 
    return Axios.get(resourceUrl, {headers});
  }

  static postResource(resourceUrl:string, resource:any){ 
    let headers = this.getHeaders();
    
    return Axios.post(resourceUrl, resource, {headers});
  }

  static checkCredentials(){
    let val = localStorage.getItem('token');
    if(!val){
      return false;
    }
    return true;
  } 

  static logout(){
      localStorage.removeItem('userId');
      localStorage.removeItem('token');
  }
}