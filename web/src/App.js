import React from 'react';
    import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
    import Home from './pages/Home';
    import Login from './pages/Login';
    import Household from './pages/Household';
    import Neighborhood from './pages/Neighborhood';
    import Utilities from './pages/Utilities';
    import Social from './pages/Social';
    import Incidents from './pages/Incidents';
    import Profile from './pages/Profile';

    function App() {
      return (
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/household" element={<Household />} />
            <Route path="/neighborhood" element={<Neighborhood />} />
            <Route path="/utilities" element={<Utilities />} />
            <Route path="/social" element={<Social />} />
            <Route path="/incidents" element={<Incidents />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Router>
      );
    }

    export default App;
