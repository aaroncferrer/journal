// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Swal from "sweetalert2";

// File Imports
import Auth from './pages/Auth/Auth';
import Categories from './pages/Categories/Categories';
import Tasks from './pages/Tasks/Tasks';
import Footer from './components/Footer/Footer';


function App() {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('currentUser')) || null);
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    useEffect(() => {
        localStorage.setItem('currentUser', JSON.stringify(currentUser))
    }, [currentUser])

    return (
        <Router>
            <Routes>
                <Route exact path='/' element={<Auth setCurrentUser={setCurrentUser} apiBaseUrl={apiBaseUrl} Toast={Toast} />} />
                <Route exact path='/categories' element={<Categories currentUser={currentUser} setCurrentUser={setCurrentUser} apiBaseUrl={apiBaseUrl} Toast={Toast} />} />
                <Route exact path='/categories/:categoryId/tasks' element={<Tasks currentUser={currentUser} apiBaseUrl={apiBaseUrl} Toast={Toast} />} />
            </Routes>
            <Footer />
        </Router>
    )
}
export default App;
