const Accounts = require('./accounts-model');

exports.checkAccountPayload = (req, res, next) => {
  const { name, budget } = req.body;
  const error = {status: 400 };
 if(name === undefined || budget === undefined){
    error.message = "name and budget are required"
 }else if(typeof name !== 'string'){
     error.message = "name of account must be a string"
 } else if(name.trim().length < 3 || name.trim().length > 100)
   {
     error.message = "name of account must be between 3 and 100"
 } else if(typeof budget !== 'number' || isNaN(budget)){
     error.message = "budget of account must be a number"
 } else if(budget > 1000000 || budget < 0){
     error.message = "budget of account is too large or too small"
 } 
 if(error.message){
   next(error)
 } else {
   next()
 }
}

exports.checkAccountNameUnique = async (req, res, next) => {
  const { name } = req.body;
  try{
    const exists = await Accounts.getByName(name)
    if(exists) {
      res.status(400).json({
        message: "that name is taken"
      })
    } else {
      next()
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
      req.account = validId
      next();
    }
  } catch (error) {
    next(error)
  }
}

