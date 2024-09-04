import React, { useState, useEffect } from 'react';
import UserForm from '../molecules/UserForm';
import Button from '../atoms/Button';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:5000/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleAddUser = () => {
    setEditingUser(null);
    setShowForm(true);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setShowForm(true);
  };

  const handleSubmit = async (user) => {
    try {
      if (editingUser) {
        await fetch(`http://localhost:5000/users/${editingUser.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(user),
        });
      } else {
        await fetch('http://localhost:5000/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(user),
        });
      }
      setShowForm(false);
      fetchUsers();
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await fetch(`http://localhost:5000/users/${id}`, {
        method: 'DELETE',
      });
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="p-4">
      <Button onClick={handleAddUser}>Add User</Button>
      {showForm && (
        <UserForm
          user={editingUser}
          onSubmit={handleSubmit}
          onCancel={() => setShowForm(false)}
        />
      )}
      <ul className="mt-4 space-y-2">
        {users.map(user => (
          <li key={user.id} className="border p-4 rounded flex justify-between items-center">
            <div>
              <div>Name: {user.name}</div>
              <div>Email: {user.email}</div>
            </div>
            <div className="flex space-x-2">
              <Button onClick={() => handleEditUser(user)}>Edit</Button>
              <Button onClick={() => handleDeleteUser(user.id)}>Delete</Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;

