import {
  useContext,
} from "react";

import {
  AuthContext,
} from "../context/AuthContext";

function Profile() {
  const { user } =
    useContext(AuthContext);

  return (
    <div>
      <h1>Profile</h1>

      <p>
        Username:
        {user?.username}
      </p>

      <p>
        Email:
        {user?.email}
      </p>
    </div>
  );
}

export default Profile;