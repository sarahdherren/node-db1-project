const db = require('../../data/db-config');

const getAll = () => {
  return db('accounts')
    .select('id', 'name', 'budget')
}

const getById = id => {
  return db('accounts')
    .where('id', id)
    .first()
}

const create = account => {
  const 
    .insert(account)
}

const updateById = (id, account) => {
  // DO YOUR MAGIC
}

const deleteById = id => {
  // DO YOUR MAGIC
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
