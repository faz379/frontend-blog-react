import { useState } from "react";
import NotificationModal from "../components/NotificationModal";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

export default function Register() {
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const [modal, setModal] = useState({
    open: false,
    title: "",
    message: "",
    type: "success",
  });

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("https://api-bloghub.my.id/api/users/register", {
        name: username,
        email,
        password,
      });

      // Auto login
      login(res.data.data);

      setModal({
        open: true,
        title: "Registration Successful",
        message: "Your account has been created successfully.",
        type: "success",
      });

    } catch (error) {
      const msg =
        error.response?.data?.data || "Something went wrong. Try again.";

      setModal({
        open: true,
        title: "Registration Failed",
        message: msg,
        type: "error",
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">

      {/* MODAL */}
      <NotificationModal
        isOpen={modal.open}
        title={modal.title}
        message={modal.message}
        type={modal.type}
        onClose={() => setModal({ ...modal, open: false })}
      />

      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-xl shadow-md w-80"
      >
        <h2 className="text-2xl font-bold mb-6">Register</h2>

        <input
          type="text"
          placeholder="Username"
          className="w-full p-2 border rounded mb-3"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password field */}
        <div className="relative mb-3">
          <input
            type={showPass ? "text" : "password"}
            placeholder="Password"
            className="w-full p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            onClick={() => setShowPass(!showPass)}
            className="absolute right-3 top-2 cursor-pointer text-gray-600"
          >
            {showPass ? "🙈" : "👁️"}
          </span>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded mt-3"
        >
          Register
        </button>
      </form>
    </div>
  );
}
