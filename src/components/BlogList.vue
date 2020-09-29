<template>
  <div class="list">
    <div class="card" v-for="(item) in list" :key="item.id">
      <router-link :to="'/detail/' + item.id">
        <p class="title">{{item.title}}</p>
      </router-link>
      <p class="date">{{item.create_time}}</p>
    </div>
    
  </div>
</template>

<script>
export default {
  data(){
    return {
      list:[]
    }
  },
  
  methods: {
    getArticle() {
      this.$axios.get("/api/users/allblog").then((res) => {
        console.log(res);
        let result=res.data
        if(result.code===0){
          this.list=result.data
        }
      });
    },
  },
  created() {
    this.getArticle();
  },
};
</script>

<style lang="less" scoped>
.card {
  padding-bottom: 20px;
  margin: 15px 10px;

  border-bottom: 1px solid #eee;
  .title {
    color: #0085a1;
    font-size: 26px;
    font-weight: 600;
    text-align: left;
  }
  .date {
    font-style: italic;
    font-family: Lora, "Times New Roman", serif;
    color: #808080;
    margin-top: 20px;
  }
}
</style>
