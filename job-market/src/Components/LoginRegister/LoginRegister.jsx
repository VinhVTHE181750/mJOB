import React, { useState } from 'react'
import './LoginRegister.css';
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";

const LoginRegister =() => {
    const [action,setAction]= useState('')
    const registerlink = () => {
        setAction('avtive')
    };
    const loginlink = () => {
        setAction('')
    }
    return(
        <div className={`wrapper ${action}`}>
            <div className='form-box login'>
                <form action="">
                    <h1>Login</h1>
                    <div className="input-box">
                        <input type="text"
                        placeholder='Username'required />
                        <FaUser className='icon' />
                    </div>
                    <div className="input-box">
                        <input type="password"
                        placeholder='Password'required />
                        <FaLock className='icon' />
                    </div>
                    <div className="remember-forgot">
                        <label><input type="checkbox" />
                        Remember me</label>
                        <a href="#">Forgot password?</a>
                        </div>
                        <button type = "submit">login</button>
                    <div className='register-link'>
                        <p>Don't have an account? <a href="#" onClick={registerlink}>Register</a></p>
                    </div>
                </form>
            </div>
            <div className='form-box register'>
                <form action="">
                    <h1>Register</h1>
                    <div className="input-box">
                        <input type="text"
                        placeholder='Username'required />
                        <FaUser className='icon' />
                    </div>
                    <div className="input-box">
                        <input type="email"
                        placeholder='Email'required />
                        <MdAlternateEmail className='icon' />
                    </div>
                    <div className="input-box">
                        <input type="password"
                        placeholder='Password'required />
                        <FaLock className='icon' />
                    </div>
                    <div className="remember-forgot">
                        <label><input type="checkbox" />
                        I agree to the terms & conditions</label>
                    </div>    
        
                        <button type = "submit">Resister</button>
                    <div className='register-link'>
                        <p>Already have an account? <a href="#"onClick={loginlink}>Login</a></p>
                    </div>
                    
                </form>
            </div>
        </div>
    )
};
export default LoginRegister 