import styles from './StaticsCard.module.css'

const StaticsCard = ({ text, content, extraClass }) => {
  return (
    <div className={`${styles.card} ${extraClass ? styles[extraClass] : ''}`}>
      <div className={styles.text}>
        {text}
      </div>
      <div className={styles.separator}></div>
      <div className={styles.stat}>
        {content}
      </div>
    </div>
  );
};

export default StaticsCard;
