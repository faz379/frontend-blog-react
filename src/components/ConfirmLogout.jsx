export default function ConfirmLogout({ onConfirm, onCancel }) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
        <div className="bg-white p-7 rounded-xl shadow-xl text-center max-w-sm w-full">
  
          <h2 className="text-xl font-bold mb-3">Konfirmasi Logout</h2>
          <p className="text-gray-700 mb-6">Apakah Anda yakin ingin logout?</p>
  
          <div className="flex justify-center gap-4">
            <button
              onClick={onCancel}
              className="px-5 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
            >
              Batal
            </button>
  
            <button
              onClick={onConfirm}
              className="px-5 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }
  