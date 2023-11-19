import React from 'react';
import styles from './ChristmasLights.module.scss';

const ChristmasLights = () => {
  const lights = Array.from({ length: 60 }, (_, index) => (
    <li key={index} className={`${styles.light} ${index % 2 === 0 ? styles.even : styles.odd}`}></li> // Apply multiple styles
  ));

  return (
    <ul className={styles.wire}>
      {lights}
    </ul>
  );
};

export default ChristmasLights;
