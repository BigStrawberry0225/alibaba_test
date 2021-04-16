class Ticker {
  /**
   * @type {{type:string,from:number|number[],to:number|number[]}[]}
   */
  animations = []
  /**
   * @type {HTMLDivElement}
   */
  element
  constructor(element, duration) {
    this.element = element;
    this.duration = duration;
  }
  beginTime
  //添加动画
  addAnimation(options) {
    this.animations.push(options);
  }
  //开始动画
  start() {
    let self = this;
    this.running = true;
    this.beginTime = performance.now()
    function tick() {
      if (!self.running) return;
      self.render();
      requestAnimationFrame(tick);
    }
    //作用？
    requestAnimationFrame(tick);
  }
  running

  render() {
    let cur = performance.now();
    let pro = (cur - this.beginTime) / this.duration;
    if (pro >= 1) {
      pro = 1;
      this.running = false;
    }
    let obj = {};
    for (const { type, from, to } of this.animations) {
      obj[type] = this.differ(from, to, pro);
    }
    //对动画效果进行添加
    let transform = '';
    if (obj.translate) {
      transform += `translate(${obj.translate[0] | 0}px, ${obj.translate[1] | 0}px)`;
    }

    if (obj.scale) {
      transform += `scale(${obj.scale})`;
    }
    if (obj.rotateY) {
      transform += `rotateY(${obj.rotateY | 0}deg)`;
    }
    // console.log(transform);
    this.element.style.transform = transform;
  }

  differ(from, to, pro) {
    return typeof from === 'number' ? from + (to - from) * pro : Array.from(to, (item, index) => (item - from[index]) * pro + from[index])
  }
  //停止/取消动画
  cancel() {
    this.running = false;
  }

}

let ticker = new Ticker(test1, 5000);

ticker.addAnimation({
  type: 'translate',
  from: [0, 0],
  to: [100, 200]
});
ticker.addAnimation({
  type: 'scale',
  from: 1,
  to: 1.5
});

ticker.addAnimation({
  type: 'rotateY',
  from: 0,
  to: 180
});
ticker.start()


setTimeout(() => {
  ticker.cancel()
}
  , 4000
)

// export function createTicker(element, duration) {
//   return new Ticker(element, duration);
// }