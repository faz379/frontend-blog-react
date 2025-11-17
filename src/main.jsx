import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from './context/AuthContext.jsx';
import './index.css'
import './App.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/Home.jsx';
import Olahraga from './pages/Olahraga.jsx';
import Bisnis from './pages/Bisnis.jsx';
import Bola from './pages/Bola.jsx';
import News from './pages/News.jsx';
import Teknologi from './pages/Teknologi.jsx'
import PostDetailPage from './pages/PostDetailPage.jsx';
import Login from './pages/Login.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "news",
        element: <News />,
      },
      {
        path: "olahraga",
        element: <Olahraga />,
      },
      {
        path: "bisnis",
        element: <Bisnis />,
      },
      {
        path: "bola",
        element: <Bola />,
      },
      {
        path: "teknologi",
        element: <Teknologi />,
      },
      { 
        path: "posts/:slug", 
        element: <PostDetailPage /> 
      },
      {
        path: "login",
        element: <Login />,
      }
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>      
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
