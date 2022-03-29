# 👉 使用vue开发的低代码平台demo
# 核心点

1. 使用 JsonSchema 描述物料的位置、样式
2. 实现拖拽

对被拖拽元素：

- h5 属性 `draggable`
  - onDragstart
  - onDragend

对画布元素：

绑定事件 dragenter、dragover、dragleave、drop

```js
const dragstart = (e, component) => {
  // dragenter进入元素中 添加一个移动的标识
  // dragover 在目标元素经过 必须要阻止默认行为 否则不能触发drop
  // dragleave 离开元素的时候 需要增加一个禁用标识
  // drop 松手的时候 根据拖拽的组件 添加一个组件
  containerRef.value.addEventListener('dragenter', dragenter);
  containerRef.value.addEventListener('dragover', dragover);
  containerRef.value.addEventListener('dragleave', dragleave);
  containerRef.value.addEventListener('drop', drop);
  currentComponent = component;
  events.emit('start'); // 发布start
};
const dragend = (e) => {
  containerRef.value.removeEventListener('dragenter', dragenter);
  containerRef.value.removeEventListener('dragover', dragover);
  containerRef.value.removeEventListener('dragleave', dragleave);
  containerRef.value.removeEventListener('drop', drop);
  events.emit('end'); // 发布end
};
```

松手时根据拖拽的元素创建一个新的元素

3. 元素选中、多选、移动

和拖拽不同，拖拽时元素的本体还停留在原地

- mousedown
- mousemove
- mouseup

4. 辅助线的展示和吸附

- 辅助线的几种情况

  横
  ![](https://assets.onlyadaydreamer.top/mark-x.png)
  纵
  ![](https://assets.onlyadaydreamer.top/mark-x.png)

- 拖拽时根据辅助线来计算最终的位置以实现吸附效果
  ![](https://assets.onlyadaydreamer.top/WX20210924-155255%402x.png)

5. 撤销、重做
   使用栈
