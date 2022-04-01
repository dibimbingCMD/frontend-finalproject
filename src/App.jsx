import './App.css';
import { Routes, Route, Navigate, BrowserRouter, Outlet } from "react-router-dom";
import HomePage from './components/pages/home';
import LoginPage from './components/pages/login';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' >
            <Route index element={<HomePage />} />
          </Route>
          <Route path='/login' element={<LoginPage/>} />
          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
