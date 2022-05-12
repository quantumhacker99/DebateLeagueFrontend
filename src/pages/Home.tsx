import { render } from "@testing-library/react";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { Authorize } from "../components/AuthorizeComponent";
import PostComponent from "../components/PostComponent";

type Post = {
  postId: Number,
  body: string,
  upvotes: Number,
  downvotes: Number,
  parent: Number,
  child: Number,
  user: Number,
  replyUser: Number
}


const Home: React.FC = () => {

  const [headPosts, setHeadPosts] = useState<Post[]>([]);
  //localStorage.setItem('userId', '1');
  const navigate = useNavigate();

  const createNewPost = () => {
    const result = Authorize.postResource("http://localhost:3100/createNewPost/" + localStorage.getItem('userId'), "")
      .then((response) => { navigate("/postProfile", { state: { postId: response.data.child } }) });
    //.catch( (err: any) => {console.log("error")});
  }

  const GetHeadPosts = async () => {
    const result = await Authorize.getResource("http://localhost:3100/fetchPosts")
      .then((response) => { console.log("fetched"); setHeadPosts(response.data) })
      .catch((error) => console.log("err"));
  }

  const goInbox = () => {
    navigate("/inbox");
  }

  const logoutButton = async () => {
    Authorize.logout();
  }

  useEffect(() => {
    GetHeadPosts();
  }, []); //[]

  return (
    // <div className="container">
    //   {headPosts.map((post, index) => {
    //     return (
    //       <PostComponent key={index} {...post} />
    //     );
    //   })}
    // <button color=" blue" onClick={() => createNewPost()}> Create New Post</button>
    //   <button color="blue" onClick={() => logoutButton()}> Logout </button>
    //   <button color=" blue" onClick={() => goInbox()}> Your Inbox</button>
    // </div>
    <div className="container">
      <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">

        <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
          {/* <li>
            {headPosts.map((post, index) => {
              return (
                <PostComponent key={index} {...post} />
              );
            })}
          </li> */}
          <button color=" blue" onClick={() => createNewPost()}> Create New Post</button>
          {/* <button color=" blue" onClick={() => goInbox()}> Your Inbox</button> */}
          {/* <li><a href="" className="nav-link px-2 link-dark" onClick={() => createNewPost()}>Create New Post</a></li> */}
          <li><a href="" className="nav-link px-2 link-dark" onClick={() => goInbox()}>Your Inbox</a></li>
        </ul>

        <div className="col-md-3 text-end">
          <button type="button" className="btn btn-outline-primary me-2" onClick={() => logoutButton()}>Logout</button>
        </div>
      </header>

      <div className="bg-dark text-secondary px-4 py-5 text-center">
        <div className="py-5">
          <h1 className="display-5 fw-bold text-white">Continue your debates</h1>
          <div className="col-lg-6 mx-auto">
            <p className="fs-5 mb-4">Continue your debates or watch others debate and vote based on the strength of the argument! </p>
            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
              <li>
                {headPosts.map((post, index) => {
                  return (
                    <PostComponent key={index} {...post} />
                  );
                })}
              </li>
              {/* <button type="button" className="btn btn-outline-light btn-lg px-4">Secondary</button> */}
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
          <div className="col-md-4 d-flex align-items-center">
            <span className="text-muted">Debate League</span>
          </div>
        </footer>
      </div>
    </div>
  )

}

export default Home;
