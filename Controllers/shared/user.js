const { Util } = require('../../Utils')
const { UserService } = require('../../Service/shared');


exports.loginController = async (req, res, next) => {
    try {
        Util.checkInputError(req);
        const body = req.body;
        const response = await UserService.userLogin(body);
        res.status(response.statusCode).json(response);
    } catch (error) {
        next(error);
    }
};

exports.getAllUsers = async (req, res, next) => {
  try {
      Util.checkInputError(req);
      const response = await UserService.getAllUsers(req.query);
      res.status(response.statusCode).json(response);
  } catch (error) {
      next(error);
  }
};

exports.addUser = async (req, res, next) => {
    try {
      Util.checkInputError(req);
      const response = await UserService.addUser(req.body);
      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  };
  
  exports.updateUser = async (req, res, next) => {
    try {
      Util.checkInputError(req);
      const response = await UserService.updateUser(req.params.id, req.body);
      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  };
  
  exports.getAllUsers = async (req, res, next) => {
    try {
      const response = await UserService.getAllUsers(req.body);
      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  };
  
  exports.deleteUser = async (req, res, next) => {
    try {
      const response = await UserService.deleteUser(req.params.id);
      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  };  
