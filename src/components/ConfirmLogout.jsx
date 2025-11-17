import React from "react";

function ConfirmLogout({ onCancel, onConfirm }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-80 text-center">
        <h2 className="text-xl font-bold mb-4">Konfirmasi Logout</h2>
        <p className="text-gray-700 mb-6">Apakah Anda yakin ingin logout?</p>

        <div className="flex justify-between">
          <button
            onClick={onCancel}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          >
            Batal
          </button>

          <button
            onClick={onConfirm}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmLogout;
