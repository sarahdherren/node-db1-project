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

const getByName = name => {
  return db('accounts')
    .where('name', name)
    .first();
};

const create = async account => {
  const [id] = await db('accounts')
    .insert(account)
  return getById(id)
}

const updateById = async (id, account) => {
  await db('accounts')
    .update(account)
    .where('id', id)
  return getById(id)
}

const deleteById = id => {
  return db('accounts')
    .where('id', id)
    .delete()
}

module.exports = {
  getAll,
  getById,
  getByName,
  create,
  updateById,
  deleteById,
}
