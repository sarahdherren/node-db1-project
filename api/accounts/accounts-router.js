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
  const { id } = req.params;
  try {
    const account = await Accounts.getById(id)
    res.status(200).json(account)
  } catch (error) {
    next(error)
  }
})

router.post('/', checkAccountNameUnique, checkAccountPayload, async (req, res, next) => {
  // DO YOUR MAGIC
})

router.put('/:id', checkAccountId, checkAccountPayload, async (req, res, next) => {
  // DO YOUR MAGIC
});

router.delete('/:id', checkAccountId, async (req, res, next) => {
  // DO YOUR MAGIC
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message
  })
})

module.exports = router;
