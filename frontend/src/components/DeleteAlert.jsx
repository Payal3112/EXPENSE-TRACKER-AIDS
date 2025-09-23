import React from "react";

const DeleteAlert = ({ content, onDelete }) => {
  return (
    <div className="p-4">
      <p className="text-sm text-gray-700">{content}</p>

      <div className="flex justify-end mt-6">
        <button
          type="button"
          className="add-btn add-btn-fill bg-red-500 text-white hover:bg-red-600 transition-colors px-4 py-2 rounded"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteAlert;
