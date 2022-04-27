import './App.css';
import { Routes, Route, Navigate, BrowserRouter, Outlet } from "react-router-dom";
import HomePage from './pages/home';
import NewsPage from './pages/news';
import LoginPage from './pages/auth/login';
import RegisterPage from './pages/auth/register';
import LatestNewsPage from './pages/latestNews';
import SubmitPage from './pages/submit';
import DashboardPage from './pages/dashboard';
import ClubNewsPage from './pages/clubNews';
import CategoriesListPage from './pages/categoryList';
import CategoryNewsPage from './pages/categoryNews';
import ClubListPage from './pages/clubList';

const RequiredAuth = () => {
  let isAuth = localStorage.getItem('access_token')
  if (!isAuth) {
    return <Navigate to="/login"/>
  }
  return <Outlet/>
}

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' >
            <Route index element={<HomePage />} />
          </Route>
          <Route path='/categories' >
            <Route path=":category" element={<CategoryNewsPage/>} />
            <Route index element={<CategoriesListPage />} />
          </Route>
          <Route path='/club' >
            <Route path=":club" element={<ClubNewsPage/>} />
            <Route index element={<ClubListPage />} />
          </Route>
          <Route path='/news' >
            <Route path=":_id" element={<NewsPage/>} />
            <Route index element={<LatestNewsPage />} />
          </Route>
          <Route path='/login' element={<LoginPage/>} />
          <Route path='/register' element={<RegisterPage/>} />

          <Route element={<RequiredAuth/>}>
            <Route path='/dashboard/:_id' >
              <Route index element={<DashboardPage />} />
            </Route>
            <Route path='/submit/:_id' >
              <Route index element={<SubmitPage />} />
            </Route>
          </Route>
          
        </Routes>
      </BrowserRouter>  
    </>
  );
}

export default App;
