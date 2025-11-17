import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const response = await fetch("https://api-bloghub.my.id/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const json = await response.json();
      console.log("Response login:", json);

      if (!response.ok) {
        setErrorMsg(json.data || "Login failed");
        return;
      }

      if (!json.data?.token) {
        setErrorMsg("Email not registered or wrong password");
        return;
      }

      localStorage.setItem("token", json.data.token);

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
        onSubmit={handleLogin}
      >
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        {/* ERROR MESSAGE — tampil cantik */}
        {errorMsg && (
          <p className="bg-red-100 text-red-700 p-2 rounded mb-4 text-sm text-center">
            {errorMsg}
          </p>
        )}

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
          {loading ? "Loading..." : "Login"}
        </button>
        <p className="mt-4 text-sm text-center">
          Belum punya akun?{" "}
          <Link to="/register" className="text-blue-600">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
