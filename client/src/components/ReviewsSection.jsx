import React from 'react'
import ReviewCard from './ReviewCard'

const ReviewsSection = ({ reviews }) => {
  return (
    <div className="container mb-4">
        <div className="row g-3">
            {reviews.map(review => {
                return (
                    <ReviewCard
                      key={review.id} 
                      { ...review }
                    />
                );
            })}
        </div>
    </div>
  )
}

export default ReviewsSection