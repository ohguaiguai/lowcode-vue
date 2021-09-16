# 核心点

1. 使用 JsonSchema 描述物料的位置、样式
2. 实现拖拽

被拖拽元素：

- h5 属性 `draggable`
  - onDragstart
  - onDragend

画布元素：

绑定事件

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
