import styles from "../styles/components/Tag.module.scss";

export const Tag = ({ tag, choiceTags, setChoiceTags }) => {
  const isSelected = choiceTags.includes(tag.value);

  const handleClick = () => {
    if (isSelected) {
      setChoiceTags(choiceTags.filter((tag) => tag !== tag.value));
    } else {
      setChoiceTags([...choiceTags, tag.value]);
    }
  };

  return (
    <div
      className={`${styles.container} ${isSelected ? styles.isClick : ""}`}
      onClick={handleClick}
    >
      <div className={`${styles.title}`}>{tag.title}</div>
    </div>
  );
};