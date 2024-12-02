import React, { useState, createContext } from "react";

export const RestaurantsContext = createContext();

export const RestaurantContextProvider = props => {
    const [ restaurants, setRestaurants ] = useState([]);
    const [ selectedRestaurant, setSelectedRestaurant ] = useState(null);

    const addRestaurant = (restaurant) => {
        setRestaurants([...restaurants, restaurant]);
    }

    const deleteRestaurant = (id) => {
        setRestaurants(restaurants.filter(el => el.id !== id));
    }

    return (
        <RestaurantsContext.Provider 
            value={{ 
                restaurants, 
                setRestaurants, 
                addRestaurant, 
                deleteRestaurant,
                selectedRestaurant,
                setSelectedRestaurant
            }} 
        >
            {props.children}
        </RestaurantsContext.Provider>
    );
}