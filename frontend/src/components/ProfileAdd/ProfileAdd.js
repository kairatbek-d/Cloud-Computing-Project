import './ProfileAdd.css'
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/authContext';
import { useForm } from '../../utility/hooks';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'graphql-tag';
import { useNavigate } from "react-router-dom";
import { CREATE_PROFILE_MUTATION } from "../../GraphQL/Mutations";



function ProfileAdd(props) {
    const context = useContext(AuthContext);
    let navigate = useNavigate();
    const [errors, setErrors] = useState([]);
    const { user } = useContext(AuthContext);

    const profileUserCallback = () => {
        createProfile();
    }
    const { onChange, onSubmit, values } = useForm(profileUserCallback, {
        education: "",
        profession: "",
        phone: "",
        Address: ""

    });

    const [createProfile, { loading }] = useMutation(CREATE_PROFILE_MUTATION, {
        update(proxy, { data: { createProfile: userData } }) {
            alert("Your Profile has been Added Successfully!")
            navigate('/profile');
            window.location.reload();
        },
        onError({ graphQLErrors }) {
            setErrors(graphQLErrors)
            console.log("graphql error", graphQLErrors)
            alert("Profile already exists!")
            navigate('/login');
        },
        variables: { userInput: values }

    })

    return (
        <div className="postform">
            <h2>Manage Your Profile</h2>
            <div className="ProfileAdd">
                <input type="text" name="education" placeholder="Your Education" onChange={onChange}></input>
                <input type="text" name="profession" placeholder="Your Profession" onChange={onChange}></input>
                <input type="text" name="phone" placeholder="Your Phone Number " onChange={onChange}></input>
                <input type="text" name="Address" placeholder="Your Address" onChange={onChange}></input>
                <button className="add-button" onClick={onSubmit} >Add Profile</button>
            </div>
        </div>
    )
}
export default ProfileAdd;
