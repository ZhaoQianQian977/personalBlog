var express = require('express');
var router = express.Router();
const querySql = require('../db/index')
const {
  PWD_SALT,
  PRIVATE_KEY,
  EXPIRESD
} = require('../utils/constant')
const {
  md5,
  upload
} = require('../utils/index')
const jwt = require('jsonwebtoken')
/* GET users listing. */
var multer = require('multer');
const {
  query
} = require('express');
// 注册接口
router.post('/addComment', async function (req, res, next) {
  let {
    content,
    article_id
  } = req.body;
  let {username}=req.user
  try {
    let user = await querySql('select head_img,nickname,id from user where username=?', [username])
    let {head_img,nickname,id}=user[0]
    console.log(user,content,id)
    let result = await querySql('insert into comment(user_id,article_id,cm_content,nickname,head_img,create_time) values (?,?,?,?,?,NOW())', [id,article_id,content,nickname,head_img])
    console.log(result)
    res.send({
        code: 0,
        msg: '发布成功'
      })
    
  } catch (error) {
    console.log(error);
    next(error)
  }
})

router.get('/commentList', async function (req, res, next) {
  let {article_id}=req.query
  console.log(article_id)
  try {
    let result = await querySql('select * from comment where article_id=?',[article_id])
    
    res.send({
        code: 0,
        msg: '查询成功',
        data:result
      })
    
  } catch (error) {
    console.log(error);
    next(error)
  }
})
module.exports = router;