## InputMask 脱敏器

仅允许输入标准的数字值，将身份证、手机号等敏感数据脱敏

### 基础用法

:::demo 要使用它，只需要在`el-input-mask`元素中使用`v-model`绑定变量即可，变量的初始值即为默认值。
```html
<template>
  <el-input-mask v-model="num" :validator="validator" :translate="translate" label="描述文字" style="width:300px"></el-input-mask>
</template>
<script>
  export default {
    data() {
      return {
        num: '130625880716082'
      };
    },
    methods: {
      validator(value) {
        return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/g.test(value);
      },
      translate(value) {
        return value.length === 15 ?value.replace(/^(\d{6})\d{6}(\d{3})$/g, '$1******$2') : value.replace(/^(\d{6})\d{8}(\d{3}(\d|X|x))$/g, '$1********$2')
      }
    }
  };
</script>
```
:::
### 手机号用法

:::demo 要使用它，只需要在`el-input-mask`元素中使用`v-model`绑定变量即可，变量的初始值即为默认值。
```html
<template>
  <el-input-mask v-model="num" :validator="validator" :translate="translate" label="描述文字" style="width:300px"></el-input-mask>
</template>
<script>
  export default {
    data() {
      return {
        num: ''
      };
    },
    methods: {
      validator(value) {
        return /^((0\d{2,3})-\d{7,8}|(1[3456789]\d{9}))$/g.test(value)
      },
      translate(value) {
        return value.replace(/^(\d{3})\d{4}(\d{4})$/g, '$1****$2')
      }
    }
  };
</script>
```
:::
### 禁用状态

:::demo `disabled`属性接受一个`Boolean`，设置为`true`即可禁用整个组件。

```html
<template>
  <el-input-mask v-model="num" :disabled="true"></el-input-number>
</template>
<script>
  export default {
    data() {
      return {
        num: 1
      }
    }
  };
</script>
```
:::

### 尺寸

额外提供了 `medium`、`small`、`mini` 三种尺寸的数字输入框

:::demo

```html
<template>
  <el-input-number v-model="num1"></el-input-number>
  <el-input-number size="medium" v-model="num2"></el-input-number>
  <el-input-number size="small" v-model="num3"></el-input-number>
  <el-input-number size="mini" v-model="num4"></el-input-number>
</template>
<script>
  export default {
    data() {
      return {
        num1: 1,
        num2: 1,
        num3: 1,
        num4: 1
      }
    }
  };
</script>
```
:::

### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|----------|-------------- |----------|--------------------------------  |-------- |
| value / v-model    | 绑定值         | number | — | 0 |
| size     | 计数器尺寸           | string   | large, small | — |
| disabled | 是否禁用计数器        | boolean | — | false |
| validator | 输入内容验证规则 | function | — | — |
| translate | 输入内容转换规则 | function | — | — |
| placeholder | 输入框默认 placeholder | string | - | - |

### Events
| 事件名称 | 说明 | 回调参数 |
|---------|--------|---------|
| change | 绑定值被改变时触发 | currentValue, oldValue |
| blur | 在组件 Input 失去焦点时触发 | (event: Event) |
| focus | 在组件 Input 获得焦点时触发 | (event: Event) |