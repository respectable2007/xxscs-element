import ElInputMask from './src/input-mask';

/* istanbul ignore next */
ElInputMask.install = function(Vue) {
  Vue.component(ElInputMask.name, ElInputMask);
};

export default ElInputMask;
