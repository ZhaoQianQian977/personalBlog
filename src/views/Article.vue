<template>
  <div class="wrapper">
    <h1 class="title">文章列表</h1>
    <div class="article">
      <el-button class="addBtn" @click="addArticle">新增+</el-button>
      <el-table :data="articleList" border stripe>
        <el-table-column prop="title" label="标题" width="180">
        </el-table-column>
        <el-table-column label="日期" width="180">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span>{{ scope.row.create_time }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleLook(scope.row)"
              >查看</el-button
            >
            <el-button type="success" size="mini" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              type="danger"
              size="mini"
              @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      articleList: [],
    };
  },
  methods: {
    handleLook(row) {
      let id = row.id;
      window.open("/detail/" + id);
    },
    handleEdit(row) {
      let id = row.id;
      this.$router.push({ path: `/article/edit/${id}` });
    },
    handleDelete(row) {
      // let id = row.id;
      this.$confirm("此操作将删除该文章, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          console.log(row.id)
          this.$axios
            .post("/api/users/delete", {id: row.id})
            .then((res) => {
              console.log(res);
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              setTimeout(()=>location.reload(),1000)
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    getArticle() {
      this.$axios.get("api/users/blogList").then((res) => {
        console.log(res);
        let result = res.data;
        if (result.code === 0) {
          this.articleList = result.data;
        }
      });
    },
    addArticle() {
      this.$router.push({ path: "/article/edit" });
    },
  },
  created() {
    this.getArticle();
  },
};
</script>

<style lang="less" scoped>
.title {
  margin: 30px 0;
  text-align: center;
  font-size: 28px;
  font-weight: 700;
}
.article {
  .addBtn {
    float: right;
    margin-bottom: 20px;
  }
}
/deep/.el-table {
  .cell {
    text-align: center;
  }
  .el-icon-time {
    margin-right: 10px;
  }
}
</style>
