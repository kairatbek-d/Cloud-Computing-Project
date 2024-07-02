import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { LOAD_PROFILES } from "../../GraphQL/Queries";
import { DELETE_PROFILE_MUTATION } from "../../GraphQL/Mutations";
import "./profile.css";
import { AuthContext } from '../../context/authContext';

const Profile = () => {
  let navigate = useNavigate();
  const routeChange = () => {
    let path = '/ProfileAdd';
    navigate(path);
  };

  const { user } = useContext(AuthContext);
  const { data } = useQuery(LOAD_PROFILES);
  const [profiles, setProfiles] = useState([]);
  const [profileId, setProfileId] = useState("");

  useEffect(() => {
    if (data) {
      setProfiles(data.getProfiles);
      const userProfile = data.getProfiles.find(profile => profile.username === user.username);
      if (userProfile) {
        setProfileId(userProfile.id);
      }
    }
  }, [data, user]);

  const [deactivateProfile] = useMutation(DELETE_PROFILE_MUTATION, {
    update(proxy) {
      alert("Profile Deleted successfully!!!");
      navigate('/Login');
      window.location.reload();
    }
  });

  return (
    <div className="postform">
      <h2>Profile</h2>
      <div className="Profile">
        {user ? (
          <>
            <h4>Hello {user.username}, Welcome to Your Profile!</h4>
          </>
        ) : (
          <>
            <p>There is no userdata</p>
          </>
        )}
        {profiles.map((val) => {
          if (val.username === user.username) {
            return (
              <div key={val.id}>
                <br></br>
                <table className="profile-table">
                  <tbody>
                    <tr>
                      <td className="cell-data"><b>Name</b></td>
                      <td className="data-separator">:</td>
                      <td className="cell-data">{val.username}</td>
                    </tr>
                    <tr>
                      <td className="cell-data"><b>Email</b></td>
                      <td className="data-separator">:</td>
                      <td className="cell-data">{user.email}</td>
                    </tr>
                    <tr>
                      <td className="cell-data"><b>Education</b></td>
                      <td className="data-separator">:</td>
                      <td className="cell-data">{val.education}</td>
                    </tr>
                    <tr>
                      <td className="cell-data"><b>Profession</b></td>
                      <td className="data-separator">:</td>
                      <td className="cell-data">{val.profession}</td>
                    </tr>
                    <tr>
                      <td className="cell-data"><b>Phone</b></td>
                      <td className="data-separator">:</td>
                      <td className="cell-data">{val.phone}</td>
                    </tr>
                    <tr>
                      <td className="cell-data"><b>Address</b></td>
                      <td className="data-separator">:</td>
                      <td className="cell-data">{val.Address}</td>
                    </tr>
                    <tr>
                      <td className="cell-data"><b>Points</b></td>
                      <td className="data-separator">:</td>
                      <td className="cell-data">{val.points} pts</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            );
          }
          return null; // Explicitly return null for non-matching usernames
        })}
        <br></br>
        <button className="custom-button" onClick={() => {
          deactivateProfile({
            variables: {
              user_id: profileId
            }
          });
        }}>Deactivate Profile</button>&nbsp;&nbsp;&nbsp;&nbsp;
        <button className="custom-button" onClick={routeChange}>Manage Profile</button>
      </div>
    </div>
  );
}

export default Profile;