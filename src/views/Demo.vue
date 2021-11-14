<template>
  <div>
    <div class="demo-panel mt60">
      <div class="demo-panel ml60">
        <ul
          v-for="(item, index) in headerList"
          :key="'headerList' + index"
          class="lineht"
        >
          <li
            class="fontst"
            :class="{ panelac: actIndex === index }"
            @click="tagClick(index)"
          >
            {{ item }}
          </li>
        </ul>
      </div>
      <div>
        <ul class="demo-panel mr360">
          <li class="fontst">简历更新提醒</li>
          <li class="fontst">消息</li>
          <li class="loginst">简历</li>
          <li>-</li>
          <li class="regst">上传</li>
          <li class="loginst">登录</li>
          <li>/</li>
          <li class="regst">注册</li>
        </ul>
      </div>
    </div>
    <div class="header">
      <div class="headerinp mr45">
        <div class="inputdiv bdl"><span class="">深圳</span></div>
        <input class="inputcont" />
        <div class="inputdiv"><span class="">公司行业</span></div>
        <div class="inputdiv"><span class="">公司行业</span></div>
        <div class="inputdiv iconsty">
          <span class="layui-icon layui-icon-search"></span>
        </div>
      </div>
      <div class="headersel1">
        <div class="headerCity">
          <span>{{ city }} ></span>
        </div>
        <div class="headerCity"><span>不限 ></span></div>
        <div class="headerCity"><span>热门城市: </span></div>
        <div class="headerCity"><span>全国</span></div>
        <ul v-for="(item, index) in cityList" :key="'select1' + index">
          <li
            class="citySty"
            :class="{ selectActive: selectIndex1 === index }"
            @click="select1Click(index)"
          >
            {{ item }}
          </li>
        </ul>
      </div>
      <div class="headersel1">
        <div class="headerCity"><span>不限 ></span></div>
        <ul v-for="(item, index) in localList" :key="'select2' + index">
          <li
            class="citySty"
            :class="{ selectActive: selectIndex2 === index }"
            @click="select2Click(index)"
          >
            {{ item }}
          </li>
        </ul>
      </div>
      <div class="headersel1"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      headerList: [
        '首页',
        '职位',
        '校园',
        '海归',
        '公司',
        'APP',
        '咨询',
        '发现'
      ],
      cityList: [
        '北京',
        '上海',
        '广州',
        '深圳',
        '杭州',
        '天津',
        '西安',
        '苏州'
      ],
      localList: [
        '南山区',
        '宝安区',
        '龙岗区',
        '福田区',
        '龙华区',
        '光明区',
        '罗湖区',
        '盐田区'
      ],
      actIndex: 0,
      selectIndex1: 0,
      selectIndex2: 0,
      city: '深圳'
    }
  },
  methods: {
    tagClick (val) {
      this.actIndex = val
    },
    select1Click (val) {
      this.selectIndex1 = val
    },
    select2Click (val) {
      this.selectIndex2 = val
    }
  }
}
</script>

<style lang='scss'>
* {
  margin: 0;
  padding: 0;
  font-size: 14px;
}
body {
  background-color: #fff;
}
.demo-panel {
  display: flex;
  justify-content: space-between;
  background-color: rgba(32, 35, 41);
  height: 50px;
  color: white;
  align-items: center;
}
.ml60 {
  margin-left: 490px;
}
.mr360 {
  margin-right: 360px;
}
.mr45 {
  margin-left: 45px;
}
.fontst {
  margin: 0 10px;
  cursor: pointer;
}
.loginst {
  margin-left: 10px;
  margin-right: 2px;
  cursor: pointer;
}
.regst {
  margin-right: 10px;
  margin-left: 2px;
  cursor: pointer;
}
.panelac {
  color: rgba(93, 213, 200);
}
.selectActive {
  color: #fc6c38;
}
.demo-panel {
  ul {
    li {
      &:hover {
        color: rgba(93, 213, 200);
      }
    }
  }
}
.header {
  display: flex;
  flex-direction: column;
}
.headerinp {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  margin-top: 32px;
}
.inputdiv {
  display: inline-block;
  height: 28px;
  width: 72px;
  padding: 7px 18px;
  border-top: 1px solid rgba(93, 213, 200);
  border-bottom: 1px solid rgba(93, 213, 200);
  span {
    line-height: 30px;
  }
}
.iconsty {
  background-color: rgba(106, 219, 207);
  width: 54px;
}
.inputcont {
  width: 500px;
  height: 44px;
  background-color: #fff;
  border: none;
  border-top: 1px solid rgba(93, 213, 200);
  border-bottom: 1px solid rgba(93, 213, 200);
}
.bdl {
  border-left: 1px solid rgba(93, 213, 200);
}

.headerCity {
  display: inline-block;
}
.headersel1 {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 40px;
}
.citySty {
  padding: 0 11px;
}
.headersel1 {
  ul {
    li {
      flex-direction: column;
      &:hover {
        color: #fc6c38;
      }
    }
  }
}
.margintop-1 {
  top: -1px;
}
</style>
