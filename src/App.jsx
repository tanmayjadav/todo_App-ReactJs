import {BrowserRouter as Router,Route,Routes} from "react-router-dom"
import Home from "./pages/Home";
import Header from "./components/Header";
import toast, { Toaster } from "react-hot-toast";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import { useContext, useEffect } from "react";
import axios from "axios";
import { Context, server } from "./main";

function App() {

  const {setUser,setIsAuthenticated,setLoading} = useContext(Context);

  useEffect(()=>{
      setLoading(true);
      axios.get(`${server}/users/me`,{
        withCredentials:true,
      }).then((res)=>{
        setUser(res.data.user);
        setIsAuthenticated(true);
        setLoading(false);
      }).catch((error)=>{
        // toast.error(error.response.data.message)
        setUser({});
        setIsAuthenticated(false);
        setLoading(false)

      })
  },[]);

  return <Router>
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/login" element={<Login/>}/>  
    </Routes>
    <Toaster/>
  </Router>

}

export default App;
