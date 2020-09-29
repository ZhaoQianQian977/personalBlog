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
router.post('/register', async function (req, res, next) {
  let {
    username,
    password,
    nickname
  } = req.body;
  try {
    let user = await querySql('select * from user where username=?', [username])
    // console.log('user',user)
    if (!user || user.length == 0) {
      password = md5(`${password}${PWD_SALT}`)
      // console.log(password)
      let result = await querySql('insert into user(username,password,nickname) value(?,?,?)', [username, password, nickname])
      console.log(result)
      res.send({
        code: 0,
        msg: '注册成功'
      })
    } else {
      res.send({
        code: -1,
        msg: '该账号已存在'
      })
    }
  } catch (error) {
    console.log(error);
    next(error)
  }

})

// 登录接口
router.post('/login', async (req, res, next) => {
  let {
    username,
    password
  } = req.body;
  try {
    let user = await querySql('select * from user where username=?', [username])
    console.log('user', user)
    if (!user || user.length == 0) {
      res.send({
        code: -1,
        msg: '该账号不存在'
      })

    } else {
      password = md5(`${password}${PWD_SALT}`)
      // console.log(password)
      let result = await querySql('select * from user where username=? and password=?', [username, password])
      if (!result || result.length === 0) {
        res.send({
          code: -1,
          msg: '账号或者密码不正确'
        })
        res.send({
          code: 0,
          msg: '登录成功'
        })
      } else {
        let token = jwt.sign({
          username
        }, PRIVATE_KEY, {
          expiresIn: EXPIRESD
        });
        res.send({
          code: 0,
          msg: '登陆成功',
          token: token
        })
      }
      // console.log(result)
    }
  } catch (error) {
    console.log(error);
    next(error)
  }
})

//用户信息
router.get('/info', async function (req, res, next) {
  // console.log(req.user)

  try {
    let usernames = req.user.username
    let userinfo = await querySql('select * from user where username=?', [usernames])
    console.log(userinfo[0])
    const {
      username,
      nickname,
      head_img
    } = userinfo[0]
    let data = {
      username: username,
      nickname: nickname,
      head_img: head_img
    }
    res.send({
      code: 0,
      data: data
    })
  } catch (error) {
    console.log(error);
    next(error)
  }
})

//头像上传
router.post('/upload', upload.single('head_img'), async (req, res, next) => {
  let imgPath = req.file.path.split('public')[1]
  let imgUrl = 'http://127.0.0.1:3000' + imgPath
  res.send({
    code: 0,
    msg: '上传成功',
    data: imgUrl
  })
})

//用户信息更新
router.post('/updata', async (req, res, next) => {
  console.log(req.body)
  try {
    const {
      nickname,
      head_img
    } = req.body;
    const {
      username
    } = req.user
    let result = await querySql('update user set nickname=?, head_img=? where username=?', [nickname, head_img, username])
    res.send({
      code: 0,
      msg: '更新成功'
    })
  } catch (error) {
    console.log(error);
    next(error)
  }
})

// 新增博客
router.post('/addBlog', async (req, res, next) => {

  try {
    let {
      title,
      content
    } = req.body
    let {
      username
    } = req.user
    // console.log(username,title,content)
    let result = await querySql('select id from user where username=?', [username]);
    let user_id = result[0].id;
    await querySql('insert into article(title,content,user_id,create_time,state) values(?,?,?,NOW(),0)', [title, content, user_id])
    res.send({
      code: 0,
      msg: '创建成功'
    })
    // console.log(id)
  } catch (error) {
    console.log(error);
    next(error)
  }
})

//我的博客查询
router.get('/blogList', async (req, res, next) => {
  try {
    let {
      username
    } = req.user
    // console.log(username,title,content)
    let user = await querySql('select id from user where username=?', [username]);
    let user_id = user[0].id
    let sql = 'select id,title,content,DATE_FORMAT(create_time,"%Y-%m-%d %H:%i:%s") AS create_time from article where user_id = ?'
    let result = await querySql(sql, [user_id])
    res.send({
      code: 0,
      msg: '获取成功',
      data: result
    })
  } catch (error) {
    console.log(error);
    next(error)
  }
})

//全部博客查询
router.get('/allblog', async (req, res, next) => {
  try {
    let sql = 'select id,title,DATE_FORMAT(create_time,"%Y-%m-%d %H:%i:%s")as create_time from article';
    let result = await querySql(sql);
    res.send({
      code: 0,
      msg: '查询成功',
      data: result
    })
  } catch (error) {
    console.log(error);
    next(error)
  }
})
//博客详情查询
router.get('/detail', async (req, res, next) => {
  try {
    let article_id = req.query.article_id
    console.log(req.query, '///')
    let sql = 'select title,content,DATE_FORMAT(create_time,"%Y-%m-%d %H:%i:%s")as create_time from article where id=?';
    let result = await querySql(sql, [article_id]);
    console.log(result)
    res.send({
      code: 0,
      msg: '查询成功',
      data: result[0]
    })
  } catch (error) {
    console.log(error);
    next(error)
  }
})

//博客编辑
router.post('/updateArticle', async (req, res, next) => {
  try {
    let {article_id,title,content} = req.body
    let sql = 'update article set title=?,content=? where id=?';
    let result = await querySql(sql, [title,content,article_id]);
    console.log(result)
    res.send({
      code: 0,
      msg: '更新成功',
      data:null
    })
  } catch (error) {
    console.log(error);
    next(error)
  }
})

//博客删除
router.post('/delete', async (req, res, next) => {
  try {
    let {username}=req.user
    let {id} = req.body
    let sql = 'select id from user where username=?';
    let user = await querySql(sql, [username]);
    let user_id=user[0].id;
    let sqls = 'delete from article where user_id=? and id=?';
    let result = await querySql(sqls, [user_id,id]);
    console.log(id,user_id)
    res.send({
      code: 0,
      msg: '删除成功',
      data:null
    })
  } catch (error) {
    console.log(error);
    next(error)
  }
})
module.exports = router;