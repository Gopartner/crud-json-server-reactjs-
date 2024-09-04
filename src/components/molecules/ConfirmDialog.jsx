// src/components/molecules/ConfirmDialog.jsx
import React from 'react';

function ConfirmDialog({ isOpen, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto">
        <h2 className="text-lg font-semibold mb-4">Are you sure?</h2>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;

