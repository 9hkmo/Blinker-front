import { Header } from "../components/Header";
import styles from "../styles/pages/Home.module.scss";

export const HomePage = () => {
  return (
    <div className={styles.homeBackground}>
      <Header />
    </div>
  );
};
