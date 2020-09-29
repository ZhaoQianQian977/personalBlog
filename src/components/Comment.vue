<template>
  <div class="comment-box">
    <div v-if="isSignIn === 0" class="signInText">登陆留言吧</div>
    <div v-else class="input-box">
      <div class="input-top">
        <div class="img">
          <img class="avatar" :src="userInfo.head_img" />
          <p class="username">{{userInfo.nickname}}</p>
        </div>
        <div class="text">
          <textarea class="comment-content" v-model="submitText"></textarea>
        </div>
      </div>
      <div class="input-bottom">
        <a href="javascript:void(0)" @click="submit" class="submit">发表评论</a>
      </div>
    </div>
    <div class="all-comment">
      <p class="title">全部评论<span class="total">{{commentList.length}}</span>条</p>
      <div class="comment-list" >
        <div class="comment-item" v-for="(item,i) in commentList" :key="i">
          <div class="item-l">
            <img class="avator" :src="item.head_img"/>
            <p class="username">{{item.nickname}}</p>
          </div>
          <div class="item-r">
            <div class="comment-content">
              <div class="comment-text">{{item.cm_content}}</div>
              <div class="comment-time">
                <span class="date">{{item.create_time}}</span>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
     userInfo:{},
     submitText:"",
     commentList:[]
    };
  },
  computed:{
    isSignIn(){
      return this.$store.state.isSignIn
    }
  },
  methods:{
    getUserInfo(){
      this.$axios.get('/api/users/info').then(res=>{
        let result=res.data
        if(result.code==0){

          this.userInfo=result.data
        }
      }).catch(e=>{
        console.log(e)
      })
    },
    submit(){
      this.$axios.post('/api/comment/addComment',{article_id:this.$route.params.id,content:this.submitText}).then(res=>{
        console.log(res)
        let result=res.data
        if(result.code==0){

          this.commentMsg=result.data
          this.$message({
            message:'新增成功',
            type:'success'
          })
          setTimeout(()=>location.reload(),1000)
        }
      }).catch(e=>{
        console.log(e)
      })
    },
     getCommentList(){
      this.$axios.get('/api/comment/commentList',{
        params:{
          article_id:this.$route.params.id
        }
      }).then(res=>{
        let result=res.data
        console.log(result)
        if(result.code==0){

          this.commentList=result.data
        }
      }).catch(e=>{
        console.log(e)
      })
    },
  },
  created(){
    this.getUserInfo();
    this.getCommentList()

  }
};
</script>

<style lang="less" scoped>
.comment-box {
  padding: 50px 30px;
  background-color: #fafafa;
  box-shadow: 0 0px 3px rgba(0, 0, 0, 0.157), 0 0px 3px rgba(0, 0, 0, 0.227);
  .signInText {
    text-align: center;
    color: #3b99fc;
    font-size: 18px;
    cursor: pointer;
  }
  .input-box {
    .input-top {
      display: flex;
      .img {
        width: 100px;
        text-align: center;
        .avatar {
          display: inline-block;
          border: 1px solid #aaa;
          width: 60px;
          height: 60px;
          border-radius: 50%;
        }
        .username {
          color: #3b99fc;
          cursor: pointer;
          word-break: break-all;
        }
      }
      .text {
        flex: 1;
        textarea {
          width: 98%;
          margin-left: 2%;
          min-height: 90px;
          font-size: 14;
          border: 1px solid #ddd;
          border-radius: 6px;
          padding: 20px;
          box-sizing: border-box;
        }
      }
    }

    .input-bottom {
      margin-top: 20px;
      overflow: hidden;
      .submit {
        width: 100px;
        height: 50px;
        float: right;
        line-height: 50px;
        text-align: center;
        border-radius: 6px;
        color: #fff;
        background: rgba(0, 0, 0, 0.2);
        &:hover {
          background-color: rgba(0, 129, 255, 0.7);
        }
      }
    }
  }
}

.all-comment {
  border-top: 1px solid #eee;
  padding: 30px 0;
  margin: 30px 0 0 0;
  .title {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 50px;
    border-left: 4px solid #3b99fc;
    padding-left: 20px;
  }
  .comment-list {
    .comment-item {
      display: flex;
       border-bottom: 1px solid #eee;
       padding:20px 0;
      .item-l {
        width: 100px;
        text-align: center;
        .avator {
          display: inline-block;
          border: 1px solid #aaa;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          margin-bottom: 20px;
        }
        .username {
          color: #3b99fc;
          cursor: pointer;
          word-break: break-all;
          margin-top: 10px;
        }
      }
      .item-r {
        flex:1;
        .comment-content {
          width: 98%;
          margin-right: 2%;
          box-sizing: border-box;
          font-size: 14px;
          color: #666;
          padding: 10px;
         
          
          .comment-text{
            min-height: 70px;
          }
          .comment-time{
            text-align: right;
            padding: 10px 0;
            font-size: 12px;
          }
        }
      }
    }
  }
}
</style>
