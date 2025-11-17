import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setLoading(true);

    if (!username || !email || !password) {
      setErrorMsg("All fields are required.");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(
        "https://api-bloghub.my.id/api/users/register",
        { username, email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      const data = res.data?.data;
      if (!data?.id) {
        setErrorMsg("Registration failed. Try again.");
        setLoading(false);
        return;
      }

      setSuccessMsg("Registration successful! Redirecting to login...");

      // Redirect ke login setelah 2 detik
      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (error) {
      const msg = error.response?.data?.data || "Something went wrong. Please try again.";
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        className="bg-white w-96 p-8 rounded-xl shadow-lg"
        onSubmit={handleRegister}
      >
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>

        {errorMsg && (
          <p className="bg-red-100 text-red-700 p-2 rounded mb-4 text-sm text-center">
            {errorMsg}
          </p>
        )}

        {successMsg && (
          <p className="bg-green-100 text-green-700 p-2 rounded mb-4 text-sm text-center">
            {successMsg}
          </p>
        )}

        <label>Username</label>
        <input
          type="text"
          className="w-full border p-2 rounded mb-4"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label>Email</label>
        <input
          type="email"
          className="w-full border p-2 rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password</label>
        <input
          type="password"
          className="w-full border p-2 rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="bg-orange-500 w-full py-2 rounded text-white hover:bg-orange-600 transition"
          disabled={loading}
        >
          {loading ? "Loading..." : "Register"}
        </button>

        <p className="mt-4 text-sm text-center">
          Sudah punya akun?{" "}
          <Link to="/login" className="text-blue-600">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
