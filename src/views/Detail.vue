<template>
  <div class="blog-content-box">
    <div class="wrapper">
      <h1 class="title">{{blogContent.title}}</h1>
      <div class="time">
        <span class="date"><i class="iconfont icon-date"></i>{{blogContent.create_time}}</span>
      </div>
      <div class="detail">
        <mavon-editor
          v-model="blogContent.content"
          defaultOpen="preview"
          :toolbarsFlag="false"
          :subfield="false"
        />
      </div>
      <comment></comment>
    </div>
  </div>
</template>

<script>
import Comment from "@/components/Comment.vue";
export default {
  data() {
    return {
      blogContent:{}
    };
  },
  components: {
    Comment,
  },
  methods: {
    getDetail() {
      this.$axios
        .get("/api/users/detail", {
          params: {
            article_id: this.$route.params.id,
          },
        })
        .then((res) => {
          // console.log(res);
          const result=res.data
          if(result.code===0){
            this.blogContent=result.data
          }
        });
    },
  },
  created() {
    this.getDetail();
  },
};
</script>

<style lang="less" scoped>
.blog-content-box {
  min-height: calc(100vh-200px);
}
.wrapper {
  padding: 20px;
  background: #f8f8f8;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.4), 0 0 30px rgba(10, 10, 0, 0.1) inset;
  -webkit-box-shadow: 0 1px 2px rgba(0, 0, 0, 0.4),
    0 0 30px rgba(10, 10, 0, 0.1) inset;
  .title {
    text-align: center;
    font-size: 28px;
    font-weight: 500;
  }
  .time {
    margin: 10px 0 40px;
    border-bottom: 1 solid #eee;
    padding-bottom: 20px;
    color: #999;
    text-align: center;
    .iconfont {
      color: #666;
      margin-right: 5px;
    }
  }
}
</style>
