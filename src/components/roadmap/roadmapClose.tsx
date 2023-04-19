import react, { FC } from 'react';

interface Props {
  onClick: react.MouseEventHandler;
}

const RoadmapClose: FC<Props> = ({ onClick }) => {
  return (
    <svg
      onClick={onClick}
      className="fixed right-[24px] top-[24px] cursor-pointer md:right-[60px] md:top-[60px] z-10 cursor-pointer"
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="0.75"
        y="0.75"
        width="46.5"
        height="46.5"
        fill="black"
        fillOpacity="0.2"
        stroke="white"
        strokeWidth="1.5"
      />
      <path
        d="M14.5117 33.5391C14.6523 33.6719 14.8125 33.7617 14.9922 33.8086C15.1719 33.8555 15.3516 33.8555 15.5312 33.8086C15.7109 33.7617 15.8672 33.6719 16 33.5391L23.5 26.0391L31 33.5391C31.1328 33.6719 31.2891 33.7617 31.4688 33.8086C31.6484 33.8555 31.8281 33.8555 32.0078 33.8086C32.1953 33.7695 32.3555 33.6797 32.4883 33.5391C32.6211 33.4062 32.707 33.25 32.7461 33.0703C32.793 32.8906 32.793 32.7109 32.7461 32.5312C32.707 32.3516 32.6211 32.1953 32.4883 32.0625L24.9883 24.5508L32.4883 17.0508C32.6211 16.918 32.7109 16.7617 32.7578 16.582C32.8047 16.4023 32.8047 16.2227 32.7578 16.043C32.7109 15.8633 32.6211 15.707 32.4883 15.5742C32.3477 15.4336 32.1875 15.3438 32.0078 15.3047C31.8281 15.2578 31.6484 15.2578 31.4688 15.3047C31.2891 15.3438 31.1328 15.4336 31 15.5742L23.5 23.0742L16 15.5742C15.8672 15.4336 15.707 15.3438 15.5195 15.3047C15.3398 15.2578 15.1602 15.2578 14.9805 15.3047C14.8008 15.3438 14.6445 15.4336 14.5117 15.5742C14.3789 15.707 14.2891 15.8633 14.2422 16.043C14.2031 16.2227 14.2031 16.4023 14.2422 16.582C14.2891 16.7617 14.3789 16.918 14.5117 17.0508L22.0117 24.5508L14.5117 32.0625C14.3789 32.1953 14.2891 32.3516 14.2422 32.5312C14.1953 32.7109 14.1914 32.8906 14.2305 33.0703C14.2773 33.25 14.3711 33.4062 14.5117 33.5391Z"
        fill="white"
      />
    </svg>
  );
};
export default RoadmapClose;