import React, { useState, useEffect } from "react";
import * as client from "./client";
import { User } from "./client";
import { Image } from "react-bootstrap";
import NavBar from "../Snapper/NavBar/navbar";
import "./users.css";
import { Link, useParams } from "react-router-dom";
function UsersList(tableType: any) {
    let { username,  } = useParams();
  const [users, setUsers] = useState<User[]>([]);
  const fetchUsers = async () => {
    if (username) {
        const users = await client.findAllUsers();
        const account = await client.findUsersByUsername(username);
        console.log("tableType", tableType.type);
        if (tableType.type === "followers") {
        const userList = users.filter((user: any) => account.followers.includes(user.username));
        setUsers(userList);
        } else {
            console.log(account.following);
            console.log()
        const userList = users.filter((user: any) => account.following.includes(user.username));
        setUsers(userList);

        }
    }
  };
  useEffect(() => { fetchUsers(); }, []);
  return (
    <div>
      <NavBar />
      <div className="usersList">
      <h1>{tableType.type}</h1>
          {users.map((user: any) => (
            <div>
      <div className="p-2"><Image className="profilePhoto" src={`../../images/${user.profilePic}`} roundedCircle width='50px' height='50px' /></div>
      <div className="p-2"><Link to={`/Profile/${user.username}`}>{user.username}</Link></div>
      </div>
            ))}
      </div>
    </div>

  );
}
export default UsersList;