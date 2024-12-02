import React, { useContext, useState } from 'react'
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantContext';

const AddReview = () => {
    const [ name, setName ] = useState("");
    const [ rating, setRating ] = useState("");
    const [ reviewText, setReviewText ] = useState("");
    const { selectedRestaurant, setSelectedRestaurant } = useContext(RestaurantsContext);

    const handleSubmit = async (e) => {
        //e.preventDefault();
        if(selectedRestaurant) {
            try {
                const newReview = {
                    name,
                    rating,
                    review: reviewText
                }
                const { id } = selectedRestaurant.restaurant
                const response = await RestaurantFinder.post(`/${id}/addReview`, newReview);
                setSelectedRestaurant({
                    restaurant: selectedRestaurant.restaurant,
                    reviews:[ ...selectedRestaurant.reviews, response.data.data.review ]
                });
                setName("");
                setRating("");
                setReviewText("");
            } catch(err) {
                console.log(err);
            }
        }
    }

  return (
    <form 
        action="" 
        className='container'
        onSubmit={handleSubmit}
    >
        <div className="row g-3">
            <div className="col-8">
                <label htmlFor="name">Name</label>
                <input 
                    id="name" 
                    placeholder='name' 
                    type="text" 
                    className='form-control'
                    value={name}
                    onChange={(e) => { setName(e.target.value) }}
                />
            </div>
            <div className="col-4">
                <label htmlFor="rating">Rating</label>
                <select
                    name="rating" 
                    id="rating" 
                    className="form-control"
                    value={rating}
                    onChange={e => { setRating(e.target.value) }}
                >
                    <option disabled value="">Rating</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            </div>
            <div className="col-12">
                <label htmlFor="Review">Review</label>
                <textarea 
                    name="Review" 
                    id="Review" 
                    className='form-control'
                    value={reviewText}
                    onChange={e => { setReviewText(e.target.value) }}
                ></textarea>
            </div>
            <div className="col-12">
                <button className='btn btn-primary'>Submit</button>
            </div>
        </div>
    </form>
  )
}

export default AddReview