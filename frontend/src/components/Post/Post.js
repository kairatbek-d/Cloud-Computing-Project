import React, { useEffect, useState, useContext, } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { LOAD_POSTS } from "../../GraphQL/Queries";
import { CREATE_PURCHASE_MUTATION, UPDATE_POST_MUTATION, DELETE_PURCHASE_MUTATION, UPDATE_POINTS_MUTATION } from "../../GraphQL/Mutations";
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal'
import "./Post.css"
import { AuthContext } from '../../context/authContext';

var address = "";
var purchaseid = "";

function Post() {
    //const [PickUPAddress, setpickUPAddress] = useState("");
    // const { error, loading, data } = useQuery(LOAD_POSTS)
    const { data } = useQuery(LOAD_POSTS)

    const { user } = useContext(AuthContext);
    const [posts, setPosts] = useState([]);
    const [postError, setPostError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [profiles, setProfiles] = useState([]);
    const [show, setShow] = useState(false);
    
    useEffect(() => {
        if(data) {
            setPosts(data.getPosts);
            setProfiles(data.getProfiles);
        }
    }, [data]);

    const [updatePoints] = useMutation(UPDATE_POINTS_MUTATION);
    const [createPurchase] = useMutation(CREATE_PURCHASE_MUTATION);
    const [updatePost] = useMutation(UPDATE_POST_MUTATION);
    const [deletePurchase] = useMutation(DELETE_PURCHASE_MUTATION);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleErrorModalClose = () => setPostError(false);
    const handleErrorModalShow = () => setPostError(true);
    return (
        <div className="post">
            <h2>Available Books!</h2>
            <main className="grid">
            {posts.map((val) => {
            return (
                <article className="book-card" key={val.id}>
                    <div>
                        <div className="float-left">
                            <img src={val.url} alt={val.title} className="bg-img" />
                        </div>
                    <div className="text float-right">
                    <h4 className="book-title">{val.title}</h4>
                    <table>
                        <tbody>
                            <tr>
                                <td><b>Author</b></td>
                                <td className="separator">:</td>
                                <td> {val.author}</td>
                            </tr>
                            <tr>
                                <td><b>Genre</b></td>
                                <td className="separator">:</td>
                                <td> {val.genres}</td>
                            </tr>
                            <tr>
                                <td><b>ISBN</b></td>
                                <td className="separator">:</td>
                                <td> {val.ISNB}</td>
                            </tr>
                            {/* <tr>
                                <td>Pickup Address</td>
                                <td className="separator">:</td>
                                <td> {val.PickUPAddress}</td>
                            </tr> */}
                            <tr>
                                <td><b>Posted By</b></td>
                                <td className="separator">:</td>
                                <td> {val.username}</td>
                            </tr>
                        </tbody>
                    </table>
                  {/* <h5>Author: {val.author}</h5>
                  <h5>Genre: {val.genres}</h5>
                  <h5>ISBN: {val.ISNB}</h5>
                  <p>Pickup Address: {val.PickUPAddress}</p>
                  <p>Postby: {val.username}</p> */}
                  <div className="meta-text">
                    <button className="purchase-button" onClick={() => {
                      const profile = profiles.find(element => {
                        return element.username.toUpperCase() === user.username.toUpperCase();
                      });
                      if (!profile||!profile.points) {
                        setErrorMessage("Please add profile information to complete purchase.");
                        handleErrorModalShow();

                      }
                      if (profile.points < 10) {
                        setErrorMessage("You don't have enough points to complete purchase.")
                        handleErrorModalShow();

                        // if (!postError) {
                        //   var tag = document.createElement("p");
                        //   var text = document.createTextNode("You don't have points to purchase.");
                        //   tag.appendChild(text);
                        //   var element = document.getElementById(val.id);
                        //   element.appendChild(tag);
                        // }

                        // alert("you dont have enough credits to purchase book.");
                      } else {
                        createPurchase({
                          variables: {
                            PickUPAddress: val.PickUPAddress,
                            idnum: val.id
                          }
                        });
                        updatePost({
                          variables: {
                            idnum: val.id,
                            isAvailable: false
                          }
                        });
                        purchaseid = val.id
                        address = val.PickUPAddress;
                        updatePoints({
                          variables: {
                            username: user.username,
                            points: -10
                          }
                        });
                        console.log(user.username)
                        handleShow();
                      }
                    }}>Purchase Book</button>
                  </div>
                </div>
              </div>
            </article>)
        })}
      </main>
      <br>
      </br>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Order Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Book can be Picked up at below Address:<br></br> <b>{address}</b>
          <br>
          </br>
          Do you want to cancel the Order?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>{
            window.location.reload()
            handleClose()}}>
            No
          </Button>
          <Button variant="primary" onClick={() => {
            deletePurchase({
              variables: {
                purchaseId: purchaseid
              }
            });
            updatePost({
              variables: {
                idnum: purchaseid,
                isAvailable: true
              }
            });
            updatePoints({
              variables: {
                username: user.username,
                points: 10
              }
            });
            handleClose()
            alert("Your Order has been Cancelled")
          }}>
            Cancel Order
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={postError} onHide={handleErrorModalClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Alert! </Modal.Title>
        </Modal.Header>
        <Modal.Body><p id="errorMessage"> {errorMessage}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleErrorModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export default Post;