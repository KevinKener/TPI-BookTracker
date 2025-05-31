import './bookGroup.css'

const Carousel = ({ title, children }) => {
  return (
    <div className="carousel-container">
      {title && <h2>{title}</h2>}
      <div className="group-wrapper">
        <div className="group-content">
          {children} {/* Aca se van a renderizar los "BookItems"(?) pasados como children */}
        </div>
      </div>
    </div>
  );
};

export default Carousel;