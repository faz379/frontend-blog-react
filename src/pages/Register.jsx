import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth(); // otomatis login setelah registrasi

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setLoading(true);

    try {
      const response = await fetch("https://api-bloghub.my.id/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      });

      const json = await response.json();
      console.log("Response register:", json);

      if (!response.ok) {
        setErrorMsg(json.data || "Registration failed");
        return;
      }

      setSuccessMsg("Registration successful!");

      // ----------------------------
      // AUTO LOGIN SETELAH REGISTER
      // ----------------------------
      login({
        email: json.data.email,
        token: json.data.token,
      });

      navigate("/");
    } catch (error) {
      setErrorMsg("An error occurred. Please try again.");
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

        {/* SUCCESS MESSAGE */}
        {successMsg && (
          <p className="bg-green-100 text-green-700 p-2 rounded mb-4 text-sm text-center">
            {successMsg}
          </p>
        )}

        {/* ERROR MESSAGE */}
        {errorMsg && (
          <p className="bg-red-100 text-red-700 p-2 rounded mb-4 text-sm text-center">
            {errorMsg}
          </p>
        )}

        <label>Name</label>
        <input
          type="text"
          className="w-full border p-2 rounded mb-4"
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label>Email</label>
        <input
          type="email"
          className="w-full border p-2 rounded mb-4"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password</label>
        <input
          type="password"
          className="w-full border p-2 rounded mb-4"
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
