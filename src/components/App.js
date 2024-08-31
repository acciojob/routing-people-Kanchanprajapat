import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useParams } from "react-router-dom";
import './../styles/App.css';

// Sample user data
const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  { id: 3, name: 'Alice Johnson', email: 'alice@example.com' }
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
      <p>Email: {user.email}</p>
    </div>
  );
};

// Wrapper component to pass user data as props
const UserWrapper = () => {
  const { id } = useParams();
  const user = users.find(user => user.id === parseInt(id, 10));
  return <UserDetail user={user} />;
};

const App = () => {
  return (
    <Router>
      <div>
        {/* Do not remove the main div */}
        <h1>Routing People</h1>
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/users/:id" element={<UserWrapper />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
