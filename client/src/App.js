import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import React from 'react';

import NavBar from './Components/NavBar';
import Home from './Components/Home';
import About from './Components/About';
import Contacts from './Components/Contacts';
import AddPost from './Components/AddPost';
import Auth from './Components/Auth';
import PostDetails from './Components/Post/PostDetails';

function App() {
  const user = JSON.parse(localStorage.getItem('profile'));
  
  return (
    <>
      <NavBar title="tDiaries" />      
      
      <Routes>
        <Route path="/" element={<Navigate replace to="/posts" />} />
        <Route path="/posts" element={<Home />} />
        <Route path="/posts/search" element={<Home />} />
        <Route path="/posts/search/:id" element={<PostDetails />} />
        <Route path="/auth" element={ user?.result ? <Navigate replace to="/" /> : <Auth /> } />
        <Route path="/addpost" element={<AddPost />} />          
        <Route path="/addpost/:id" element={<AddPost />} />          
        <Route path="/about" element={<About />} />          
        <Route path="/contacts" element={<Contacts />} />          
      </Routes>
        
      <div className="container my-5">
        <footer className="pt-3 mt-4 text-muted border-top">
          tDiaries© 2022
        </footer>
      </div>

      </>
  );
}

export default App;

