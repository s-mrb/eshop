const express = require('express')
const multer = require('multer')
const path = require('path')
const uploadRouter = express.Router()

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'frontend/public/images')
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    )
  },
})

function checkFileType(file, cb) {
  const fileTypes = /jpg|jpeg|png/
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase())
  //   const mimeType = fileTypes.test(file.mimeType)

  if (extname) {
    return cb(null, true)
  } else {
    cb('Wrong File Type!!')
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  },
})

uploadRouter.post('/', upload.single('image'), (req, res) => {
  res.send(`/images/${req.file.filename}`)
})

module.exports = uploadRouter
