import React from 'react';
import styles from './ChristmasLights.module.scss';

const ChristmasLights = () => {
  const getColorClass = (index) => {
    switch (index % 4) { // Modulus 4 for four different colors
      case 0: return styles.red;
      case 1: return styles.green;
      case 2: return styles.blue;
      case 3: return styles.yellow;
      default: return ''; // Default case, should not occur
    }
  };

  const lights = Array.from({ length: 60 }, (_, index) => (
    <li key={index} className={`${styles.light} ${getColorClass(index)}`}></li>
  ));

  return (
    <ul className={styles.wire}>
      {lights}
    </ul>
  );
};

export default ChristmasLights;
