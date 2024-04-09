const express = require('express')
const multer = require('multer')
const path = require('path')
const createError = require('http-errors')
const fs = require('fs')

const app = express()

app.set('view engine', 'ejs')
app.set('views', __dirname + '/')

app.use(express.static('public'))

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage})

app.get('/', (req, res) => {
    const files = fs.readdirSync('uploads')
    res.render('index', { files})
})

app.get('/download/:fileName', (req, res) => {
    const fileName = req.params.fileName
    const filePath = 'uploads/' + fileName
    res.download(filePath, fileName)
})

app.post('/upload', upload.single('file'), (req, res, next) => {
    res.redirect('/')
})

app.use((req, res, next) => {
    next(createError(404))
})

app.use((err, req, res, next) => {
    console.error('err: ', err)
    const msg = err.status === 404 ? '404' : 'server error'
    res.status(err.status || 500).send(msg)
})

const port = 3000
app.listen(port, () => {
    console.log(`서버 ${port}에서 대기중`);
})