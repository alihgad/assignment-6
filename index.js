import express from 'express'
import cors from 'cors'
import userRouter from './users/users.routes.js'
import postRouter from './posts/posts.routes.js'
import connection from './DB/connection.js'
import commentsRouter from './comments/comments.routes.js'
const app = express()
const port = 3000

connection()

app.use(cors())
app.use(express.json())
app.use('/users', userRouter)
app.use('/posts', postRouter)
app.use('/comments', commentsRouter)



app.get('/', (req, res) => res.send('Hello World!'))
app.use('*',(req, res, next) =>{res.json({msg : "not found 404" })})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))