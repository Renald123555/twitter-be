const pg = require('../config/db')
const _ = require('lodash')
const moment = require('moment')
const multer = require('multer')
const state = require('../config/state')

const savefile = process.env.SAVE_FILE_LOCATION

// http://localhost:5001/post/get-all-post (GET)
const getAllPost = async (req, res) => {
  const query = req.query
  let message = ''
  let error = ''
  let data = ''

  // let sqlQuery = ''
  // if (query.filter === 'DESC') {
  //   sqlQuery = 'SELECT p.id, user_id, image, text, p.created_at, p.reply_id, p.reply, p.likes, p.retweet, p.status, p.updated_at, u.username, u.name FROM posts p JOIN users u ON p.user_id = u.id WHERE p.status = 1 ORDER BY p.id DESC'
  // } else {
  //   sqlQuery = 'SELECT p.id, user_id, image, text, p.created_at, p.reply_id, p.reply, p.likes, p.retweet, p.status, p.updated_at, u.username, u.name FROM posts p JOIN users u ON p.user_id = u.id WHERE p.status = 1 ORDER BY p.id ASC'
  // }


  try {
    const result = [];
    state.post.forEach((data) => {
      state.user.forEach((user) => {
        if (data.user_id === user.id) {
          result.push({
            ...data,
            name: user.name,
            username: user.username
          })
        }
      })
    })
    if (query.filter === 'DESC') {
      result.sort(
        (a, b) =>
          (b.id - a.id)
      )
    } else {
      result.sort(
        (a, b) =>
          (a.id - b.id)
      )
    }
    if (!_.isEmpty(result)) {
      message = 'Success'
      data = result
    } else {
      message = 'Failed'
    }
  } catch (err) {
    console.log('err', err)
    error = err
    message = 'Failed'
  }

  const returnMessage = {
    message: message,
    error: error,
    data: data
  }
  res.json(returnMessage)
}

// http://localhost:5001/post/insert-new-post (POST)
// {
// "user_id": "1",
// "image": null,
// "text": "testing new post",
// "created_at": "2021-06-25 00:00:01",
// "reply_id": null
// }
const insertNewPost = async (req, res) => {
  const body = req.body
  const currentTimestamp = moment().format('YYYY-MM-DD HH:mm:ss')
  console.log("backend", body)
  let message = ''
  let error = ''
  const data = ''

  try {
    let replyId = body.reply_id
    if (!_.isEmpty(replyId)) {
      replyId = parseInt(replyId)
    }

    if (!_.isEmpty(body.image)) {
      const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, savefile)
        },
        filename: function (req, file, cb) {
          cb(null, body.user_id + '_' + file)
        }
      })

      const upload = multer({ storage: storage }).single('file')

      upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
          error = err
          message = 'Failed'
        } else if (err) {
          error = err
          message = 'Failed'
        } else {
          message = 'Success'
        }
      })
    }

    // const sql = await pg.connect()
    // const result = await sql.query('INSERT INTO posts (user_id, image, text, created_at, reply_id, likes, retweet, status) VALUES ($1, $2, $3, $4, $5, 0, 0, 1)', 
    // [body.user_id, body.image, body.text, currentTimestamp, replyId])
    // sql.release()
    state.post.push({
      id: state.post.length + 1,
      user_id: body.user_id,
      image: body.image,
      text: body.text,
      created_at: currentTimestamp,
      reply_id: replyId,
      likes: 0,
      retweet: 0,
      status: 1,
      updated_at: currentTimestamp,
      category: body.category,
      isAds: body.isAds,
      isCommercial: body.isCommercial,
      dateInput: body.dateInput
    })
    const result = "succes";
    if (!_.isEmpty(result)) {
      message = 'Success'
    } else {
      message = 'Failed'
    }
  } catch (err) {
    message = 'Failed'
    error = err
  }
  const returnMessage = {
    message: message,
    error: error,
    data: data
  }
  res.json(returnMessage)
}

// http://localhost:5001/post/update-post (PUT)
// {
// "id": "1",
// "image": null,
// "text": "testing new pos"
// }
const updatePost = async (req, res) => {
  const body = req.body
  const currentTimestamp = moment().format('YYYY-MM-DD HH:mm:ss')

  let message = ''
  let error = ''
  const data = ''

  try {
    let replyId = body.reply_id
    if (!_.isEmpty(replyId)) {
      replyId = parseInt(replyId)
    }

    // const sql = await pg.connect()
    // const result = await sql.query('UPDATE posts SET text = $1, image = $2, updated_at = $3 WHERE id = $4', [body.text, body.image, currentTimestamp, body.id])
    // sql.release()

    const result = "sucess";

    state.post.forEach((data) => {
      if (data.id === body.id) {
        data.text = body.text;
      }
    })
    if (!_.isEmpty(result)) {
      message = 'Success'
    } else {
      message = 'Failed'
    }
  } catch (err) {
    message = 'Failed'
    console.log('err ', err)
    error = err
  }
  const returnMessage = {
    message: message,
    error: error,
    data: data
  }
  res.json(returnMessage)
}

// http://localhost:5001/post/upload-image (POST)
const uploadImage = async (req, res) => {
  const body = req.body

  let message = ''
  let error = ''
  const data = ''

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, savefile)
    },
    filename: function (req, file, cb) {
      cb(null, body.user_id + '_' + file)
    }
  })

  const upload = multer({ storage: storage }).single('file')

  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      error = err
      message = 'Failed'
    } else if (err) {
      error = err
      message = 'Failed'
    } else {
      message = 'Success'
    }

    const returnMessage = {
      message: message,
      error: error,
      data: data
    }
    res.json(returnMessage)
  })
}

// http://localhost:5001/post/delete-post (PUT)
// {
// "id": "1"
// }
const deletePost = async (req, res) => {
  const body = req.body

  let message = ''
  let error = ''
  const data = ''

  try {
    // const sql = await pg.connect()
    // const result = await sql.query('UPDATE posts SET status = 0 WHERE id = $1', [body.id])
    // sql.release()

    const result = "success";

    state.post.splice(body.id - 1, 1, []);

    if (!_.isEmpty(result)) {
      message = 'Success'
    } else {
      message = 'Failed'
    }
  } catch (err) {
    message = 'Failed'
    console.log('err ', err)
    error = err
  }
  const returnMessage = {
    message: message,
    error: error,
    data: data
  }
  res.json(returnMessage)
}

module.exports = {
  getAllPost,
  insertNewPost,
  updatePost,
  deletePost,
  uploadImage
}
