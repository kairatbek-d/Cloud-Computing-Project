import "./login.css"
import { useNavigate } from "react-router-dom"
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/authContext';
import { useForm } from '../../utility/hooks';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'graphql-tag';
//import Profile from "../profile/profile";

const LOGIN_USER = gql `
    mutation login(
        $loginInput: LoginInput
    ) {
        loginUser(
            loginInput: $loginInput
        ) {
            email
            username
            token
        }
    }
`

function Login(props) {
    const context = useContext(AuthContext);
    let navigate = useNavigate();
    // const [ errors, setErrors ] = useState([])
    const [ setErrors ] = useState([])

    function loginUserCallback() {
        //console.log("login user hit")
        loginUser();
         // console.log("after login user hit")

    }

    const {onChange, onSubmit, values} = useForm(loginUserCallback, {
        username:"",
        email: "",
        password: ""
    });

    // const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    const [loginUser] = useMutation(LOGIN_USER, {
         update(proxy, {data: { loginUser: userData}}) {
            context.login(userData);
            alert("Login successful!!!")
            navigate('/profile');
        },
        onError({ graphQLErrors }) {
            setErrors(graphQLErrors)
            console.log("graphql error", graphQLErrors)
            alert(" Please check your login info! ")
        },
        variables: {loginInput: values}
        
    })
    
    return (
        <div className="login">
            <h1>Login</h1>
            <p> This is the login page, login below </p>
            <input type="text" name="username" placeholder="username" onChange={onChange}></input>
            <input type="text" name="email" placeholder="Your email" onChange={onChange}></input>
            <input type="password" name="password" placeholder="Your Password" onChange={onChange}></input>
            <div className="button" onClick={onSubmit} >Login</div>
            <div>or</div>
            <div className="button" onClick={() => navigate("/register")}>Register</div>
        </div>
    )
}

export default Login