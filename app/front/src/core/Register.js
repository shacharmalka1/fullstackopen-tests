import React,{ useRef } from 'react'
import { createUser } from '../services/blogs'
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const navigate = useNavigate()
    const usernameRef = useRef(null)
    const passRef = useRef(null)
    const nameRef = useRef(null)
    const addUser = async() =>{
        const res = await createUser(
        usernameRef.current.value,
        passRef.current.value,
        nameRef.current.value
        )
        if(typeof res === 'object'){
        alert('user created!')
        navigate('/login')
        }
        else
        {
            alert(res)
        }
    }
    return (
        <div style={{textAlign:'center'}}>
            <h1>Register</h1>
            <b><span>username</span></b>
            <br/>
            <input ref={usernameRef} placeholder='type username'/>
            <br/>
            <b><span>name</span></b>
            <br/>
            <input ref={nameRef} placeholder='type name (optional)'/>
            <br/>
            <b><span>password</span></b>
            <br/>
            <input type='password' ref={passRef} placeholder='type password'/>
            <br/>
            <br/>
            <button className='btn btn-success' onClick={()=> addUser()}>register</button>
            <br/>
            <br/>
            <a href='/'>click here to go home</a>
            <br/>
            <br/>
            <a href='/login'>click here to login</a>
        </div>
    )
}
