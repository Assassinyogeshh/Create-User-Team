import React from 'react'
import Login from './Components/Auth/login'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Register from './Components/Auth/register';
import AllUsers from './Components/AllUsers/AllUsers';
import Navbar from './Components/Navbar/Navbar';
import UserTeam from './Components/UserTeam/UserTeam';

const App =()=>{
return(

  <>
  <BrowserRouter>
  <Navbar/>
  <Routes>
    <Route path='/' element={<AllUsers/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/userTeam' element={<UserTeam/>}/>
  </Routes>
  
  </BrowserRouter>
  </>

  )
}

export default App
