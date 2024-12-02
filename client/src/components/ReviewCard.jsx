import React from 'react'
import StarRating from './StarRating'

const ReviewCard = ({ name, rating, review }) => {
  return (
    <div className="col-4">
        <div className="card text-white bg-primary">
            <div className="card-header d-flex justify-content-between">
                <span>{name}</span>
                <span><StarRating rating={rating}/></span>
            </div>
            <div className="card-body">
                <p className="card-text">{review}</p>
            </div>
        </div>
    </div>
  )
}

export default ReviewCard;