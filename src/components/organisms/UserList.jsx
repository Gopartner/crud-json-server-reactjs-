// src/components/organisms/UserList.jsx
import React, { useState, useEffect } from 'react';
import ConfirmDialog from '../molecules/ConfirmDialog';
import UserForm from '../molecules/UserForm';

function UserList() {
  const [users, setUsers] = useState([]);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showUserForm, setShowUserForm] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch('http://localhost:5000/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }
    fetchUsers();
  }, []);

  const handleDelete = (userId) => {
    setUserToDelete(userId);
    setShowConfirmDialog(true);
  };

  const confirmDelete = async () => {
    try {
      await fetch(`http://localhost:5000/users/${userToDelete}`, {
        method: 'DELETE',
      });
      setUsers(users.filter((user) => user.id !== userToDelete));
    } catch (error) {
      console.error('Error deleting user:', error);
    } finally {
      setShowConfirmDialog(false);
      setUserToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowConfirmDialog(false);
    setUserToDelete(null);
  };

  const handleAddUser = () => {
    setCurrentUser(null);
    setShowUserForm(true);
  };

  const handleEditUser = (user) => {
    setCurrentUser(user);
    setShowUserForm(true);
  };

  const handleUserFormSubmit = async (user) => {
    try {
      if (user.id) {
        await fetch(`http://localhost:5000/users/${user.id}`, {
          method: 'PUT',
          body: JSON.stringify(user),
          headers: { 'Content-Type': 'application/json' },
        });
      } else {
        await fetch('http://localhost:5000/users', {
          method: 'POST',
          body: JSON.stringify(user),
          headers: { 'Content-Type': 'application/json' },
        });
      }
      setShowUserForm(false);
      setCurrentUser(null);
      // Refresh user list
      const response = await fetch('http://localhost:5000/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  const cancelUserForm = () => {
    setShowUserForm(false);
    setCurrentUser(null);
  };

  return (
    <div className="p-4">
      <header className="mb-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">User List</h1>
        <button
          onClick={handleAddUser}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add User
        </button>
      </header>
      <ul>
        {users.map((user) => (
          <li key={user.id} className="flex justify-between items-center mb-2 p-2 border rounded">
            <span>{user.name}</span>
            <div>
              <button
                onClick={() => handleEditUser(user)}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(user.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      {showConfirmDialog && (
        <ConfirmDialog
          isOpen={showConfirmDialog}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
      {showUserForm && (
        <UserForm
          user={currentUser}
          onSubmit={handleUserFormSubmit}
          onCancel={cancelUserForm}
        />
      )}
    </div>
  );
}

export default UserList;

