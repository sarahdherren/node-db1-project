const db = require('../../data/db-config');
const Accounts = require('./accounts-model');

exports.checkAccountPayload = (req, res, next) => {
  const { name, budget } = req.body;
 if(!name || !budget){
  res.status(400).json({
    message: "name and budget are required"
  })
 }else if(typeof name !== 'string'){
   res.status(400).json({
     message: "name of account must be a string"
   })
 } else if(100 < name.trim() < 3)
   {
   res.status(400).json({
     message: "name of account must be between 3 and 100"
   })
 } else if(typeof budget !== 'number'){
   res.status(400).json({
     message: "budget of account must be a number"
   })
 } else if(1000000 < budget < 0){
   res.status(400).json({
     message: "budget of account is too large or too small"
   })
 } else {
   next()
 }
}

exports.checkAccountNameUnique = async (req, res, next) => {
  const { name } = req.body;
  try{
    const exists = await db('accounts')
      .where('name', name.trim())
      .first()
    if(exists) {
      res.status(400).json({
        message: "that name is taken"
      })
    }
  } catch (error){
    next(error)
  }
}

exports.checkAccountId = async (req, res, next) => {
  const { id } = req.params;
  try {
    const validId = await Accounts.getById(id);
    if(!validId){
      res.status(404).json({
        message: "account not found"
      })
    }else {
      next();
    }
  } catch (error) {
    next(error)
  }
}

