import styles from '../styles/Tag.module.scss';

export const Tag = ({title}) => {

  return (
    <div className={styles.container}>
      <div>{title}</div>
    </div>
  )
}