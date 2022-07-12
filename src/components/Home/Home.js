import React from "react";

import Card from "../UI/Card/Card";
import styles from "./Home.module.css";

const Home = (props) => {
  return (
    <Card className={styles.home}>
      <h1>Рады Вас Видеть Снова!</h1>
    </Card>
  );
};

export default Home;
