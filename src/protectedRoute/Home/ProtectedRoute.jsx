import React, { lazy } from 'react'
import getCookies from '../../hooks/Cookie/getCookie'
import { Navigate, Outlet } from 'react-router-dom'

const isAuth = () => {
  const username = getCookies("userId");
  const authToken = getCookies("authToken");
  return username && authToken;
}

const ProtectedRoute = () => {
  return (
    isAuth ? <Outlet /> : <Navigate to='/' />
  )
}

export default ProtectedRoute