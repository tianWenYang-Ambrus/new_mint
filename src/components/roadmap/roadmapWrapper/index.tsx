import { useEffect, useRef, MutableRefObject } from 'react';
import { useThrottleFn } from 'react-use';
import clover from 'public/svgs/clover.svg';
import coin from 'public/svgs/coin.svg';
import crown from 'public/svgs/crown.svg';
import diamond from 'public/svgs/diamond.svg';
import growth from 'public/svgs/growth.svg';
import hibicus from 'public/svgs/hibicus.svg';
import jigsaw from 'public/svgs/jigsaw.svg';
import loading from 'public/svgs/loading.svg';
import players from 'public/svgs/players.svg';
import remoteControl from 'public/svgs/remote-control.svg';
import rocket from 'public/svgs/rocket.svg';
import winner from 'public/svgs/winner.svg';
import { drawLine } from '@/utils/svg';
import { roadmapList } from '@/data/roadmap';
import IconRoadmapArrowMobile from './roadmapArrowMobile';
import IconRoadmapArrowPc from './roadmapArrowPC';
import Image from 'next/image';
import styles from './roadmapWrapper.module.scss';

const icons: Record<number, string> = {
  0: loading,
  1: rocket,
  2: jigsaw,
  3: players,
  4: clover,
  5: crown,
  6: winner,
  7: growth,
  8: hibicus,
  9: remoteControl,
  10: coin,
  11: diamond,
};

export default function RoadmapWrapper() {
  const wrapper = useRef<HTMLDivElement>(null);
  const draw = useThrottleFn(drawLine, 500, [wrapper]);

  useEffect(() => {
    window.addEventListener('resize', draw ? draw : () => {});
  }, []);

  return (
    <div className={styles['roadmap-container']}>
      <div ref={wrapper} className={styles.wrapper}>
        {roadmapList.map((item, index) => {
          return (
            <div className={styles.item} key={index}>
              <div className={styles.card}>
                <p>{item.title}</p>
                <ul>
                  {item.list.map((text, _index) => {
                    return <li key={_index}>{text}</li>;
                  })}
                </ul>
                <Image className={styles.icon} src={icons[index] || icons[0]} alt="icon" />
              </div>
            </div>
          );
        })}
        <IconRoadmapArrowPc />
        <IconRoadmapArrowMobile />
      </div>
    </div>
  );
}
