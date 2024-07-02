import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import './App.css';
import React from 'react';
import  Navbar  from "./components/nav/navbar"
import Register from "./components/register/register"
import Login from "./components/login/login"
import Homepage from "./components/homepage/homepage"
import Footer from "./components/footer/footer"
import Profile from "./components/profile/profile";
import Post from "./components/Post/Post";
import PostForm from "./components/PostForm/PostForm";
import ProfileAdd from "./components/ProfileAdd/ProfileAdd";

function App() {
  return (
    <div>
      <Navbar/>
      <div className="App">
      <Routes>
          {<Route exact path='/' element={< Homepage />}></Route> }
          <Route exact path='/login' element={< Login />}></Route>
          <Route exact path='/register' element={< Register />}></Route>
          <Route exact path='/homepage' element={< Homepage />}></Route>
          <Route exact path='/profile' element={<Profile />}></Route>
          <Route forceRefresh={true} exact path='/Post' element={<Post />}></Route>
          <Route exact path='/PostForm' element={<PostForm />}></Route>
          <Route exact path='/ProfileAdd' element={<ProfileAdd />}></Route>
      </Routes>
    </div>
    </div>
  );
}

export default App;