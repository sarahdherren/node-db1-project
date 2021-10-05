const router = require('express').Router()
const {
  checkAccountId,
  checkAccountNameUnique,
  checkAccountPayload
} = require('./accounts-middleware');

const Accounts = require('./accounts-model');


router.get('/', async (req, res, next) => {
 try {
   const accounts = await Accounts.getAll()
   res.status(200).json(accounts);
 } catch (error) {
   next(error)
 }
})

router.get('/:id', checkAccountId, async (req, res, next) => {
  try {
    res.status(200).json(req.account)
  } catch (error) {
    next(error)
  }
})

router.post('/', checkAccountPayload, checkAccountNameUnique, async (req, res, next) => {
  try {
   const newAccount = await Accounts.create({
    name: req.body.name.trim(),
    budget: req.body.budget
   })
   res.status(201).json(newAccount)
  } catch (error) {
   next(error) 
  }
})

router.put('/:id', checkAccountId, checkAccountPayload, async (req, res, next) => {
  const { id } = req.params
  try {
    const updateAccount = await Accounts.updateById(id, req.body)
    res.status(200).json(updateAccount)
  } catch (error) {
    next(error)
  }
});

router.delete('/:id', checkAccountId, async (req, res, next) => {
  const { id } = req.params
  try {
    await Accounts.deleteById(id)
    res.status(200).json({
      message: `account with id ${id} has successfully been deleted`
    })
  } catch (error) {
    next(error)
  }
})

router.use((error, req, res, next) => { // eslint-disable-line
  res.status(error.status || 500).json({
    message: error.message
  })
})

module.exports = router;
