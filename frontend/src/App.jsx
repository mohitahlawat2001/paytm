import { BrowserRouter, Route ,Routes ,Navigate } from 'react-router-dom'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard'
import Send from './pages/Send'
import {useState, useEffect } from 'react'
import axios from 'axios'
const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function App() {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(()=>{
    checkToken();
  },[]);

  const checkToken = async ()=>{
    const token = localStorage.getItem("token");
    try{
        const res = await axios.get(`${VITE_BACKEND_URL}/api/v1/user/me`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setIsLoggedIn(res.data.loggedIn);
      }catch(error){
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    }
    
  if(loading){
    return <div>Loading...</div>
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/signin" />} />
        <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn setIsLoggedIn={setIsLoggedIn}/>} />
          <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/signin" />} />
          <Route path="/send" element={isLoggedIn ? <Send /> : <Navigate to="/signin" />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
