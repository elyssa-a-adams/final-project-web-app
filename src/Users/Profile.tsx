import * as client from "./client";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../Snapper/NavBar/navbar";
export default function Profile() {
  const [profile, setProfile] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    dob: "",
    email: "",
    role: "USER",
  });
  const navigate = useNavigate();
  const fetchProfile = async () => {
    const account = await client.profile();
    console.log("account", account);
    if (!account) {
      console.log("account");
      navigate("/Opening/");
    }
    setProfile(account);
  };
  const signout = async () => {
    const result = await client.signout();
    navigate("/Home/");
  };
  const save = async () => {
    const result = await client.updateUser(profile);
  };
  useEffect(() => {
    fetchProfile();
  }, []);
  return (
    <div>
       <NavBar />
      <h1>Profile</h1>
      {profile && (
        <div>
          <input
            value={profile.username}
            onChange={(e) =>
              setProfile({ ...profile, username: e.target.value })
            }
          />
          <input
            value={profile.password}
            onChange={(e) =>
              setProfile({ ...profile, password: e.target.value })
            }
          />
          <input
            value={profile.firstName}
            onChange={(e) =>
              setProfile({ ...profile, firstName: e.target.value })
            }
          />
          <input
            value={profile.lastName}
            onChange={(e) =>
              setProfile({ ...profile, lastName: e.target.value })
            }
          />
          <input
            value={profile.dob}
            type="date"
            onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
          />
          <input
            value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          />
          <select
            onChange={(e) => setProfile({ ...profile, role: e.target.value })}
          >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
          </select>
          <button onClick={() => save()}> Save </button>
          <button onClick={() => signout()}>Signout</button>
          <Link
            to="/Users/"
            className="btn btn-warning w-100"
          >
            Users
          </Link>
        </div>
      )}
    </div>
  );
}
