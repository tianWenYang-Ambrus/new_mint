import styles from './roadmapWrapper.module.scss';

export default function RoadmapArrowPC() {
  return (
    <svg
      width="70"
      height="78"
      viewBox="0 0 70 78"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={styles['line-arrow-pc']}
    >
      <path
        d="M41.0001 6.00001C41.0001 2.6863 38.3138 3.8656e-06 35.0001 0C31.6864 -3.8656e-06 29.0001 2.68628 29.0001 5.99999L41.0001 6.00001ZM35 78L69.6411 18L0.359057 18L35 78ZM29.0001 5.99999L29 42L41 42L41.0001 6.00001L29.0001 5.99999Z"
        fill="url(#paint0_linear_7475_10623)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_7475_10623"
          x1="683"
          y1="-179.976"
          x2="683"
          y2="5.99997"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F6851B" />
          <stop offset="1" stopColor="#FF006B" />
        </linearGradient>
      </defs>
    </svg>
  );
}
