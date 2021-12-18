import React,{ useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import {logUser} from '../services/blogs'

export default function Login() {
    const navigate = useNavigate()
    const usernameRef = useRef(null)
    const passRef = useRef(null)
    const logInUser = async() =>{
        const res = await logUser(
        usernameRef.current.value,
        passRef.current.value,
        )
        if(res.token){
        alert('user logged in!')
        window.localStorage.setItem('token',res.token)
        navigate('/main',{
            state:{
                username: usernameRef.current.value
            }
        })
        }
        else
        {
            alert(res)
        }
    }
    return (
        <div style={{textAlign:'center'}}>
            <h1>Login</h1>
            <b><span>username</span></b>
            <br/>
            <input ref={usernameRef} placeholder='type username'/>
            <br/>
            <b><span>password</span></b>
            <br/>
            <input type='password' ref={passRef} placeholder='type password'/>
            <br/>
            <br/>
            <button className='btn btn-success' onClick={()=>logInUser()}>login</button>
            <br/>
            <br/>
            <a href='/'>click here to go home</a>
            <br/>
            <br/>
            <a href='/register'>click here to register</a>
        </div>
    )
}
