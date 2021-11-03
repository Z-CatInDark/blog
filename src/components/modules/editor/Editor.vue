<template>
  <div id="edit-wrap">
    <div class="layui-form-item layui-form-text">
      <div class="layui-input-block">
        <div class="layui-unselect fly-edit" ref="icons">
          <span @click="choose(0)">
            <i class="iconfont icon-yxj-expression"></i>
          </span>
          <span @click="choose(1)">
            <i class="iconfont icon-tupian"></i>
          </span>
          <span @click="choose(2)">
            <i class="iconfont icon-lianjie"></i>
          </span>
          <span class="quote" @click="choose(3)"> ” </span>
          <span @click="choose(4)">
            <i class="iconfont icon-emwdaima"></i>
          </span>
          <span @click="choose(5)"> hr </span>
          <span @click="choose(6)">
            <i class="iconfont icon-yulan1"></i>
          </span>
        </div>
        <textarea
          id="edit"
          class="layui-textarea fly-editor"
          name="content"
          v-model="content"
          @focus="focusEvent()"
          @blur="blurEvent()"
        ></textarea>
        <div ref="modal">
          <faces
            :isShow="current === 0"
            @closeEvent="closeModal()"
            @addEvent="addFace"
          ></faces>
          <img-upload
            :isShow="current === 1"
            @closeEvent="closeModal()"
            @addEvent="addPic"
          ></img-upload>
          <link-add
            :isShow="current === 2"
            @closeEvent="closeModal()"
            @addEvent="addLink"
          ></link-add>
          <preview :isShow="current === 6" @closeEvent="closeModal()" :content="content"></preview>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Faces from './Face.vue'
import ImgUpload from './ImgUpload.vue'
import LinkAdd from './LinkAdd.vue'
import Preview from './Preview.vue'
export default {
  name: 'editor',
  props: ['initContent', 'recoveryContent'],
  data () {
    return {
      current: '',
      content: '',
      pos: ''
    }
  },
  watch: {
    initContent () {
      this.content = this.initContent
    },
    recoveryContent () {
      this.content = this.recoveryContent
    }
  },
  components: {
    Faces,
    ImgUpload,
    LinkAdd,
    Preview
  },
  mounted () {
    this.$nextTick(() => {
      document
        .querySelector('body')
        .addEventListener('click', this.handleBodyClick)
    })
  },
  updated () {
    this.$emit('changeContent', this.content)
  },
  beforeDestroy () {
    document
      .querySelector('body')
      .removeEventListener('click', this.handleBodyClick)
  },
  methods: {
    handleBodyClick (e) {
      e.stopPropagation()
      // 判断点击非控制ICON以外的地方
      if (
        !(
          this.$refs.icons.contains(e.target) ||
          this.$refs.modal.contains(e.target)
        )
      ) {
        this.closeModal()
      }
    },
    closeModal () {
      this.current = ''
    },
    choose (index) {
      if (index === this.current) {
        this.closeModal()
      } else {
        this.current = index
      }
    },
    // 添加表情
    addFace (item) {
      const insertContent = `face${item}`
      this.insert(insertContent)
      this.pos += insertContent.length
    },
    // 添加图片
    addPic (item) {
      const insertContent = `img[${item}]`
      this.insert(insertContent)
      this.pos += insertContent.length
    },
    // 添加链接
    addLink (item) {
      const insertContent = `a(${item})[${item}]`
      this.insert(insertContent)
      this.pos += insertContent.length
    },
    insert (val) {
      if (typeof this.content === 'undefined') {
        return
      }
      let tmp = this.content.split('')
      tmp.splice(this.pos, 0, val)
      this.content = tmp.join('')
    },
    focusEvent () {
      this.getPos()
    },
    blurEvent () {
      this.getPos()
    },
    // 获取光标位置
    getPos () {
      let cursorPos = 0
      let elem = document.getElementById('edit')
      if (document.selection) {
        // 兼容IE
        let selectRange = document.selection.createRange()
        selectRange.moveStart('charater', -elem.value.length)
        cursorPos = selectRange.text.length
      } else if (elem.selectionStart || elem.selectionStart === '0') {
        cursorPos = elem.selectionStart
      }
      this.pos = cursorPos
    }
  }
}
</script>

<style lang='scss'>
@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes bounceOut {
  0% {
    transform: scale(1);
  }
  30% {
    transform: scale(1.05);
  }
  100% {
    opacity: 0;
    transform: scale(0.7);
  }
}
.fade-leave-active {
  animation: bounceOut 0.3s;
}

.fade-enter-active,
.fade-enter-to {
  animation: bounceIn 0.3s;
}

.fly-editor {
  height: 260px;
}
.quote {
  font-size: 30px;
  vertical-align: middle;
  position: relative;
  top: 4px;
}
.edit-wrap {
  position: relative;
}
.edit-content {
  position: absolute;
  top: 45px;
  left: 0;
  z-index: 100;
  background: #fff;
}
.layui-layer-prompt {
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
}
</style>
