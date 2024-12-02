import React, { useContext, useState } from 'react';
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantContext';

const AddRestaurant = () => {
    const [ name, setName ] =  useState("");
    const [ location, setLocation ] = useState("");
    const [ priceRange, setPriceRange ] = useState("");
    const { addRestaurant } = useContext(RestaurantsContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newRestaurant = {
            name,
            location,
            price_range: priceRange
        }

        try {
            const response = await RestaurantFinder.post("/", newRestaurant);
            if(response.data.status === "success") {
                addRestaurant(response.data.data);
                setName("");
                setLocation("");
                setPriceRange("");
            }
        } catch(err) {
            console.log(err);
        }
    }

  return (
        <form action='' className='row g-3 mb-4' onSubmit={handleSubmit}>
                <div className="col-4">
                    <input 
                        type="text" 
                        className='form-control' 
                        placeholder='name' 
                        value={name} 
                        onChange={e => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="col-4">
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder='location' 
                        value={location} 
                        onChange={e => setLocation(e.target.value)}
                        required
                    />
                </div>
                <div className="col-3">
                    <select className='form-select' value={priceRange} onChange={e => setPriceRange(e.target.value)} required>
                        <option disabled value="" >Price Range</option>
                        <option value="1">$</option>
                        <option value="2">$$</option>
                        <option value="3">$$$</option>
                        <option value="4">$$$$</option>
                        <option value="5">$$$$$</option>
                    </select>
                </div>
                <div className="d-grid col-1">
                    <button className="btn btn-primary">Add</button>
                </div>
        </form>
  )
}

export default AddRestaurant