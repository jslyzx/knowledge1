<template>
  <div class="wrap">
    <div class="main">
      <div class="left">
        <div class="top">
          <img src="../assets/1.png" alt="" class="fl">
          <div class="fl">
            <div class="com">德益康</div>
            <div class="project">药品智能知识库</div>
          </div>
        </div>
        <div class="add-chat">新建聊天</div>
        <div class="item" v-for="(v, i) in historyList" :key="i" :class="{selected: i === selectedIndex}" @click="switchChat(i, v.uuid)">
          <i class="icon fl"></i>
          <p class="name fl">{{ v.title }}</p>
          <i class="del fr"></i>
          <i class="edit fr"></i>
        </div>
      </div>
      <div class="right">
        <div class="flex flex-col w-full h-full">
          <main class="flex-1 overflow">
            <div class="h-full overflow overflow-y-auto">
              <div class="w-full p-4" v-if="currentChat && currentChat.data">
                <custom-text v-for="chat in currentChat.data" :inversion="chat.inversion" :text="chat.text" :loading="chat.loading || false" :dateTime="chat.dateTime"></custom-text>
              </div>
            </div>
          </main>
          <footer class="p-4">
            <div class="foot-wrap">
              <div class="flex items-center justify-between space-x-2">
                <div class="clear">
                  <i></i>
                </div>
                <div class="download">
                  <i></i>
                </div>
                <div class="n-auto-complete">
                  <el-input v-model="input" placeholder="来说点什么吧…(Enter = 提交)" clearable @keyup.enter.native="handleSubmit"></el-input>
                </div>
                <button type="button" :class="{reject: !input}" @click="handleSubmit"><i></i></button>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import MarkdownIt from 'markdown-it'
import mdKatex from '@traptitech/markdown-it-katex'
import mila from 'markdown-it-link-attributes'
import hljs from 'highlight.js'
import CustomText from '@/components/CustomText'

export default {
  components: {
    CustomText
  },
  data() {
    return {
      input: '',
      chatList: [],
      historyList: [],
      selectedIndex: 0,
      currentChat: undefined,
      storageKey: '--knowledge--chat--data'
    }
  },
  created() {
    // this.selectedIndex = 1
    // this.currentChat = this.chatList[1]
    this.loadData()
  },
  methods: {
    loadData() {
      const json = window.localStorage.getItem(this.storageKey)
      if (json) {
        let storageData = null

        try {
          storageData = JSON.parse(json)
        } catch {
          // Prevent failure
        }

        if (storageData) {
          const { data, expire } = storageData
          if (data) {
            const { active, chat, history } = data
            this.chatList = chat
            this.historyList = history
            this.getChatHistoryByCurrentActive(active)
            this.getChatByUuid(active)
          }
        }
      }
    },
    getChatHistoryByCurrentActive(uuid) {
      this.selectedIndex = this.historyList.findIndex(item => item.uuid === uuid)
    },
    getChatByUuid(uuid) {
      const index = this.chatList.findIndex(item => item.uuid === uuid)
      this.currentChat = this.chatList[index]
    },
    switchChat(i, uuid) {
      this.selectedIndex = i
      this.getChatByUuid(uuid)
    },
    handleSubmit() {
      if (this.input)
        console.log(this.input)
    }
  }
}

</script>
<style lang="scss" scoped>
@import '../styles/demo.scss';

::-webkit-scrollbar {
  background-color: transparent;
  width: 5px;
}

::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.25);
  border-radius: 5px;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.overflow {
  overflow: hidden;
}

.overflow-y-auto {
  overflow-y: auto;
}

.wrap {
  width: 100vw;
  height: 100vh;
  opacity: 1;
  background: linear-gradient(246.75deg, rgba(0, 64, 214, 1) 0%, rgba(2, 86, 233, 1) 100%);

  .main {
    left: 63px;
    top: 66px;
    width: calc(100% - 126px);
    height: calc(100% - 132px);
    opacity: 1;
    border-radius: 43px;
    background: #3075ff;
    position: absolute;
    display: flex;

    .left {
      flex-basis: 466px;
      padding-left: 76px;
      background-image: url(../assets/8.png);
      background-position: bottom;
      background-repeat: no-repeat;
      background-size: 50%;

      .top {
        overflow: hidden;
        margin-top: 59px;

        img {
          margin-right: 20px;
        }

        .com {
          font-size: 36px;
          font-weight: 500;
          letter-spacing: 0px;
          line-height: 50px;
          color: rgba(255, 255, 255, 1);
        }

        .project {
          font-size: 29px;
          font-weight: 400;
          letter-spacing: 0px;
          line-height: 41.99px;
          color: rgba(255, 255, 255, 1);
        }
      }

      .add-chat {
        width: 327px;
        height: 60px;
        opacity: 1;
        border-radius: 35px;
        background: rgba(0, 186, 173, 1);
        margin-top: 63px;
        margin-bottom: 54px;
        font-size: 24px;
        font-weight: 400;
        letter-spacing: 0px;
        line-height: 34.75px;
        color: rgba(255, 255, 255, 1);
        text-align: center;
        line-height: 60px;
        position: relative;
        cursor: pointer;

        &::after {
          content: '';
          background-image: url(../assets/7.png);
          display: inline-block;
          width: 31px;
          height: 31px;
          position: absolute;
          top: 16px;
          left: calc(50% - 90px);
        }
      }

      .item {
        width: 327px;
        height: 64px;
        line-height: 64px;
        opacity: 1;
        border-radius: 4px;
        background: rgba(58, 126, 251, 1);
        border: 1px solid rgba(242, 247, 255, 0.5);
        margin-top: 34px;
        cursor: pointer;

        &.selected {
          background: rgba(255, 255, 255, 1);
        }

        .icon {
          display: inline-block;
          width: 33px;
          height: 29px;
          background-image: url(../assets/2.png);
          margin: 15px 17px 0 21px;
        }

        .name {
          font-size: 24px;
          font-weight: 400;
          letter-spacing: 0px;
          color: rgba(255, 255, 255, 1);
        }

        &.selected .name {
          color: rgba(58, 126, 251, 1);
        }

        .edit {
          display: inline-block;
          width: 20px;
          height: 20px;
          background-image: url(../assets/5-1.png);
          margin-top: 22px;
          margin-right: 15px;
        }

        &.selected .edit {
          background-image: url(../assets/5.png);
        }

        .del {
          display: inline-block;
          width: 21px;
          height: 21px;
          background-image: url(../assets/6-1.png);
          margin-top: 22px;
          margin-right: 15px;
        }

        &.selected .del {
          background-image: url(../assets/6.png);
        }
      }
    }

    .right {
      background-image: url(../assets/right-bg.png);
      background-size: cover;
      flex: 1;
      border-radius: 43px;
      position: relative;
      overflow-x: hidden;
    }
  }

  footer {
    background-color: rgba(255, 255, 255, 1);

    .foot-wrap {
      width: calc(100% - 4rem);
      margin: 0 auto;
    }

    .clear {
      width: 40px;
      height: 40px;
      cursor: pointer;
      flex-shrink: 0;
      line-height: 40px;

      i {
        background-image: url(../assets/clear.png);
        width: 22px;
        height: 22px;
        background-size: cover;
        display: inline-block;
        vertical-align: middle;

        &:hover {
          background-image: url(../assets/clear-hover.png);
        }
      }
    }

    .download {
      width: 40px;
      height: 40px;
      cursor: pointer;
      flex-shrink: 0;
      line-height: 40px;

      i {
        background-image: url(../assets/download.png);
        width: 22px;
        background-size: cover;
        height: 22px;
        display: inline-block;
        vertical-align: middle;

        &:hover {
          background-image: url(../assets/download-hover.png);
        }
      }
    }

    ::v-deep .el-input--suffix .el-input__inner {
      border-right: 0;
      border-radius: 4px 0 0 4px;
    }

    button {
      flex-shrink: 0;
      width: 50px;
      height: 40px;
      text-align: center;
      background-color: rgba(58, 126, 251, 1);
      border-radius: 0px 4px 4px 0px;
      border: 1px solid rgba(58, 126, 251, 1);
      margin-left: 0 !important;

      i {
        display: inline-block;
        width: 20px;
        height: 20px;
        background-image: url(../assets/fly.png);
        background-size: cover;
        vertical-align: middle;
      }

      &.reject {
        background-color: #808080;
        border-color: #808080;
        cursor: not-allowed;
      }
    }
  }
}

</style>
