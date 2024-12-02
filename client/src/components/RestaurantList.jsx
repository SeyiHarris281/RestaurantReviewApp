import React, { useContext, useEffect } from 'react';
import RestaurantFinder from "../apis/RestaurantFinder";
import { RestaurantsContext } from '../context/RestaurantContext';
import { useNavigate } from 'react-router-dom';
import StarRating from './StarRating';

const RestaurantList = (props) => {
    const { restaurants, setRestaurants, deleteRestaurant } =  useContext( RestaurantsContext );
    let navigate = useNavigate();

    useEffect(() => {
        let ignore = false;
        async function fetchData() {
            try {
                const response = await RestaurantFinder.get("/");
                if (!ignore) setRestaurants(response.data.data.restaurants);
            } catch (err) {
                console.log(err);
            }
        }

        fetchData();

        return () => {
            ignore = true;
        }
    }, [setRestaurants]);

    const handleDelete = async (e, id) => {
        e.stopPropagation();
        try {
            const response = await RestaurantFinder.delete(`/${id}`);
            if(response.status === 204) {
                deleteRestaurant(id)
            }
        } catch (err) {
            console.log(err);
        }
    }

    const handleUpdate = (e, id) => {
        e.stopPropagation();
        navigate(`/restaurants/${id}/update`);
    }

    const handleClickDetails = (id) => {
        navigate(`/restaurants/${id}`);
    }

  return (
    <table className="table table-dark table-striped table-hover">
        <thead>
            <tr className='table-primary'>
                <th scope="col">Restaurant</th>
                <th scope="col">Location</th>
                <th scope="col">Price Range</th>
                <th scope="col">Rating</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
            </tr>
        </thead>
        <tbody className='align-middle'>
            {restaurants && restaurants.map(restaurant => {
                return (
                    <tr 
                        key={restaurant.id}
                        onClick={() => handleClickDetails(restaurant.id)}
                    >
                        <td>{restaurant.name}</td>
                        <td>{restaurant.location}</td>
                        <td>{"$".repeat(restaurant.price_range)}</td>
                        <td>
                            {restaurant.count ? 
                                <>
                                    <StarRating rating={restaurant.rating_average}/> 
                                    <span className="text-warning ms-2">({restaurant.count})</span>
                                </> :  <span className="text-warning">0 reviews</span>
                            }
                        </td>
                        <td>
                            <button 
                                className="btn btn-warning" 
                                onClick={(e) => {handleUpdate(e, restaurant.id)}}
                            >
                                Update
                            </button>
                        </td>
                        <td>
                            <button 
                                className="btn btn-danger" 
                                onClick={(e) => {handleDelete(e, restaurant.id)}}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                );
            })}
        </tbody>
    </table>
  )
}

export default RestaurantList