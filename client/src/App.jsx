import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './routes/Home';
import RestaurantDetailPage from './routes/RestaurantDetailPage';
import UpdatePage from './routes/UpdatePage';
import { RestaurantContextProvider } from './context/RestaurantContext';

const App = () => {
    return (
        <RestaurantContextProvider>
            <div>
                <Router>
                    <Routes>
                        <Route exact path="/" Component={Home}></Route>
                        <Route exact path="/restaurants/:id/update" Component={UpdatePage}></Route>
                        <Route exact path="/restaurants/:id" Component={RestaurantDetailPage}></Route>
                    </Routes>
                </Router>
            </div>
        </RestaurantContextProvider>
    );  
        
}

export default App;