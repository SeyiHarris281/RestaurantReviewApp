import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import RestaurantFinder from '../apis/RestaurantFinder';
import { useParams } from 'react-router-dom';

const UpdateRestaurant = () => {
    const { id } = useParams();
    const [ name, setName ] = useState("");
    const [ location, setLocation ] = useState("");
    const [ priceRange, setPriceRange ] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await RestaurantFinder.get(`/${id}`)
                console.log(response);
                setName(response.data.data.restaurant.name);
                setLocation(response.data.data.restaurant.location);
                setPriceRange(response.data.data.restaurant.price_range);
            } catch (err) {
                console.log(err);
            }
        }

        fetchData();
    }, [id]);

    const handleSubmit =  async (e) => {
        e.preventDefault();

        const updatedRestautant = {
            name,
            location,
            price_range: priceRange
        }

        try {
            await RestaurantFinder.put(`/${id}`, updatedRestautant);
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    }

  return (
    <div className='container'>
        <form 
            action=""
            onSubmit={handleSubmit}
        >
            <div className='mb-3'>
                <label 
                    htmlFor="name"
                    className='form-label'
                >
                    Restaurant Name
                </label>
                <input
                    type="text"
                    className='form-control'
                    name="name"
                    id='name'
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className='mb-3'>
                <label 
                    htmlFor="location"
                    className='form-label'
                >
                    Location
                </label>
                <input
                    type="text"
                    className='form-control'
                    name="location"
                    id='location'
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
            </div>
            <div
                className='mb-3'
            >
                <label 
                    htmlFor="priceRange"
                    className='form-label'
                >
                    Price Range
                </label>
                <select 
                    name="priceRange" 
                    id="priceRange"
                    className='form-control'
                    required
                    value={priceRange}
                    onChange={e => setPriceRange(e.target.value)}
                >
                    <option value="1">$</option>
                    <option value="2">$$</option>
                    <option value="3">$$$</option>
                    <option value="4">$$$$</option>
                    <option value="5">$$$$$</option>
                </select>
            </div>
            <div
                className='mb-3'
            >
                <button
                    type='submit'
                    className='btn btn-primary'
                >
                    Update
                </button>
            </div>
            
        </form>
    </div>
  )
}

export default UpdateRestaurant