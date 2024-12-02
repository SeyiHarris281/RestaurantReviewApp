import React, { useContext, useEffect } from 'react';
import Header from '../components/Header'
import { useParams } from 'react-router-dom';
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantContext';
import ReviewsSection from '../components/ReviewsSection';
import AddReview from '../components/AddReview';
import StarRating from '../components/StarRating';

const RestaurantDetailPage = () => {
  const { id } = useParams();
  const { selectedRestaurant, setSelectedRestaurant } = useContext(RestaurantsContext);

  // Load restaurant data
  useEffect(() => {
    let ignore = false;
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get(`/${id}`);
        if(!ignore) setSelectedRestaurant(response.data.data);
      } catch (err) {
        console.log(err);
      }
    }

    fetchData();

    return () => { 
      ignore = true 
    }
  }, [id, setSelectedRestaurant]);

  return (
    <>
      {selectedRestaurant && 
        <>
          <Header text={selectedRestaurant.restaurant.name} />
          <div className="container text-center mb-4">
            {selectedRestaurant.restaurant.rating_count ? 
            <>
              <StarRating rating={selectedRestaurant.restaurant.rating_average} />
              <span className="text-warning ms-2">({selectedRestaurant.restaurant.rating_count})</span>
            </> :
            <span className="text-warning">0 reviews</span>
            }
            
          </div>
          <ReviewsSection reviews={selectedRestaurant.reviews} />
        </>
      }
      <AddReview />
    </>
  )
}

export default RestaurantDetailPage