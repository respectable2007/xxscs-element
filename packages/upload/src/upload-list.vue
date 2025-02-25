<template>
  <transition-group
    tag="ul"
    :class="[
      'el-upload-list',
      'el-upload-list--' + listType,
      { 'is-disabled': disabled }
    ]"
    name="el-list"
  >
    <li
      v-for="file in files"
      :class="['el-upload-list__item', 'is-' + file.status, focusing ? 'focusing' : '']"
      :key="file.uid"
      tabindex="0"
      @keydown.delete="!disabled && $emit('remove', file)"
      @focus="focusing = true"
      @blur="focusing = false"
      @click="focusing = false"
    >
      <slot :file="file">
        <img
          class="el-upload-list__item-thumbnail"
          v-if="file.status !== 'uploading' && ['picture-card', 'picture'].indexOf(listType) > -1 && (imgs.indexOf(file.type) > -1)"
          :src="file[src]" alt=""
        >
        <div class="el-upload-list__item-thumbnail"
         v-if=" ['picture-card'].indexOf(listType) > -1 && (file.type === 'application/pdf')">
         <img src="./assets/PDF.svg" style="width:100%;">
        </div>
        <div class="el-upload-list__item-thumbnail"
         v-if=" ['picture-card'].indexOf(listType) > -1 && (docs.indexOf(file.type) > -1 )">
         <img src="./assets/docx.svg" style="width:100%;">
        </div>
        <a class="el-upload-list__item-name" :title="file.name" @click="handleClick(file)">
          <i class="el-icon-document"></i>
          {{file.name}}
        </a>
        <label class="el-upload-list__item-status-label">
          <i :class="{
            'el-icon-upload-success': true,
            'el-icon-circle-check': listType === 'text',
            'el-icon-check': ['picture-card', 'picture'].indexOf(listType) > -1
          }"></i>
        </label>
        <i class="el-icon-close" v-if="!disabled" @click="$emit('remove', file)"></i>
        <i class="el-icon-close-tip" v-if="!disabled">{{ t('el.upload.deleteTip') }}</i> <!--因为close按钮只在li:focus的时候 display, li blur后就不存在了，所以键盘导航时永远无法 focus到 close按钮上-->
        <el-progress
          v-if="file.status === 'uploading'"
          :type="listType === 'picture-card' ? 'circle' : 'line'"
          :stroke-width="listType === 'picture-card' ? 6 : 2"
          :percentage="parsePercentage(file.percentage)">
        </el-progress>
        <span class="el-upload-list__item-actions" v-if="listType === 'picture-card'">
          <span
            class="el-upload-list__item-preview"
            v-if="handlePreview && listType === 'picture-card'"
            @click="handlePreview(file)"
          >
            <i class="el-icon-zoom-in"></i>
          </span>
          <span
            class="el-upload-list__item-preview"
            v-if="handleDownload && listType === 'picture-card'"
            @click="handleDownload(file)"
          >
            <i class="el-icon-download"></i>
          </span>
          <span
            v-if="!disabled"
            class="el-upload-list__item-delete"
            @click="$emit('remove', file)"
          >
            <i class="el-icon-delete"></i>
          </span>
        </span>
      </slot>
    </li>
  </transition-group>
</template>
<script>
  import Locale from 'xxgcs-element-ui/src/mixins/locale';
  import ElProgress from 'xxgcs-element-ui/packages/progress';

  export default {

    name: 'ElUploadList',

    mixins: [Locale],

    data() {
      return {
        focusing: false,
        imgs: ['image/jpeg', 'image/jpg', 'image/png'],
        docs: ['application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword']
      };
    },
    components: { ElProgress },

    props: {
      files: {
        type: Array,
        default() {
          return [];
        }
      },
      disabled: {
        type: Boolean,
        default: false
      },
      handlePreview: Function,
      handleDownload: Function,
      listType: String,
      src: {
        type: String,
        default: 'url'
      }
    },
    /* watch: {
      files: {
        immediate: true,
        handler(val) {
          if (val.length) {
            console.log(val[0].type);
          }
        }
      }
    }, */
    methods: {
      parsePercentage(val) {
        return parseInt(val, 10);
      },
      handleClick(file) {
        this.handlePreview && this.handlePreview(file);
      }
    }
  };
</script>
