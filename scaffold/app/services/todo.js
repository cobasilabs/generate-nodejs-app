module.exports = `\
const Todo = require('../models/todo')

const todoService = {
  todoSearch,
  todoCreate,
  todoEdit,
  todoReplace,
  todoRemove
}

async function todoSearch (query, options) {
  const { count = false } = options
  const result = Todo.find(query, null, _getSearchOptions(options))
  if (count) {
    return {
      result,
      count: await Todo.countDocuments(query)
    }
  }
  return result
}

async function todoCreate (object) {
  return Todo.create(object)
}

async function todoEdit (id, churchObject) {
  const updated = await Todo.findByIdAndUpdate(
    id,
    { ...churchObject },
    { new: true }
  )
  if (updated) {
    return updated
  } else {
    throw Error('Could not find task to update')
  }
}

async function todoReplace (id, churchObject) {
  const updated = await Todo.findByIdAndUpdate(
    id,
    { ...churchObject },
    { new: true, overwrite: true }
  )
  if (updated) {
    return updated
  } else {
    throw Error('Could not find task to update')
  }
}

async function todoRemove (id) {
  const deleted = await Todo.findOneAndDelete({ _id: id })
  if (deleted) {
    return deleted
  } else {
    throw Error('Could not find task to delete')
  }
}

function _getSearchOptions ({ order, limit = 10, page, count = false }) {
  const options = {}
  if (page) {
    options.page = page < 1 ? 1 : page
    options.limit = limit
  }
  options.sort = order
  return options
}

module.exports = todoService
`
