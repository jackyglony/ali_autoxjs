
"ui";
ui.layout(
  <vertical>
    <button id="btn1" text="自动执行刷视频"></button>
    <button id="btn2" text="打开《支付宝》"></button>
    <button id="btn3" text="打开《生活》Tab"></button>
    <button id="btn4" text="启动刷视频功能"></button>
    <button id="btn5" text="关闭脚本"></button>
  </vertical>
);
import { swipeScreenDown } from "./swipeUtil"
auto.waitFor()

ui.btn1.click(() => {
  try {
    app.launchApp("支付宝")
    setTimeout(()=>{
      //打开生活tab
      if (openTab()) {
        brushVideo()
      }
    },5*1000)

  } catch (error) {
    log(error)
  }

})

ui.btn2.click(() => {
  try {
    app.launchApp("支付宝")
  } catch (error) {
    log(error)
  }

})

ui.btn3.click(() => {
  try {
    openTab()
  } catch (error) {
    log(error)
  }
})

ui.btn4.click(() => {
  try {
    brushVideo()
  } catch (error) {
    log(error)
  }
})

ui.btn5.click(() => {
  threads.shutDownAll()
  engines.myEngine().forceStop();
})


function isExistRedpaper(){
  try {
    let r1= text("收藏").className('android.widget.TextView').exists()
    return r1;
  } catch (error) {
    log(error)
  }
  return false
}

const openTab = () => {
  try {
    log("打开《生活》tab")
    className("android.widget.TabWidget").findOne().children().forEach(c => {
      //log(`${c.className()} + ${c.childCount()}`)
      c.children().forEach(node => {
        log(node.className())
        if (node.text() === '生活' || node.text() === '视频') {
          c.click()
          throw new Error("break$$Success")
        }
      })
    })
    return false;
  } catch (e) {
    if (e && e.message === "break$$Success") {
      return true;
    }
  }
}

/**
   * 递归查找Node节点中可点击的el
   * @param {} node
   * @returns el node
   */
const forEachClick = function (node) {
  if (!node) {
    console.error("组件不能为空")
    return "";
  }
  console.log("forEachClick >> ", node.className())
  if (node.clickable()) {
    console.log("可点击的组件：", node.className())
    return node;
  } else {
    if (!node.parent()) {
      console.error("未找到父组件");
      return "";
    }
    return forEachClick(node.parent());
  }
}

function brushVideo() {
  log("start brush video ")
  let num = 1
  let timesInterval = 10
  let x1 = random(device.width * 0.8, device.width * 0.9);/*  */
  let y1 = device.height - (device.height * 0.15)
  let x2 = random(device.width * 0.8, device.width * 0.9);
  let y2 = device.height * 0.2
  let pressTime = random(700, 800);
  let isRun=true
  threads.start(()=>{
    while (isRun) {
      log("start brush video ")
      log(`brush num ${num++}`)
      let delayTime=swipeScreenDown(x1, y1, x2, y2, pressTime, timesInterval)
      log('brush wait time '+delayTime)
      sleep(delayTime);
      if(!isExistRedpaper()){
        isRun=false
        back()
        sleep(5000)
        openTab()
      }
    }
  })
}
