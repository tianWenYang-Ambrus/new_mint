import type { Path } from 'd3';
import * as d3 from 'd3';
import { RefObject } from 'react';

const bezierCurve = {
  rightTop: [0.63, 0.3726],
  rightBottom: [0.627, 0.63],
  leftTop: [0.3726, 0.373],
  leftBottom: [0.627, 0.3726],
};
const radius = 6;
const padding = 120;

type BezierCurveTo = {
  cpx1: number;
  cpy1: number;
  cpx2: number;
  cpy2: number;
  x: number;
  y: number;
};

type BezierCurveToParams = [number, number, number, number, number, number];

/**
 * Calc BezierCurve Right Top
 * @param {number} x
 * @param {number} y
 * @returns {BezierCurveTo}
 */
const calcBezierCurveRightTop = (x: number, y: number): BezierCurveTo => ({
  cpx1: x - radius + bezierCurve.rightTop[0],
  cpy1: y,
  cpx2: x,
  cpy2: y + radius - 1 + bezierCurve.rightTop[1],
  x: x,
  y: y + radius * 2,
});

/**
 * Calc BezierCurve Right Bottom
 * @param {number} x
 * @param {number} y
 * @returns {BezierCurveTo}
 */
const calcBezierCurveRightBottom = (x: number, y: number): BezierCurveTo => ({
  cpx1: x,
  cpy1: y - radius + bezierCurve.rightBottom[0],
  cpx2: x - radius + bezierCurve.rightBottom[1],
  cpy2: y,
  x: x - radius * 2,
  y: y,
});

/**
 * Calc BezierCurve Left Bottom
 * @param {number} x
 * @param {number} y
 * @returns {BezierCurveTo}
 */
const calcBezierCurveLeftTop = (x: number, y: number): BezierCurveTo => ({
  cpx1: x + radius - 1 + bezierCurve.leftTop[0],
  cpy1: y,
  cpx2: x,
  cpy2: y + radius - 1 + bezierCurve.leftTop[1],
  x: x,
  y: y + radius * 2,
});

/**
 * Calc BezierCurve Left Bottom
 * @param {number} x
 * @param {number} y
 * @returns {BezierCurveTo}
 */
const calcBezierCurveLeftBottom = (x: number, y: number): BezierCurveTo => ({
  cpx1: x,
  cpy1: y - radius + bezierCurve.leftBottom[0],
  cpx2: x + radius - 1 + bezierCurve.leftBottom[1],
  cpy2: y,
  x: x + radius * 2,
  y: y,
});
/**
 * Radius Right Top
 * @param {Path} path
 * @param {number} x
 * @param {number} y
 */
const radiusRT = (path: Path, x: number, y: number) => {
  path.lineTo(x - radius * 2, y);
  path.bezierCurveTo(...(Object.values(calcBezierCurveRightTop(x, y)) as BezierCurveToParams));
};

/**
 * Radius Right Bottom
 * @param {Path} path
 * @param {number} x
 * @param {number} y
 */
const radiusRB = (path: Path, x: number, y: number) => {
  path.lineTo(x, y - radius * 2);
  path.bezierCurveTo(...(Object.values(calcBezierCurveRightBottom(x, y)) as BezierCurveToParams));
};

/**
 * Radius Left Top
 * @param {Path} path
 * @param {number} x
 * @param {number} y
 */
const radiusLT = (path: Path, x: number, y: number) => {
  path.lineTo(x + radius * 2, y);
  path.bezierCurveTo(...(Object.values(calcBezierCurveLeftTop(x, y)) as BezierCurveToParams));
};

/**
 * Radius Left Bottom
 * @param {Path} path
 * @param {number} x
 * @param {number} y
 */
const radiusLB = (path: Path, x: number, y: number) => {
  path.lineTo(x, y - radius * 2);
  path.bezierCurveTo(...(Object.values(calcBezierCurveLeftBottom(x, y)) as BezierCurveToParams));
};

/**
 *
 * Draw svg line
 * @param {{d: string, width: number, height: number, strokeWidth: number} } { data, width, height, strokeWidth }
 */
const drawSvgLine = (
  {
    d,
    width,
    height,
    strokeWidth,
  }: {
    d: string;
    width: number;
    height: number;
    strokeWidth: number;
  },
  wrapper: RefObject<HTMLDivElement>
) => {
  if (wrapper.current?.querySelector('.line')) {
    const svg = d3.select('.line');
    svg
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .select('path')
      .attr('d', d)
      .attr('stroke-width', strokeWidth);
  } else {
    // remove pc line
    d3.select('.line').remove();

    const svg = d3.select(wrapper.current).append('svg');
    svg
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('fill', 'none')
      .attr('class', 'line')
      .attr('style', 'position: absolute; left: -6px; top: 114px; z-index:0;')
      .append('path')
      .attr('d', d)
      .attr('stroke', 'url(#paint0_linear_7473_9059)')
      .attr('stroke-width', strokeWidth)
      .attr('stroke-linecap', 'round')
      .attr('stroke-linejoin', 'round');

    const mql = window.matchMedia('(max-width: 960px)');
    const defs = svg
      .append('defs')
      .append('linearGradient')
      .attr('id', 'paint0_linear_7473_9059')
      .attr('x1', 582)
      .attr('y1', 6)
      .attr('x2', 582)
      .attr('y2', mql.matches ? 1586.81 : 867)
      .attr('gradientUnits', 'userSpaceOnUse');

    defs.append('stop').attr('stop-color', '#F6851B');
    defs.append('stop').attr('offset', '1').attr('stop-color', '#FF006B');
  }
};

/**
 * Draw Line Pc
 */
const drawLinePc = (wrapper: RefObject<HTMLDivElement>) => {
  const dom = wrapper.current;
  if (!dom) {
    return;
  }

  const w = dom.offsetWidth + radius * 2;

  const pointX = w - radius;

  const row2 = dom.children[3] as HTMLElement;
  // console.log('row2', row2);

  const row2Y = row2.offsetTop - padding + radius;

  const row3 = dom.children[6] as HTMLElement;
  // console.log('row3', row3)
  const row3Y = row3.offsetTop - padding + radius;

  const row4 = dom.children[9] as HTMLElement;
  // console.log('row4', row4)
  const row4Y = row4.offsetTop - padding + radius;

  let lastY = row4.offsetTop - padding + radius;
  // console.log('lastY', lastY)

  const setLast = () => {
    const list = dom.children;
    if (list.length % 3 === 0) {
      const l3 = list[list.length - 3];
      const l2 = list[list.length - 2];
      const l1 = list[list.length - 1];

      lastY += Math.max(l1.scrollHeight, l2.scrollHeight, l3.scrollHeight);
    } else if (list.length % 3 === 1) {
      const l1 = list[list.length - 1];

      lastY += l1.scrollHeight;
    } else if (list.length % 3 === 2) {
      const l2 = list[list.length - 2];
      const l1 = list[list.length - 1];

      lastY += Math.max(l1.scrollHeight, l2.scrollHeight);
    }
  };
  setLast();

  if (lastY < 0) {
    return;
  }

  const data: [number, number][] = [
    [radius, radius],
    [pointX, radius],
    [pointX, row2Y],
    [radius, row2Y],
    [radius, row3Y],
    [pointX, row3Y],
    [pointX, row4Y],
    [radius, row4Y],
    [radius, lastY],
  ];

  // console.log('data', data)

  const path = d3.path();

  // 1
  path.moveTo(...data[0]);

  // 2 3
  radiusRT(path, ...data[1]);

  // 4 5
  radiusRB(path, ...data[2]);

  // 6 7
  radiusLT(path, ...data[3]);

  // 8 9
  radiusLB(path, ...data[4]);

  // 10 11
  radiusRT(path, ...data[5]);

  // 12 13
  radiusRB(path, ...data[6]);

  // 14 15
  radiusLT(path, ...data[7]);

  // 16
  path.lineTo(...data[8]);

  drawSvgLine(
    {
      d: path.toString(),
      width: w,
      height: lastY + radius,
      strokeWidth: radius * 2,
    },
    wrapper
  );
};

/**
 * Draw Line Mobile
 */
const drawLineMobile = (wrapper: RefObject<HTMLDivElement>) => {
  const dom = wrapper.current;
  // console.log('dom', dom);
  if (!dom) {
    return;
  }

  const list = dom.children;
  let domList = Array.from(list).filter((child) => child.tagName === 'DIV');
  const lastItem = domList[domList.length - 1] as HTMLElement;
  const lastY = lastItem.offsetTop + lastItem.scrollHeight - padding + radius;

  if (lastY < 0) {
    return;
  }

  const data: [number, number][] = [
    [radius, radius],
    [radius, lastY],
  ];

  const path = d3.path();

  path.moveTo(...data[0]);
  path.lineTo(...data[1]);

  drawSvgLine(
    {
      d: path.toString(),
      width: radius * 2,
      height: lastY + radius,
      strokeWidth: radius * 2,
    },
    wrapper
  );

  d3.select('.wrapper .line-arrow-mobile').style('top', lastY + padding + radius * 2);
};

/**
 * Draw Line
 */
export const drawLine = (wrapper: RefObject<HTMLDivElement>) => {
  const mql = window.matchMedia('(max-width: 960px)');
  if (mql.matches) {
    drawLineMobile(wrapper);
  } else {
    drawLinePc(wrapper);
  }
};
