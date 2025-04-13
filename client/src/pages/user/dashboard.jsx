import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [items, setItems] = useState([]);
  
  // Fetch user data from the backend
  useEffect(() => {
    // Assuming you have a route to fetch user details
    fetch('/api/user')
      .then(response => response.json())
      .then(data => setUser(data))
      .catch(error => console.log('Error fetching user:', error));
    
    // Fetch items (adjust this if needed for your setup)
    fetch('/api/items')
      .then(response => response.json())
      .then(data => setItems(data))
      .catch(error => console.log('Error fetching items:', error));
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <h1 className="welcome-heading">Welcome, {user.username}</h1>
      <p className="user-info">Email: {user.email}</p>
      <p className="user-info">Role: {user.role}</p>

      <h2 className="section-heading">Add New Item</h2>
      <form className="item-form" method="POST" action="/dashboard/add-item">
        <input type="text" name="name" placeholder="Name" required />
        <input type="text" name="category" placeholder="Category" />
        <input type="number" name="price" placeholder="Price" required />
        <input type="text" name="sizes" placeholder="Sizes (comma separated)" />
        <input type="text" name="color" placeholder="Color" />
        <input type="number" name="stock" placeholder="Stock" />
        <input type="text" name="description" placeholder="Description" required />
        <input type="text" name="image" placeholder="Image URL" />
        <button type="submit">Add Item</button>
      </form>

      <h2 className="section-heading">Your Items</h2>
      <ul className="item-list">
        {items.map(item => (
          <li key={item._id}>
            <strong>{item.name}</strong> - ${item.price}
          </li>
        ))}
      </ul>

      {user.role === 'admin' && (
        <div className="admin-section">
          <h2 className="section-heading">Admin Dashboard</h2>
          <p>Here you can manage users, view reports, or oversee platform activity.</p>

          <table className="admin-table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
