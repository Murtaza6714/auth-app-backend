const Services = require("../shared/Services");
const { UserModel, ProductModel } = require("../../Models");
const { errorMessage } = require('../../Config')
const { Logger } = require('../../Utils')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');
const Config = require('../../Config')

class UserService extends Services {
  async userLogin(params) {
    try {
      Logger.info('Login Service Started for User having email - %s', params.email);
      const user = await UserModel.findOne({ email: params.email });
      if (!user)
        throw this.fail({ message: errorMessage.USER_NOT_FOUND, statusCode: 404 });

      const matchPassword = user.validatePassword(params.password);
      if (!matchPassword)
        throw this.fail({ message: errorMessage.PASSWORD_IS_INCORRECT, statusCode: 404 });
      const token = await user.generateLoginToken();

      Logger.info('Login Service completed for User having email - %s', params.email);
      return this.success({ statusCode: 200, token, data: (({_id, name, email}) => ({_id, name, email}))(user) });

    } catch (error) {
      Logger.error('Login Service Failed for User having email - %s with error -> %s', params.email, JSON.stringify(error));
      throw (error);
    }
  }

  async getAllUsers(params) {
    try {
      Logger.info('Fetch of users started ');
      let query = []
      query.push({$project: {password:0}})
      const data = await UserModel.aggregate(query)
      if(!data || !data.length) throw this.fail({ message: errorMessage.USER_NOT_FOUND, statusCode: 404 });

      Logger.info('Fetch of users completed');
      return this.success({ statusCode: 200, data, totalCounts: data.length });

    } catch (error) {
      Logger.error('Get All Users Service Failed with error -> %s', JSON.stringify(error));
      throw (error);
    }
  }

  async addUser(params) {
    try {
      Logger.info('Addition of user started for %d', params.contactNumber);
      const newId = new mongoose.Types.ObjectId();
      const salt = bcrypt.genSaltSync(10);
      params.password = bcrypt.hashSync(params.password, salt);
      const shopExists = await UserModel.findOne({email: params.email})
      if(shopExists) throw this.fail({ message: errorMessage.USER_ALREADY_EXISTS, statusCode: 404 });

      const insertedUser = await UserModel.findByIdAndUpdate(newId, { ...params }, { new: true, upsert: true });
      if (!insertedUser) throw this.fail({ message: errorMessage.USER_NOT_ADDED, statusCode: 404 });
      Logger.info('Addition of user completed for %d', params.contactNumber);
      return this.success({ statusCode: 201, data: insertedUser });
    } catch (error) {
      Logger.info(`Addition of user failed for %d ${params.contactNumber}.Error ${error}`);
      throw (error)
    }
  }

  async updateUser(id, params) {
    try {
      Logger.info('Update of user started for %d', id);
      const user = await UserModel.findByIdAndUpdate(id, { ...params }, { new: true });

      if (!user) throw this.fail({ message: errorMessage.USER_NOT_UPDATED, statusCode: 404 });
      Logger.info('Update of user completed for %d', id);
      return this.success({ statusCode: 202, data: user });
    } catch (error) {
      Logger.info(`Update of user failed for %d ${id}.Error ${error}`);
      throw error;
    }
  }

  async getAllShops() {
    try {
      const pipeline = [{$match: {type: Config.userType.SHOP}}, {$project: {password:0}}]
      const shops = await UserModel.aggregate(pipeline)
      if (!shops)
        throw this.fail({ message: errorMessage.SHOPS_NOT_FOUND, statusCode: 404 });

      return this.success({ statusCode: 200, data: shops, totalCounts: shops.length });
    } catch (error) {
      Logger.info(`fetching of shops failed.Error ${error}`);
      throw error;
    }
  }
  
  async deleteUser(id) {
    try {
      Logger.info('Delete of user started for %d', id);
      const deletedShop = await UserModel.findByIdAndDelete(id);

      if (!deletedShop) throw this.fail({ message: errorMessage.USER_NOT_DELETED, statusCode: 404 });
      Logger.info('Delete of user completed for %d', id);
      return this.success({ statusCode: 200 });
    } catch (error) {
      Logger.info(`Delete of shop failed for %d ${id}.Error ${error}`);
      throw error;
    }
  }

}

module.exports = new UserService();
