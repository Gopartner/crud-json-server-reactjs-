// src/components/molecules/UserForm.jsx
import React, { useState, useEffect } from 'react';

function UserForm({ user, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    blogPost: '',
    genre: '',
    hobbies: '',
    profilePicture: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        username: user.username || '',
        password: user.password || '',
        blogPost: user.blogPost || '',
        genre: user.genre || '',
        hobbies: user.hobbies || '',
        profilePicture: user.profilePicture || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({ ...prevData, profilePicture: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2 className="text-xl font-bold mb-4">{user ? 'Edit User' : 'Add User'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Blog Post</label>
            <textarea
              name="blogPost"
              value={formData.blogPost}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Genre</label>
            <input
              type="text"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Hobbies</label>
            <input
              type="text"
              name="hobbies"
              value={formData.hobbies}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
            {formData.profilePicture && (
              <img
                src={formData.profilePicture}
                alt="Profile Preview"
                className="mt-2 w-24 h-24 object-cover"
              />
            )}
          </div>
          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              {user ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserForm;

