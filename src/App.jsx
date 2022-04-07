import './App.css';
import { Routes, Route, Navigate, BrowserRouter, Outlet } from "react-router-dom";
import HomePage from './components/pages/home';
import NewsPage from './components/pages/news';
import LoginPage from './components/pages/auth/login';
import RegisterPage from './components/pages/auth/register';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' >
            <Route index element={<HomePage />} />
            
          </Route>
          <Route path='/category' >
            <Route index element={<NewsPage />} />
          </Route>
          <Route path='/club' >
            <Route index element={<NewsPage />} />
          </Route>
          <Route path='/login' element={<LoginPage/>} />
          <Route path='/register' element={<RegisterPage/>} />
          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
