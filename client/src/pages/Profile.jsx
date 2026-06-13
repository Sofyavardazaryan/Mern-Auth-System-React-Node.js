import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "./Profile.css";

function Profile() {
  const { user } = useContext(AuthContext);

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h1>Profile</h1>

        <div className="profile-info">
          <span>Username:</span> {user?.username}
        </div>

        <div className="profile-info">
          <span>Email:</span> {user?.email}
        </div>
      </div>
    </div>
  );
}

export default Profile;
