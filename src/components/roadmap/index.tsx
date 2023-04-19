import RoadmapClose from './roadmapClose';
import RoadmapWrapper from './roadmapWrapper/index';
import RoadmapButton from './roadmapButton/index';
import { FC, useState } from 'react';

const Roadmap: FC = ({}) => {
  const [visible, setVisible] = useState<Boolean>(false);

  return (
    <>
      <RoadmapButton
        onClick={() => {
          setVisible(true);
        }}
        placement="bottom-right"
      />
      {visible ? (
        <div className="fixed top-0 bottom-0 left-0 right-0 z-50 overflow-y-auto bg-black-80">
          <RoadmapClose
            onClick={() => {
              setVisible(false);
            }}
          />
          <RoadmapWrapper />
        </div>
      ) : null}
    </>
  );
};

export default Roadmap;
