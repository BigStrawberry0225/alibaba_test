export class Ticker {
  static time = performance.now()
  static instances = []
  static delta = 0
  static start() {
    let self = this;
    requestAnimationFrame(tick);
    function tick() {
      const now = performance.now();
      self.delta = now - self.time;
      self.time = now;
      self.instances = self.instances.filter(i => !i.dead && !i.render());
      requestAnimationFrame(tick);
    }
  }
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
    this.dead = false;
    //是否是暂停状态
    this.currState = false;
    this.running = false;
    Ticker.instances.push(this);
  }
  // beginTime
  //添加动画
  addAnimation(options) {
    this.animations.push(options);
  }
  //开始动画
  // start() {
  //   let self = this;
  //   this.running = true;
  //   this.beginTime = performance.now()
  //   //作用？
  //   requestAnimationFrame(tick);
  //   function tick() {
  //     if (!self.running) return;
  //     self.render();
  //     requestAnimationFrame(tick);
  //   }
  //   //之前是这样的
  //   //requestAnimationFrame(tick);

  // }
  running
  pro = 0
  render() {
    if (!this.running) return;
    this.pro += Ticker.delta / this.duration;
    console.log(this.pro);
    if (this.pro >= 1) {
      this.pro = 1;
      this.running = false;
    }
    let obj = {};
    for (const { type, from, to } of this.animations) {
      obj[type] = this.differ(from, to, this.pro);
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
  start() {
    this.running = true;
  }
  //停止/取消动画
  cancel() {
    this.running = false;
  }
  //删除动画
  destroy() {
    this.dead = true;
  }
}


// let ticker = new Ticker(cube, 5000);

// ticker.addAnimation({
//   type: 'translate',
//   from: [0, 0],
//   to: [100, 200]
// });
// ticker.addAnimation({
//   type: 'scale',
//   from: 1,
//   to: 1.5
// });

// ticker.addAnimation({
//   type: 'rotateY',
//   from: 0,
//   to: 180
// });
// console.log(ticker);
Ticker.start()
const actions = [
  [{
    type: 'rotateY',
    from: 0,
    to: 1800
  }
  ],
  [{
    type: 'rotateY',
    from: 0,
    to: 720
  }
  ],
  [{
    type: 'rotateY',
    from: 0,
    to: 360
  }
  ]
]
document.querySelectorAll('.item').forEach((ele, index) => {
  let img = ele.querySelector('img');
  let start = ele.querySelector('.start');
  let stop = ele.querySelector('.stop');
  let ticker = new Ticker(img, 5000);
  for (const animation of actions[index]) {
    ticker.addAnimation(animation);
  }
  start.onclick = _ => {
    ticker.running = true;
  }
  stop.onclick = _ => {
    ticker.running = false;
  }
})
