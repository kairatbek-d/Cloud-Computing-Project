import './register.css'
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/authContext';
import { useForm } from '../../utility/hooks';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'graphql-tag';
import { useNavigate } from "react-router-dom";


const REGISTER_USER = gql`
    mutation Mutation(
        $registerInput: RegisterInput
    ) {
        registerUser(
            registerInput: $registerInput
        ) {
            email
            username
            token
        }
    }
`
function Register(props) {
    const context = useContext(AuthContext);
    let navigate = useNavigate();
    const [errors, setErrors] = useState([]);

    const registerUserCallback = () => {
        //console.log("Callback hit");
        registerUser();
        //console.log("Register user called")
    }
    const { onChange, onSubmit, values } = useForm(registerUserCallback, {
        username: "",
        email: "",
        password: "",
        reEnterPassword: ""
    });

    const [registerUser, { loading }] = useMutation(REGISTER_USER, {
        update(proxy, { data: { registerUser: userData } }) {
            context.login(userData);
            console.log(userData)
            console.log("register user: ", registerUser)
            alert("You have been successfully registered! Please log in to the site")
            navigate('/login');
        },
        onError({ graphQLErrors }) {
            setErrors(graphQLErrors)
            console.log("graphql error", graphQLErrors)
            alert("Please check your input!")
            navigate('/register');
        },
        variables: { registerInput: values }

    })

    return (

        <div className="register">
            <h1>Register</h1>
            <input type="text" name="username" placeholder="Your Name" onChange={onChange}></input>
            <input type="text" name="email" placeholder="Your Email" onChange={onChange}></input>
            <input type="password" name="password" placeholder="Your Password" onChange={onChange}></input>
            <input type="password" name="reEnterPassword" placeholder="Re-enter Password" onChange={onChange}></input>
            <div className="button" onClick={onSubmit} >Register</div>
            <div>or</div>
            <div className="button" onClick={() => navigate("/login")}>Login</div>
        </div>
    )
}
export default Register;
