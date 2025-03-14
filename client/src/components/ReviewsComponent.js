import React from 'react';
import { FaQuoteLeft, FaCheckCircle } from 'react-icons/fa';
import './ReviewsComponent.css';

const ReviewsComponent = ({ reviews }) => {
    // Filter only 4 or 5-star reviews
    const filteredReviews = reviews.filter(review => review.rating >= 4);

    return (
        <div className="review-container">
            {filteredReviews.map((review, index) => (
                <div className="review-card" key={index}>
                    <div className="review-header">
                        {review.user.profile_image ? (
                            <img 
                                src={review.user.profile_image} 
                                alt={`${review.user.name}'s profile`} 
                                className="review-avatar" 
                            />
                        ) : (
                            <div className="review-avatar-initial">
                                {review.user.name.charAt(0).toUpperCase()}
                            </div>
                        )}
                        <div>
                            <div className="review-name">
                                {review.user.name} {review.user.is_verified && <FaCheckCircle className="verified-icon" />}
                            </div>
                            <div className="review-date">
                                {new Date(review.date).toLocaleDateString()}
                            </div>
                        </div>
                    </div>
                    <div className="review-icon">
                        <FaQuoteLeft />
                    </div>
                    <p className="review-text">{review.text}</p>
                    <div className="review-footer">
                        <span className="review-rating">⭐ {review.rating}</span>
                        <a href={review.url} className="review-link" target="_blank" rel="noopener noreferrer">
                            View on Yelp
                        </a>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ReviewsComponent;
