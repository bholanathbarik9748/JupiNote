import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'

const IntoHomePage = lazy(() => import('./pages/Intro/index'));
const Login = lazy(() => import('./pages/logIn/Login'));
const Signup = lazy(() => import('./pages/signup/Signup'));
const Notes = lazy(() => import('./pages/Home/Home'));
const UserInfo = lazy(() => import('./pages/editUser/editUser'));
const ProtectedRoute = lazy(() => import('./protectedRoute/Home/ProtectedRoute'));
const AddNewNote = lazy(() => import('./pages/addNote/AddNote'));
const ReadNote = lazy(() => import('./pages/ReadNote/ReadNote'));
const EditNote = lazy(() => import('./pages/EditNotes/EditNotes'));
const Bin = lazy(() => import('./pages/Bin/Bin'));

function App() {
  return (
    <Router>
      <Suspense fallback={<>Loading....</>}>
        <Routes>
          <Route path="/" element={<IntoHomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/user/notes" element={<Notes />} />
            <Route path="/user/info" element={<UserInfo />} />
            <Route path="/user/new/note" element={<AddNewNote />} />
            <Route path="/user/read-note" element={<ReadNote />} />
            <Route path="/user/edit-note" element={<EditNote />} />
            <Route path="/user/bin" element={<Bin />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
