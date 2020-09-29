<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
   <div class="wrapper">
     <div class="main">
       <blog-list></blog-list>
     </div>
   </div>
  </div>
</template>

<script>
import BlogList from '@/components/BlogList.vue'
// @ is an alias to /src
export default {
  name: "Home",
  components:{
    BlogList
  }
};
</script>
<style lang="less">
.main{
  padding: 20px;
  margin: 0 20px;
  background-color: #f8f8f8;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.4),0 0 30px rgba(10, 10, 0, 0.1)inset;
  -webkit-box-shadow: 0 1px 2px rgba(0, 0, 0, 0.4),0 0 30px rgba(10, 10, 0, 0.1)inset;
}
</style>
