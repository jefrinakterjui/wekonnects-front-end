// RatingsAndReviews.tsx
import React from "react";
import "./UserDashboard.css"; 

interface Review {
  id: number;
  name: string;
  comment: string;
  rating: number;
}

const reviews: Review[] = [
  { id: 1, name: "Harikrishna", comment: "Service is good I am satisfied about their work", rating: 5 },
  { id: 2, name: "Harikrishna", comment: "Service is good I am satisfied about their work", rating: 5 },
  { id: 3, name: "Harikrishna", comment: "Service is good I am satisfied about their work", rating: 4 },
  { id: 4, name: "Harikrishna", comment: "Service is good I am satisfied about their work", rating: 5 },
  { id: 5, name: "Harikrishna", comment: "Service is good I am satisfied about their work", rating: 5 },
  { id: 6, name: "Harikrishna", comment: "Service is good I am satisfied about their work", rating: 4 },
  { id: 7, name: "Harikrishna", comment: "Service is good I am satisfied about their work", rating: 5 },
  { id: 8, name: "Harikrishna", comment: "Service is good I am satisfied about their work", rating: 5 },
  { id: 9, name: "Harikrishna", comment: "Service is good I am satisfied about their work", rating: 4 },
  { id: 10, name: "Harikrishna", comment: "Service is good I am satisfied about their work", rating: 5 },
];

const StarRating: React.FC<{ rating: number; size?: "small" | "large" }> = ({ rating, size = "small" }) => {
  return (
    <div className={`star-rating ${size}`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`star ${star <= rating ? "filled" : ""}`}
        >
          ★
        </span>
      ))}
    </div>
  );
};

const RatingsAndReviews: React.FC = () => {
  const averageRating = 4.2;
  const totalReviews = 150;

  return (
    <div className="ratings-container">
      <h2 className="section-title">Rating & Reviews</h2>

      <div className="ratings-overview">
        {/* Left: Total Reviews + Icons */}
        <div className="reviews-summary">
          <div className="average-rating-large">
            <StarRating rating={Math.round(averageRating)} size="large" />
            <div className="rating-number">{averageRating}</div>
          </div>

          <div className="total-reviews">
            <span className="review-count">{totalReviews}</span>
            <span className="review-text">Total Reviews</span>
          </div>
        </div>

        {/* Right: Star Breakdown */}
        <div className="star-breakdown">
          {[5, 4, 3, 2, 1].map((stars) => (
            <div key={stars} className="breakdown-row">
              <span className="star-label">{stars} ★</span>
              <div className="bar-container">
                <div
                  className="bar-fill"
                  style={{
                    width: `${stars === 5 ? 85 : stars === 4 ? 10 : stars === 3 ? 3 : stars === 2 ? 1 : 1}%`,
                  }}
                ></div>
              </div>
              <StarRating rating={stars} />
            </div>
          ))}
        </div>
      </div>

      {/* Reviews List */}
      <div className="reviews-list">
        {reviews.map((review) => (
          <div key={review.id} className="review-item">
            <div className="reviewer-info">
              <div className="avatar">
                {review.name.charAt(0)}
              </div>
              <div>
                <div className="reviewer-name">{review.name}</div>
                <div className="review-comment">{review.comment}</div>
              </div>
            </div>
            <StarRating rating={review.rating} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RatingsAndReviews;