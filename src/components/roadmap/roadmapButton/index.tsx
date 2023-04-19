import { useState, FC } from 'react';
import styles from './roadmapButton.module.scss';

interface Props {
  placement: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  onClick: () => void;
}

const RoadMapButton: FC<Props> = ({ placement, onClick }) => {
  return (
    <div
      className={`${styles['rotating-box']} ${styles.roadmap} ${styles[placement]}`}
      onClick={() => {
        onClick();
      }}
    >
      <div />
    </div>
  );
};

export default RoadMapButton;
