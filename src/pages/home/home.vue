<template>
  <div class="home">
    <!--黏性区域-->
    <van-sticky>
      <!--      滚动通知-->
      <van-notice-bar scrollable text="本网站/app/小程序永久免费,请勿通过任何付费渠道获得"/>
      <!--      搜索框-->
      <van-search v-model="searchQuery" autofocus class="search-box" clearable
                  placeholder="快速搜索"
                  @search="handleSearch"
      />
      <!--      运行时间，人数展示-->
      <van-row class="top-row-box">
        <van-col class="top-col-box" span="12">本站已运行
          <text class="red-text">{{ timeToDur(nowTime, 1665098803000) }}</text>
        </van-col>
        <van-col class="top-col-box" span="11">本站已为
          <text class="red-text">{{ TotalCount }}</text>
          童鞋云跑步
        </van-col>
      </van-row>
    </van-sticky>
    <!--列表区域-->
    <UserList ref="userListRef" @handle-is-empty="isListEmpty"></UserList>
    <van-empty
        v-if="isShowEmpty"
        class="empty-box"
        description="空空如也"
        image="https://fastly.jsdelivr.net/npm/@vant/assets/custom-empty-image.png"
        image-size="80">
      <ol style="margin-top: 20px;">
        <li class="li-style">本学期阳光长跑已结束</li>
        <li class="li-style">阳光体育服务平台后台出现bug</li>
        <li class="li-style">暂无人使用</li>
      </ol>

    </van-empty>
  </div>
</template>
<script lang="ts" setup>
import {computed, onBeforeUnmount, onMounted, ref} from "vue";
import {useStore} from 'vuex'
import {getTotalUser} from "../../api";
import {timeToDur} from "../../utils";
import UserList from "./cpns/UserList.vue";

const store = useStore()  //store

const searchQuery = ref(''); // 搜索关键词

const nowTime = ref<number>(0) // 当前时间戳
const TotalCount = computed(() => store.state.user.userCount) // 总计算人数
let timer = 0 //定时器
const isShowEmpty = ref<boolean>(false)
const userListRef = ref()

const isListEmpty = (value: boolean) => {
  isShowEmpty.value = value
  console.log(isShowEmpty.value)
}

// 搜索框事件
const handleSearch = () => {
  // searchList(searchQuery.value)
  if (searchQuery.value.trim())
    userListRef.value.handleSearch(searchQuery.value)
  else userListRef.value.onRefresh()
}


// 立即事件
onMounted(async () => {
  store.commit('setHeaderTitle', '主页')
  // 初始化时间
  nowTime.value = Number((new Date()).getTime())
  //每秒刷新
  timer = window.setInterval(() => nowTime.value += 1000, 1000,)
// 刷新总人数
  const {data} = await getTotalUser()
  store.commit('setUserCount', data)
})
// 离开页面前
onBeforeUnmount(() => {
  timer && window.clearInterval(timer)
})
</script>
<style lang="less" scoped>
.home {
  overflow-y: auto;
  position: relative;
  //搜索
  .search-box {
    background-color: #fff;
    width: 100%;
    z-index: 9;
  }

  // 顶部展示
  .top-row-box {
    display: flex;
    justify-content: space-around;
    background-color: #fff;
    //background-color: red;
    padding: 4px 0;

    .top-col-box {
      font-size: 9px;
      text-align: center;
      line-height: 28px;
      border-radius: 5px;
      background-color: #ebedf0;

      .red-text {
        color: red;
      }

      &:last-child {
        background-color: #f2f3f5;
      }

    }
  }


  .info-btn {
    margin-left: 12px;
  }

  .empty-box {
    z-index: 99999;
    background-color: #fff;
    position: absolute;
    padding-top: 80px;
    top: 130px;
    width: 100%;

    .li-style {
      padding: 2px 0;
      list-style: url('../../asset/arrow_right.svg');
      font-size: 16px;
    }
  }

}
</style>