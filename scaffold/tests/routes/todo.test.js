module.exports = `\
const mongoose = require('mongoose')
const supertest = require('supertest')
const Todo = require('../../app/models/todo')
const api = require('../../app/api')
const { MONGO_URL } = process.env
const request = supertest(api)

beforeAll(async () => {
  await mongoose.connect(\`\${MONGO_URL}Test\`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
})

afterEach(async () => { await mongoose.connection.db.dropDatabase() })
afterAll(async () => { await mongoose.connection.close() })

describe('todo route', () => {
  it('gets all the tasks', async () => {
    const mockedTodos = [
      { task: 'Study NodeJS' },
      { task: 'Work with NodeJS' },
    ]

    await Todo.insertMany(mockedTodos)
    const results = await request.get('/')

    expect(results.body.length).toBe(2)
    expect(results.body[0].task).toBe(mockedTodos[0].task)
    expect(results.body[1].task).toBe(mockedTodos[1].task)
  })

  it('creates a new task', async () => {
    const mockedTodo = { task: 'Sleep well' }
    const results = await request.post('/').send(mockedTodo)

    expect(results.body.task).toBe(mockedTodo.task)
  })

  it('patches an existing task', async () => {
    const oldTodo = { task: 'Eat healthy' }
    const newTodo = { task: 'Eat healthy everyday' }
    const oldTodoResult = await request.post('/').send(oldTodo)
    const oldTodoId = oldTodoResult.body._id
    const newTodoResult = await request.patch(\`/\${oldTodoId}\`).send(newTodo)

    expect(newTodoResult.body.task).toBe(newTodo.task)
  })

  it('deletes an existing task', async () => {
    const mockedTodo = { task: 'Read a book' }
    const addResult = await request.post('/').send(mockedTodo)
    const addId = addResult.body._id
    const delResult = await request.delete(\`/\${addId}\`)

    expect(delResult.status).toBe(200)
  })
})
`
