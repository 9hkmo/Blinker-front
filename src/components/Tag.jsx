import styles from "../styles/components/Tag.module.scss";

export const Tag = ({ title, choiceTags, setChoiceTags }) => {
  const isSelected = choiceTags.includes(title);

  const handleClick = () => {
    if (isSelected) {
      setChoiceTags(choiceTags.filter((tag) => tag !== title));
    } else {
      setChoiceTags([...choiceTags, title]);
    }
  };

  return (
    <div
      className={`${styles.container} ${isSelected ? styles.isClick : ""}`}
      onClick={handleClick}
    >
      <div className={styles.img}>
        <img src={isSelected ? "" : ""} alt="+/-" />
      </div>
      <div className={`${styles.title} ${isSelected ? styles.isClick : ""}`}>{title}</div>
    </div>
  );
};
