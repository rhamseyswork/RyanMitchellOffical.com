//By: Rhamseys Garcia
//Date: 2024-03-29
/* @vite-ignore */
import React, { Suspense, useEffect, useState } from 'react';
import { Routes, Route, useLocation, useNavigate, Navigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';

import './App.css';


//Navr Bar
import Components from './components/manifest.js';
import Pages from './Pages/mainifest.js';
import PrivateRoute from './components/Private Route/PrivateRoute.jsx';
import AdminRoute from './components/Admin Route/AdminRoute.jsx'
import SuperAdminRoute from './components/Super Admin Route/SuperAdminRoute.jsx'
import { ToastContainer } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import Meta from './components/Meta/Meta.jsx';
import { useLogoutMutation } from './slices/usersApiSlice';
import { logout } from './slices/authSlice.js';


function App() {
  const location = useLocation();
  const [metaTagName, setMetaTagName] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();



  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try{
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };
  

  useEffect(() => {
    const metaTagName = location.pathname.substring(1);
    setMetaTagName(metaTagName);//option to add Home
  }, [location.pathname]);  

  return (
    <>
      {metaTagName ? <Meta title={`Ryan Mitch MP3 | ${metaTagName}`} /> : <Meta/>}
      <Suspense fallback={<div> RyanMmtch.MP3 Loading...</div>}>
        <Routes index={true}>
          <Route path="/home" element={<Navigate to="/" />} />
          <Route path='' element={<Pages.Home />} /> 
        <Route path='' element={<PrivateRoute />}>
          <Route path='/profile' element={<Pages.Profile />} /> 
          <Route path='/roles' element={<Pages.Role />} /> 
          <Route path='/dashboard' element={<Pages.PortalB />} /> 
        </Route>
        <Route path='' element={<AdminRoute />}>
          <Route path='/admin/dashboard' element={<Pages.admin.Portal />}/> 
          <Route path='/admin/metrics' element={<Pages.admin.Metrics />}/> 
          <Route path='/admin/linktree' element={<Pages.admin.LinkTreeAdmin />}/> 
        </Route>
        <Route path='' element={<SuperAdminRoute />}>
          <Route path='/superadmin/dashboard' element={<Pages.superAdmin.PortalA />}/> 
        </Route>
        <Route path='/login' element={<Pages.Login />} />
        <Route path='/logout' element={<LogoutPage onLogout={logoutHandler} />} />
        <Route path='/terms' element={<Pages.Terms />} />
        <Route path='/privacy' element={<Pages.Privacy />} />
        <Route path="*" element={<Pages.Error404 />} />
      </Routes>
    </Suspense>
    <Suspense fallback={<div>Loading Footer ...</div>}>
      { <Components.Footer /> }
    </Suspense>
    <ToastContainer />
    </>
  );
}

const LogoutPage = ({ onLogout }) => {
  useEffect(() => {
    onLogout();
  }, [onLogout]);

  return <div>Logging out...</div>;
};

export default App;
