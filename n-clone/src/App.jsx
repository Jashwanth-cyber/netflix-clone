import './App.css';
import React from 'react';
import Login from './Components/Login';
import Home from './Components/Home';
import Popular from './Components/Popular';
import ProtectedRoute from './Components/Protectedroute';
import Account from './Components/Account';
import { Footer } from './Components/Footer';
import MovieDetails from './Components/MovieDetails';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home /> 
            </ProtectedRoute>
          }
        />
        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          }
        />
        <Route
          path="/popular"
          element={
            <ProtectedRoute>
              <Popular />
            </ProtectedRoute>
          }
        />
        <Route
          path="/movies/:id"
          element={
            <ProtectedRoute>
              <MovieDetails />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;