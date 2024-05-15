
/**
* 滑动(默认概率是百分之三十)
* @param {*} qx
* @param {*} qy
* @param {*} zx
* @param {*} zy
* @param {*} time
* @param {*} timesInterval
*/
export function swipeScreenDown(qx, qy, zx, zy, time, timesInterval) {
  let probability = randomFunction()
  let randomMin = timesInterval * 1000;
  let randomMax=(parseInt(timesInterval) + probability >= 7?2:3) * 1000;
  let delayTime = random(randomMin, randomMax);
  if (probability >= 7) {
    swipeCurveDown(qx, qy, zx, zy, time); //曲线概率
  } else {
    swipeLineDown(qx, qy, zx, zy, time); //直线概率
  }
  return delayTime
}


/**
 * 概率0-9 大于3的时候采用曲线概率 小于3的时候直线概率
 */
function randomFunction() {
  return Math.floor(Math.random() * 10);
}

/**
* 曲线滑动屏幕向下滑动并延迟n秒
*/
function swipeCurveDown(qx, qy, zx, zy, time) {
  // toastLog("曲线滑动");
  log("向上曲线滑动")
  var xxy = [time];
  var point = [];
  var dx0 = {
    "x": qx,
    "y": qy
  };
  var dx1 = {
    "x": random(qx - 100, qx + 100),
    "y": random(qy, qy + 50)
  };
  var dx2 = {
    "x": random(zx - 100, zx + 100),
    "y": random(zy, zy + 50),
  };
  var dx3 = {
    "x": zx,
    "y": zy
  };
  try {
    for (var i = 0; i < 4; i++) {
      eval("point.push(dx" + i + ")");
    };
    for (let i = 0; i < 1; i += 0.08) {
      let newPoint = bezier_curves(point, i);
      xxyy = [parseInt(newPoint.x), parseInt(newPoint.y)]
      xxy.push(xxyy);
    }
    gesture.apply(null, xxy);
  } catch (error) {
    log("向上曲线滑动（失败）")
    log(error)
    swipeLineDown(qx, qy, zx, zy, time); //直线概率
  }
}

/**
* 直线滑动屏幕向下滑动并延迟n秒
*/
function swipeLineDown(startX, startY, endX, endY, pressTime) {
  // toastLog("直线滑动");
  log("向上直线滑动")
  try{
    swipe(startX, startY, endX, endY, pressTime);
  }catch(error){
    log("向上直线滑动(失败)")
    log(error)
  }

}

/**
* 贝塞尔曲线
* @param {坐标点} ScreenPoint
* @param {偏移量} Offset
*/
function bezier_curves(ScreenPoint, Offset) {
  cx = 3.0 * (ScreenPoint[1].x - ScreenPoint[0].x);
  bx = 3.0 * (ScreenPoint[2].x - ScreenPoint[1].x) - cx;
  ax = ScreenPoint[3].x - ScreenPoint[0].x - cx - bx;
  cy = 3.0 * (ScreenPoint[1].y - ScreenPoint[0].y);
  by = 3.0 * (ScreenPoint[2].y - ScreenPoint[1].y) - cy;
  ay = ScreenPoint[3].y - ScreenPoint[0].y - cy - by;
  tSquared = Offset * Offset;
  tCubed = tSquared * Offset;
  result = {
    "x": 0,
    "y": 0
  };
  result.x = (ax * tCubed) + (bx * tSquared) + (cx * Offset) + ScreenPoint[0].x;
  result.y = (ay * tCubed) + (by * tSquared) + (cy * Offset) + ScreenPoint[0].y;
  return result;
}
