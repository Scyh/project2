<template>
  <div id="app">
    <cus-nav v-if="!isAdmin"></cus-nav>
    <cus-main></cus-main>
    <div id="mask"></div>
  </div>
</template>

<script>
  
import cusNav from './components/nav.vue';
import cusMain from './components/main.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  components: {
    cusNav,
    cusMain
  },
  computed: {
    ...mapGetters([
        'isAdmin'
    ]),
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow: hidden;
  user-select: none;  /* 禁止选择 */
  overflow: hidden;
  position: relative;
}
a {
  color: #000;
}
ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

/* 图片上传预览 */
.preView {
  display: inline-block; 
  position: relative;
  background-color: #eee;
  margin-right: 15px;
}
.preView .del-img {
  position: absolute;
  right: 4px;
  top: 4px;
  color: red;
  cursor: pointer;
 /* display: none;*/
  font-size: 16px;
}
.preView img {
  padding: 10px;
  display: inline-block;
  width: 170px;
  height: 170px;
}
/*.preView img:hover + span {
  display: block;
}*/
.more {
    padding: 30px 0;
    cursor: pointer;
  }
.more span.hasMore::after {
  content: url(./assets/more.png);
  display: inline-block;
  position: absolute;
  top: 32px;
  right: 60px;
}

#mask {
  display: none;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(40, 40, 40,.8);
  z-index: 9;
} 
</style>
