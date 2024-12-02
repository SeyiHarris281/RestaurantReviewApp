import React from 'react';
import Header from '../components/Header';
import AddRestaurant from '../components/AddRestaurant';
import RestaurantList from '../components/RestaurantList';
import MyButton from '../components/MyButton';

const Home = () => {
    return (
        <div className='container'>
            <Header text={"Restaurant Finder"}/>
            <AddRestaurant />
            <RestaurantList />
            <MyButton />
        </div>
    )
}

export default Home;