<template>
  <div
    @dragstart.prevent
    class="el-input-mask">
    <el-popover
      placement="top-start"
      width="200"
      trigger="manual"
      :content="message"
      v-model="visible">
      <span class="el-input-mask__append"
        role="button"
        @click="change"
        @keydown.enter="increase" slot="reference">
        <i class="el-icon-view"></i>
    </span>
    </el-popover>
    <el-input
      ref="input"
      :value="displayValue"
      :disabled="disabled"
      :placeholder="placeholder"
      @input="handleInput"
      @change="handleInputChange">
    </el-input>
  </div>
</template>
<script>
  import ElInput from 'xxgcs-element-ui/packages/input';
  import Focus from 'xxgcs-element-ui/src/mixins/focus';

  export default {
    name: 'ElInputMask',
    mixins: [Focus('input')],
    inject: {
      elForm: {
        default: ''
      },
      elFormItem: {
        default: ''
      }
    },
    components: {
      ElInput
    },
    model: {
      prop: 'value',
      event: 'change'
    },
    props: {
      value: {},
      validator: {
        type: Function,
        required: true
      },
      translate: {
        type: Function,
        required: true
      },
      placeholder: {
        type: String
      },
      message: {
        type: String,
        default: '不符合当前规则，请重写填写'
      }
    },
    data() {
      return {
        currentValue: 0,
        userInput: null,
        displayValue: null,
        disabled: true,
        visible: false
      };
    },
    watch: {
      value: {
        immediate: true,
        handler(value) {
          let newVal = value;
          if (newVal !== undefined) {
            if (this.validator(newVal)) {
              newVal = this.translate(newVal);
            } else {
              this.disabled = false;
            }
          }
          this.currentValue = newVal;
          this.displayValue = this.disabled ? newVal : value;
          if (this.displayValue.length === 0) {
            this.disabled = false;
          }
          this.userInput = value;
          this.$emit('input', newVal);
        }
      }
    },
    methods: {
      change() {
        if (this.displayValue.length > 0 && this.validator(this.userInput)) {
          this.disabled = this.displayValue === this.userInput;
          this.visible = false;
        } else {
          this.visible = true;
        }
        this.displayValue = this.displayValue === this.currentValue ? this.userInput : this.currentValue;
      },
      handleInput(value) {
        this.userInput = value;
        this.$emit('change', value);
      },
      handleInputChange(value) {
        this.$emit('change', value);
      }
    },
    mounted() {
      let innerInput = this.$refs.input.$refs.input;
      innerInput.setAttribute('role', 'spinbutton');
      innerInput.setAttribute('aria-valuemax', this.max);
      innerInput.setAttribute('aria-valuemin', this.min);
      innerInput.setAttribute('aria-valuenow', this.currentValue);
      innerInput.setAttribute('aria-disabled', this.inputNumberDisabled);
    },
    updated() {
      if (!this.$refs || !this.$refs.input) return;
      const innerInput = this.$refs.input.$refs.input;
      innerInput.setAttribute('aria-valuenow', this.currentValue);
    }
  };
</script>
