# 题目描述

## 计时器

实现一个打点计时器，进行css动画

1、从 start 到 end（包含 start 和 end），将一个页面元素进行位移动画

2、返回的对象中需要包含一个 cancel 方法，用于停止定时操作

3、进行更多的动画操作（缩放，旋转，位移）


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

### tag1

  #### 实现思想

为每一个需要的动画创建一个Ticker实例，构造函数需要传入Element以及动画持续时间两个参数。创建ticker对象之后通过addAnimation方法对动画的行为进行添加，添加的行为存放到animations数组中，调用start方法开始动画执行，将running设置为true，通过判断running的值来决定是否进行render。通过（当前时间-动画开始时间）/动画设定持续时间来得到当前动画执行进度。通过differ方法来获取当前transfrom属性的期望值，通过对Element.style.transform复制来实现动画。添加动画的不同操作的时候，如：旋转/平移/缩放……，需要对animations里面每一项执行differ函数来得到期望值，之后通过判断是否有某一动画type来决定是否在transform属性中添加此值。

停止操作只需将running设为false，此时的停止操作会将动画暂停在当前执行状态。



#### todoList

- 希望添加继续方法，可以在暂停后继续动画。要求暂停时保留动画的执行状态。
- 希望添加结束方法，来决定动画是否真的结束。
- 希望添加一个存储动画实例的数组，避免每个动画实力都要进行requestAnimationFrame，同时可以更好的管理**内存**。
- 希望可以通过封装暴露方法供项目使用。



### 测试用例

#### 测试用例1

```javascript
  let test1 = new Ticker(demo1, 5000);

  test1.addAnimation({

   type: 'translate',

   from: [0, 0],

   to: [100, 200]

  });

  test1.addAnimation({

   type: 'scale',

   from: 1,

   to: 1.5

  });

  test1.addAnimation({

   type: 'rotateY',

   from: 0,

   to: 180

  });
```



####   测试用例2

```javascript
  let test2 = new Ticker(demo2, 5000);

  test2.addAnimation({

   type: 'translate',

   from: [0, 0],

   to: [200, 200]

  });

  test2.addAnimation({

   type: 'scale',

   from: 1,

   to: 0.5

  });

  test2.addAnimation({

   type: 'rotateY',

   from: 0,

   to: 720

  });
```



####   测试用例3

```javascript
  let test3 = new Ticker(demo3, 10000);

  test3.addAnimation({

   type: 'rotateY',

   from: 0,

   to: 3600

  });
```



---------------------------------------------

### tag2

待完成