import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context, server } from '../main';
import axios from 'axios';
import toast from 'react-hot-toast';


const Header = () => {
    const {isAuthenticated,setIsAuthenticated,loading,setLoading} = useContext(Context);
    
    const LogoutHandler = async ()=>{
        setLoading(true)
        try {
            const {data} = await axios.get(`${server}/users/logout`,{
                withCredentials:true,
            });
        toast.success("Logout Successfully");
        setIsAuthenticated(false);
        setLoading(false)
        } catch (error) {
            toast.error(error.response.data.message);
            setIsAuthenticated(true);
            setLoading(false)
        }
    };

  return (
    <nav className='header'>
        <div>
            <h2>TODO APP.</h2>
        </div>
        <article>
            <Link to={"/"}>Home</Link>
            <Link to={"/profile"}>Profile</Link>
            {isAuthenticated?(
                <button disabled={loading} onClick={LogoutHandler} className="btn">Logout</button>
            ):(
                <Link to={"/login"}>login</Link>
            )}
            
            
        </article>

    </nav>
  );
};

export default Header
