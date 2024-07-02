import React, { useState,useContext } from "react";
import { CREATE_POST_MUTATION,UPDATE_POINTS_MUTATION} from "../../GraphQL/Mutations";
import { useMutation } from "@apollo/client";
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
import "./PostForm.css"
import { AuthContext } from '../../context/authContext';
function PostForm() {
  const [ISNB, setiSNB] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genres, setGenres] = useState("");
  const [url, setUrl] = useState("");
  const [PickUPAddress, setpickUPAddress] = useState("");
  let navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const { user } = useContext(AuthContext);

  const [updatePoints] = useMutation(UPDATE_POINTS_MUTATION);
  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION,{
    update(proxy, {data: { createPost: Data}}) {
        alert("Your Book has been successfully Added! Please select from available Books")
        navigate('/Post');
        window.location.reload();

    },
    onError({ graphQLErrors }) {
        setErrors(graphQLErrors)
        console.log("graphql error", graphQLErrors)
    }
    
})
  const addPost = () => {
    
    createPost({
      variables: {
        ISNB: ISNB,
        title: title,
        author: author,
        genres: genres,
        url:url,
        PickUPAddress:PickUPAddress,
        username:user.username
      },
    });

    if (error) {
      console.log(error);
    }
  };
  return (
    <div className="postform">
    <h2>Add a Book to Purchase a Book!</h2>
    <div className = "Post">
      <input
        type="text"
        placeholder="ISNB"
        onChange={(e) => {
          setiSNB(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Title"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Author"
        onChange={(e) => {
          setAuthor(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Genres"
        onChange={(e) => {
          setGenres(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="URL"
        onChange={(e) => {
          setUrl(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Pickup Address"
        onChange={(e) => {
          setpickUPAddress(e.target.value);
        }}
      />
        <button className="add-button" onClick={()=>{
          addPost();
          updatePoints({
            variables: {
              username: user.username,
              points: 10
            }
          });
          console.log(user.username)
       
      } }>Add Book</button>
    </div>
   </div> 
  );

}
export default PostForm;