import { useState } from "react";

const Testimonials = () => {
  const [reviews] = useState([
    { name: "Ali", comment: "Great platform for skill sharing!" },
    { name: "Sara", comment: "I earned time credits easily." },
  ]);

  return (
    <div className="testimonials-section">
      <h2>Testimonials</h2>

      {reviews.map((review, index) => (
        <p key={index}>
          <strong>{review.name}:</strong> {review.comment}
        </p>
      ))}
    </div>
  );
};

export default Testimonials;
