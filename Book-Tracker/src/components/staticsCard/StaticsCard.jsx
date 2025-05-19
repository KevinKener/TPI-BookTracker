import './staticsCard.css';

const StaticsCard = ({ text, content, extraClass }) => {
  const cardClassName = `box ${extraClass || ''}`;

  return (
    <div className={cardClassName}>
      <div className="text">
        {text}
      </div>
      <div className="separator"></div>
      <div className="stat">
        {content}
      </div>
    </div>
  );
};

export default StaticsCard;