import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('https://api-bloghub.my.id/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("Server response", data);

      if (!response.ok) {
        // Asumsi backend menaruh pesan error di data.data
        alert(data.data || "Terjadi Kesalahan");
        return;
      }

      // Periksa struktur JSON yang benar
      // Misal backend: { code: 200, status: "OK", data: { token: "..." } }
      const token = data.data?.token;
      if (!token) {
        alert(data.data?.message || "Login gagal: token tidak ditemukan");
        return;
      }

      localStorage.setItem('token', token);
      alert("Login berhasil");
      navigate('/');

    } catch (error) {
      console.error("Fetch error:", error);
      alert("Gagal koneksi ke server");
    } finally {
      setLoading(false); // pastikan loading mati
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white w-96 p-8 rounded-xl shadow-lg"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <label className="font-medium">Email</label>
        <input
          type="email"
          className="w-full border p-2 rounded mb-4"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="font-medium">Password</label>
        <input
          type="password"
          className="w-full border p-2 rounded mb-4"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="bg-orange-500 px-6 py-2 font-medium rounded hover:bg-white hover:text-black transition-all w-full"
          disabled={loading}
        >
          {loading ? "Loading..." : "Login"}
        </button>

        <p className="text-sm text-center mt-4">
          Belum punya akun?{" "}
          <Link to="/register" className="text-blue-600">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
