import React, { useState, useEffect } from "react";
import axios from "axios";
import User from "./Type";

export default function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("");

  const fetchUsers = async () => {
    const response = await axios.get("https://randomuser.me/api/?results=10");
    setUsers(response.data.results);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {}, [sortBy]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (field: string) => {
    setSortBy(field);
  };

  const handleEdit = (index: number, field: keyof User, value: string) => {
    const newUsers = [...users];
    newUsers[index] = { ...newUsers[index], [field]: value };
    setUsers(newUsers);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.first.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.name.last.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <input
        type="text"
        placeholder="Search users"
        value={searchTerm}
        onChange={handleSearch}
      />
      <div>
        Sort By:
        <button onClick={() => handleSort("name.first")}>First Name</button>
        <button onClick={() => handleSort("name.last")}>Last Name</button>
        <button onClick={() => handleSort("name.last")}>Last Name</button>
      </div>
      <div className="card-container">
        {filteredUsers.map((user, index) => (
          <div key={index} className="card">
            <img src={user.picture.large} alt="user" />
            <div>
              <p>
                <strong>Name: </strong>
                {user.name.first} {user.name.last}
              </p>
              <p>
                <strong>Email: </strong>
                {user.email}
              </p>
              <p>
                <strong>Phone: </strong>
                {user.phone}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
