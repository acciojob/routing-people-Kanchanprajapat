import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useParams } from "react-router-dom";
import './../styles/App.css';

const App = () => {
  return (
    <Router>
      <div>
        <h1>User List</h1>
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/users/:id" element={<UserWrapper />} />
        </Routes>
      </div>
    </Router>
  );
};

// Sample user data with specific email addresses
const users = [
  { id: 1, name: 'Leanne Graham', username: 'Bret', email: 'Sincere@april.biz' },
  { id: 2, name: 'Ervin Howell', username: 'Antonette', email: 'Shanna@melissa.tv' },
  { id: 3, name: 'Clementine Bauch', username: 'Samantha', email: 'Nathan@yesenia.net' }
];

// Component to display list of users with links to their details
const UserList = () => {
  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <Link to={`/users/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Component to display user details
const UserDetail = ({ user }) => {
  if (!user) {
    return <h2>User not found</h2>;
  }

  return (
    <div>
      <h2>User Details</h2>
      <p>Name: {user.name}</p>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
    </div>
  );
};

// Wrapper component to pass user data as props and manage loading state
const UserWrapper = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userId = parseInt(id, 10);
    const fetchedUser = users.find(user => user.id === userId);

    // Simulate loading
    setTimeout(() => {
      setUser(fetchedUser);
      setLoading(false);
    }, 1000);
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <UserDetail user={user} />;
};

export default App;
