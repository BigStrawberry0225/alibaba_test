计时器
实现一个打点计时器，进行css动画

1、从 start 到 end（包含 start 和 end），将一个页面元素进行位移动画

2、返回的对象中需要包含一个 cancel 方法，用于停止定时操作

3/进行更多的动画操作（缩放，旋转，位移）


class Ticker{
  constructor(element,duration){}
  addAnimation(options){}
  start(){}
  cancel(){}
}

const ticker = new Ticker(element,1.2);

ticker.addAnimation({
  type:'translate',
  from:[0,100],
  to:[100,200]
});

ticker.addAnimation({
  type:'scale',
  from:1,
  to:1.5});

ticker.addAnimation({
  type:'rotateY',
  from:0,
  to:180});