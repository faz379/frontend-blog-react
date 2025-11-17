import React from "react";

export default function NotificationModal({ isOpen, title, message, onClose, type }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div
        className={`bg-white p-6 rounded-xl w-80 shadow-xl border 
        ${type === "success" ? "border-orange-500" : "border-black"}`}
      >
        <h2
          className={`text-xl font-semibold mb-2 
          ${type === "success" ? "text-orange-600" : "text-black"}`}
        >
          {title}
        </h2>

        <p className="text-gray-700 mb-4">{message}</p>

        <button
          onClick={onClose}
          className={`w-full py-2 rounded-lg text-white font-semibold 
          ${type === "success" ? "bg-orange-600" : "bg-black"} hover:opacity-90 transition`}
        >
          OK
        </button>
      </div>
    </div>
  );
}
