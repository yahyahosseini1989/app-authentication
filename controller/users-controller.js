const Joi = require('joi');
const UsersModel = require('../models/users-model');
const _ = require('lodash')
const bcrypt = require('bcrypt')

const register = async (req, res, next) => {
	const schema = {
		username: Joi.string().min(3).max(50).required(),
		first_name: Joi.string().min(3).max(50).required(),
		last_name: Joi.string().min(3).max(50).required(),
		email: Joi.string().email().required(),
		password: Joi.string().length(8).required(),
	}
	console.log('req.body :>> ', req.body);
	const validateResult = Joi.object(schema).validate(req.body)
	if (validateResult.error)
		return res.send(validateResult.error.details[0].message)

	const isExisted = await UsersModel.getUserByEmail(req.body.email)
	if (isExisted) return res.status(400).send('user allreadey registered!')

	const hashPassword = await bcrypt.hash(req.body.password, 10)
	await UsersModel.insertUser(req.body.username, req.body.email, hashPassword, req.body.first_name, req.body.last_name)
	const newUser = await UsersModel.getUserByEmail(req.body.email)
	console.log('newUser :>> ', newUser);
	res.send(_.pick(newUser, ['id, username', 'email', 'first_name', 'last_name']))
}

const login = async (req, res, next) => { }

module.exports = { register, login }