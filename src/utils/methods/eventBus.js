// 构造eventBus
let EventBusClass = {};
EventBusClass = function () {
  this.msgQueues = {};
};

EventBusClass.prototype = {
  // 将消息保存到当前的消息队列中
  on: function (msgName, func) {
    //  判断this.msgQueues中是否存在名称位msgName的消息队列
    if (this.msgQueues.hasOwnProperty(msgName)) {
      if (typeof this.msgQueues === "function") {
        this.msgQueues[msgName] = [this.msgQueues[msgName], func];
      } else {
        this.msgQueues[msgName] = [...this.msgQueues[msgName], func];
      }
    } else {
      this.msgQueues[msgName] = func;
    }
  },
  // 消息队列中仅保存一个消息
  one: function (msgName, func) {
    // 无需检查msgName是否存在
    this.msgQueues[msgName] = func;
  },
  // 发送消息
  emit: function (msgName, msg) {
    if (!this.msgQueues.hasOwnProperty(msgName)) {
      return;
    }
    if (typeof this.msgQueues[msgName] === "function") {
      this.msgQueues[msgName](msg);
    } else {
      this.msgQueues[msgName].map((fn) => {
        fn(msg);
      });
    }
  },
  // 移除消息
  off: function (msgName) {
    if (!this.msgQueues.hasOwnProperty(msgName)) {
      return;
    }
    delete this.msgQueues[msgName];
  },
};
// 将EventBus放到window对象中
const EventBus = new EventBusClass();
window.EventBus = EventBus;

// 订阅消息
EventBus.on("first-event", function (msg) {
  console.log(`订阅的消息是：${msg}`);
});
console.log(EventBus);

// // 发送消息
// function emit() {
EventBus.emit("first-event", "-----------测试使用----------");
// }

// // 移除消息
setTimeout(() => {
  EventBus.off("first-event");
  console.log(EventBus);
}, 5000);
