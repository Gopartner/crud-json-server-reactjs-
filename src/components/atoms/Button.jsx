import React from 'react';

const Button = ({ onClick, children, type = 'button' }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
    >
      {children}
    </button>
  );
};

export default Button;

