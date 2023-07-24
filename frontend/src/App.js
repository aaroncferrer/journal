// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// File Imports
import Auth from './pages/Auth/Auth';
import Categories from './pages/Categories/Categories';


function App() {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('currentUser')) || null);

    useEffect(() => {
        localStorage.setItem('currentUser', JSON.stringify(currentUser))
    }, [currentUser])

    return (
        <Router>
            <Routes>
                <Route exact path='/' element={<Auth setCurrentUser={setCurrentUser}/>} />
                <Route exact path='/categories' element={<Categories currentUser={currentUser} setCurrentUser={setCurrentUser}/>} />
            </Routes>
        </Router>
    )
}
export default App;
