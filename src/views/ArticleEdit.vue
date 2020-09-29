<template>
  <div class="edit_wrap wrapper">
    <div class="backBtn">
      <el-button @click="goBack">返回</el-button>
    </div>
    <div class="edit_title">标题</div>
    <el-input v-model="title" placeholder="请输入标题"></el-input>
    <div class="edit_title">文章内容（Markdown编辑器）</div>
    <div class="markdown">
      <mavon-editor v-model="content"></mavon-editor>
    </div>
    <div class="save_btn">
      <el-button type="parmary" @click="save">保存</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      content: "",
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    save() {
      if (this.$route.params.id) {
         let params = {
          title: this.title,
          content: this.content,
          article_id:this.$route.params.id
        };
        this.$axios.post("/api/users/updateArticle", params).then((res) => {
          // console.log(res)
          let result=res.data;
          if(result.code===0){
            this.$message({
              message:'更新成功',
              type:'success'
            })
            setTimeout(()=>this.$router.push({ path: "/article" }),1500)
          }
        }

      )
      }else {
        let params = {
          title: this.title,
          content: this.content,
        };
        this.$axios.post("/api/users/addBlog", params).then((res) => {
          // console.log(res)
          let result = res.data;
          if (result.code == 0) {
            this.$message({
              message: "创建成功",
              type: "success",
            });
          }
          this.$router.go(-1);
        });
      }
    }
  },
};
</script>

<style lang="less" scoped>
.edit_wrap {
  margin: 30 auto;
  background-color: #fff;
  padding: 40px;
  font-size: 16px;
  .backBtn {
    overflow: hidden;
    .el-button {
      float: right;
      margin-bottom: 40px;
    }
  }
  .edit_title {
    font-size: 18px;
    font-weight: 700;
    margin: 20px 0;
  }
  .save_btn {
    margin: 40px 0;
  }
}
</style>
