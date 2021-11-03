<template>
  <div
    class="d-flex"
     :class="{
      'flex-center': align === 'center',
      'flex-start': align === 'left',
      'flex-end': align === 'right',
    }"
  >
    <div class="layui-box layui-laypage layui-laypage-default">
      <a
        class="moup"
        v-show="showEnd"
        :class="{ 'layui-disabled': current === 0 }"
        @click.prevent="home()"
        ><i class="layui-icon layui-icon-prev" v-if="showType === 'icon'"></i
        ><template v-else>首页</template>
      </a>
      <a
        class="moup"
        :class="{ 'layui-disabled': current === 0 }"
        @click.prevent="prev()"
        ><i class="layui-icon layui-icon-left" v-if="showType === 'icon'"></i
        ><template v-else>上一页</template></a
      >
      <a v-if="pages.length >= 4 && current - 1 > 1" href="javascript:;">...</a>
      <template v-for="(item, index) in pages">
        <a
          class="moup"
          v-if="item >= current - 1 && item < current + 4"
          :key="'pages' + index"
          :class="[
            current === index ? theme : '',
            current === index ? 'active' : '',
          ]"
          @click.prevent="chooseIndex(index)"
          >{{ item }}</a
        >
      </template>
      <a
        class="moup"
        v-if="pages.length >= 4 && current + 3 < pages.length"
        href="javascript:;"
        >...</a
      >
      <a
        class="moup"
        :class="{ 'layui-disabled': current === pages.length - 1 }"
        @click.prevent="next()"
        ><i class="layui-icon layui-icon-right" v-if="showType === 'icon'"></i
        ><template v-else>下一页</template></a
      >
      <a
        class="moup"
        v-show="showEnd"
        :class="{ 'layui-disabled': current === pages.length - 1 }"
        @click.prevent="end()"
        ><i class="layui-icon layui-icon-next" v-if="showType === 'icon'"></i>
        <template v-else>尾页</template>
      </a>
    </div>
    <div class="total" v-if="showTatal">
      到第<input type="text" class="total-input layui-input" />页 共 x 页
    </div>
    <div
      class="layui-unselect layui-form-select"
      :class="{ 'layui-form-selected': isSelect }"
      @click="changeSelect()"
      v-if="showSelect"
    >
      <div class="layui-select-title">
        <input
          type="text"
          placeholder="请选择"
          readonly
          v-model="options[optIndex]"
          class="layui-input layui-unselect"
        />
        <i class="layui-edge"></i>
      </div>
      <dl class="layui-anim layui-anim-down">
        <dd
          v-for="(item, index) in options"
          :key="'options' + index"
          :class="{ 'layui-this': index === optIndex }"
          @click="choosePage(item, index)"
        >
          {{ item }}
        </dd>
      </dl>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  name: 'Pagination',
  data () {
    return {
      options: [10, 20, 30, 50, 100],
      pages: [],
      optIndex: 0,
      isSelect: false,
      limit: 10
    }
  },
  props: {
    align: {
      type: String,
      default: 'center'
    },
    showType: {
      type: String,
      default: 'text'
    },
    showEnd: {
      type: Boolean,
      default: true
    },
    theme: {
      type: String,
      default: 'layui-bg-green'
    },
    showTatal: {
      type: Boolean,
      default: false
    },
    showSelect: {
      type: Boolean,
      default: true
    },
    total: {
      type: Number,
      default: 0
    },
    current: {
      type: Number,
      default: 0
    },
    size: {
      type: Number,
      default: 10
    }
  },
  watch: {
    total (newcal, oldval) {
      this.initPages()
    }
  },
  mounted () {
    // 初始化分页的长度
    this.limit = this.size
    this.initPages()
    this.options = _.uniq(_.sortBy(_.concat(this.options, this.size)))
    this.optIndex = this.options.indexOf(this.size)
  },
  methods: {
    initPages () {
      const len = Math.ceil(this.total / this.limit)
      this.pages = _.range(1, len + 1)
    },
    choosePage (item, index) {
      if (this.optIndex !== index) {
        // 多次选择会依次递减用ceil
        this.$emit(
          'changeCurrent',
          Math.floor((this.limit * this.current) / this.options[index])
        )
        this.$emit('changeLimit', this.options[index])
      }
      this.optIndex = index
      this.limit = this.options[this.optIndex]
      this.initPages()
    },
    changeSelect () {
      this.isSelect = !this.isSelect
    },
    home () {
      this.$emit('changeCurrent', 0)
    },
    end () {
      this.$emit('changeCurrent', this.pages.length - 1)
    },
    prev () {
      if (this.current - 1 < 0) {
        return
      }
      this.$emit('changeCurrent', this.current - 1)
    },
    next () {
      if (this.current + 1 === this.pages.length) {
        return
      }
      this.$emit('changeCurrent', this.current + 1)
    },
    chooseIndex (val) {
      if (val !== this.current) {
        this.$emit('changeCurrent', val)
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.layui-laypage {
  a {
    margin-left: -1px !important;
    &.active {
      border-radius: 2px;
      position: relative;
      z-index: 100;
    }
  }
}
.layui-bg-green {
  border-color: #009688;
}
.total {
  color: rgab(51, 51, 51, 1);
  margin-left: 20px;
  position: relative;
  top: -2.5px;
  font-size: 12px;
}
.total-input {
  width: 30px;
  padding: 0 5px;
  display: inline-block;
  margin: 0 5px;
}
.layui-input {
  height: 30px;
  line-height: 30px;
}
.layui-form-select {
  width: 80px;
  position: relative;
  top: -2.5px;
  margin-left: 10px;
}
.layui-disabled {
  cursor: pointer !important;
}
</style>
