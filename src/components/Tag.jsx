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
      <div className={`${styles.title}`}>{title}</div>
    </div>
  );
};
