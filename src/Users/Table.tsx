import React, { useState, useEffect } from "react";
import * as client from "./client";
import { User } from "./client";
import { BsTrash3Fill } from "react-icons/bs";
import {v4 as uuidv4} from 'uuid';
import NavBar from "../Snapper/NavBar/navbar";
import { useNavigate } from "react-router-dom";
export default function UserTable() {
  type ProfileType = {
    profilePic: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    dob: string;
    email: string;
    role: string;
    followers: string[];
    following: string[];
  };
  const [profile, setProfile] = useState<ProfileType>({
    profilePic: "",
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    dob: "",
    email: "",
    role: "USER",
    followers: [],
    following: [],
  });
  const navigate = useNavigate();
  const fetchProfile = async () => {
    const account = await client.profile();
    console.log("account", account);
    if (!account || account.role !== "ADMIN") {
      console.log("account");
      navigate("/Home/");
    }
    console.log("account", account);
    setProfile(account);
  };
  const [users, setUsers] = useState<User[]>([]);
  const [user, setUser] = useState<User>({
    _id: "", username: "", password: "", firstName: "",
    lastName: "", role: "USER", followers: [], following: []});
  const createUser = async () => {
    try {
      const newUser = await client.createUser(user);
      setUsers([...users, newUser]);
    } catch (err) {
      console.log(err);
    }
  };
  const deleteUser = async (user: User) => {
    try {
      await client.deleteUser(user);
      setUsers(users.filter((u) => u._id !== user._id));
    } catch (err) {
      console.log(err);
    }
  };
  const fetchUsers = async () => {
    const users = await client.findAllUsers();
    setUsers(users);
  };
  useEffect(() => { 
    fetchProfile();
    fetchUsers();
   }, []);
  return (
    <div>
      <NavBar />
      <h1>User Table</h1>
      <table className="table">
        <thead>
        <tr>
            <td>
              <input value={user.password} onChange={(e) =>
                setUser({ ...user, password: e.target.value })}/>
              <input value={user.username} onChange={(e) =>
                setUser({ ...user, username: e.target.value })}/>
            </td>
            <td>
              <input value={user.firstName} onChange={(e) =>
                setUser({ ...user, firstName: e.target.value })}/>
            </td>
            <td>
              <input value={user.lastName} onChange={(e) =>
                setUser({ ...user, lastName: e.target.value })}/>
            </td>
            <td>
              <select value={user.role} onChange={(e) => {
                setUser({ ...user, role: e.target.value });
                setUser({ ...user, _id: uuidv4() });}}>
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
                <option value="FACULTY">Faculty</option>
                <option value="STUDENT">Student</option>
              </select>
            </td>
            <td>
            <button onClick={() => createUser()} className="btn btn-primary">
        Create
      </button>
            </td>
          </tr>
        </thead>
        <tbody>
          {users.map((user: any) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.role}</td>
              <td>
            <button onClick={() => deleteUser(user)} className="btn btn-primary">
            <BsTrash3Fill />
      </button>
            </td>
            </tr>))}
        </tbody>
      </table>
    </div>
  );
}
