const crypto = require('crypto')
var multer=require('multer')
const path=require('path')
const fs=require('fs')

function md5(s) {
  return crypto.createHash('md5').update(String(s)).digest('hex')
}
let upload = multer({
  storage: multer.diskStorage({
    // 设置⽂件存储位置
    destination: function (req, file, cb) {
      let date = new Date()
      let year = date.getFullYear()
      let month = (date.getMonth() + 1).toString().padStart(2, '0')
      let day = date.getDate()
      let dir = path.join(__dirname, '../public/uploads/' + year + month +
        day)

      // 判断⽬录是否存在，没有则创建
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, {
          recursive: true
        })
      }

      
      cb(null, dir)
    },
    // 设置⽂件名称
    filename: function (req, file, cb) {
      let fileName = Date.now() + path.extname(file.originalname)
      // fileName就是上传⽂件的⽂件名
      cb(null, fileName)
    }
  })
})
module.exports = {
  md5,
  upload
}