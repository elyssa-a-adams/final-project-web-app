import React, { useState, useEffect } from "react";
import * as client from "./client";
import { User } from "./client";
import { BsTrash3Fill } from "react-icons/bs";
import {v4 as uuidv4} from 'uuid';
import NavBar from "../Snapper/NavBar/navbar";
export default function UserTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [user, setUser] = useState<User>({
    _id: "", username: "", password: "", firstName: "",
    lastName: "", role: "USER" });
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
  useEffect(() => { fetchUsers(); }, []);
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
