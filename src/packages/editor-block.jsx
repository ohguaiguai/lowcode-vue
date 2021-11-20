import { computed, defineComponent, inject, onMounted, ref } from 'vue';
import BlockResize from './block-resize';
export default defineComponent({
  props: {
    block: { type: Object },
    formData: { type: Object }
  },
  setup(props) {
    const blockStyles = computed(() => ({
      top: `${props.block.top}px`,
      left: `${props.block.left}px`,
      zIndex: `${props.block.zIndex}`
    }));

    // 在App.vue中provide
    const config = inject('config');

    const blockRef = ref(null);

    onMounted(() => {
      let { offsetWidth, offsetHeight } = blockRef.value;
      if (props.block.alignCenter) {
        // 说明是从物料区拖拽到画布区松手的时候才渲染的，其他的默认渲染到页面上的内容不需要居中
        // 元素中心落在鼠标位置，那么left的值就是拖拽结束时的 e.offsetX - offsetWidth / 2; 松手时已经将 e.offsetX 赋值给了 props.block.left
        props.block.left = props.block.left - offsetWidth / 2;
        props.block.top = props.block.top - offsetHeight / 2; // 原则上重新派发事件
        props.block.alignCenter = false; // 下次渲染时不需要再居中
      }
      props.block.width = offsetWidth;
      props.block.height = offsetHeight;
    });

    return () => {
      // 通过block的key属性直接获取对应的组件
      const component = config.componentMap[props.block.key];
     console.log(component);
      // 获取render函数
      const RenderComponent = component.render({
        size: props.block.hasResize
          ? { width: props.block.width, height: props.block.height }
          : {},
        props: props.block.props,
        // model: props.block.model  => {default:'username'}  => {modelValue: FormData.username,"onUpdate:modelValue": v=> FormData.username = v}

        model: Object.keys(component.model || {}).reduce((prev, modelName) => {
     console.log(111, prev, modelName);
          let propName = props.block.model[modelName]; // 'username'
          prev[modelName] = {
            modelValue: props.formData[propName], // zfjg
            'onUpdate:modelValue': (v) => (props.formData[propName] = v)
          };
          return prev;
        }, {})
      });
      const { width, height } = component.resize || {};
      return (
        <div class="editor-block" style={blockStyles.value} ref={blockRef}>
          {RenderComponent}
          {/* 传递block的目的是为了修改当前block的宽高， component中存放了是修改高度还是宽度 */}
          {props.block.focus && (width || height) && (
            <BlockResize
              block={props.block}
              component={component}
            ></BlockResize>
          )}
        </div>
      );
    };
  }
});
