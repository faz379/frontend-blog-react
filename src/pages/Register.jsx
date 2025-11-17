import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NotificationModal from "../components/NotificationModal";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa6"; // <-- import ikon

export default function Register() {
  const navigate = useNavigate();

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

    if (!username || !email || !password) {
      setModal({
        open: true,
        title: "Validation Error",
        message: "All fields are required.",
        type: "error",
      });
      return;
    }

    try {
      const res = await axios.post(
        "https://api-bloghub.my.id/api/users/register",
        { username, email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      setModal({
        open: true,
        title: "Registration Successful",
        message: "Your account has been created. Redirecting to login...",
        type: "success",
      });

      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (error) {
      const msg = error.response?.data?.data || "Something went wrong. Please try again.";
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
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        <label>Username</label>
        <input
          type="text"
          className="w-full p-2 border rounded mb-3"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label>Email</label>
        <input
          type="email"
          className="w-full p-2 border rounded mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password</label>
        <div className="relative mb-3">
          <input
            type={showPass ? "text" : "password"}
            className="w-full p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            onClick={() => setShowPass(!showPass)}
            className="absolute right-3 top-2 cursor-pointer text-gray-600"
          >
            {showPass ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-2 rounded mt-3 hover:bg-orange-600 transition"
        >
          Register
        </button>
        <p className="mt-4 text-sm text-center">
          Suda punya akun?{" "}
          <Link to="/Login" className="text-blue-600">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
