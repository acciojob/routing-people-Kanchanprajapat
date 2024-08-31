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

// Sample user data with website information included
const users = [
  { id: 1, name: 'Leanne Graham', username: 'Bret', email: 'Sincere@april.biz', phone: '1-770-736-8031 x56442', website: 'hildegard.org' },
  { id: 2, name: 'Ervin Howell', username: 'Antonette', email: 'Shanna@melissa.tv', phone: '010-692-6593 x09125', website: 'anastasia.net' },
  { id: 3, name: 'Clementine Bauch', username: 'Samantha', email: 'Nathan@yesenia.net', phone: '1-463-123-4447', website: 'ramiro.info' }
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
      <p>Phone: {user.phone}</p>
      <p>Website: <a href={`http://${user.website}`} target="_blank" rel="noopener noreferrer">{user.website}</a></p> {/* Added website */}
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
