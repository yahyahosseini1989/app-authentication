require('dotenv').config()

const Joi = require('joi');
const UsersModel = require('../models/users-model');
const _ = require('lodash')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const trycatchHandler = require('../utilities/trycatch_handler');

const register = trycatchHandler(async (req, res, next) => {
	const schema = {
		username: Joi.string().min(3).max(50).required(),
		first_name: Joi.string().min(3).max(50).required(),
		last_name: Joi.string().min(3).max(50).required(),
		email: Joi.string().email().required(),
		password: Joi.string().length(8).required(),
	}
	const validateResult = Joi.object(schema).validate(req.body)
	if (validateResult.error)
		return res.send(validateResult.error.details[0].message)

	const isExisted = await UsersModel.getUserByEmail(req.body.email)
	if (isExisted) return res.status(400).send('user allreadey registered!')

	const hashPassword = await bcrypt.hash(req.body.password, 10)
	await UsersModel.insertUser(req.body.username, req.body.email, hashPassword, req.body.first_name, req.body.last_name)
	const newUser = await UsersModel.getUserByEmail(req.body.email)
	const token =	jwt.sign({id: user.id}, process.env.SECRET_KEY)
	res.header('token', token).send(_.pick(newUser, ['id, username', 'email', 'first_name', 'last_name']))
})

const login = trycatchHandler(async (req, res, next) => {
	const schema = {
		email: Joi.string().email().required(),
		password: Joi.string().length(8).required(),
	}
	const validateResult = Joi.object(schema).validate(req.body)
	if (validateResult.error)
		return res.send(validateResult.error.details[0].message)

	const user = await UsersModel.getUserByEmail(req.body.email)
	if (!user) return res.status(400).send(`email or password is invalid`)
	const isValidPass = await bcrypt.compare(req.body.password, user.password)
	if (!isValidPass) return res.status(400).send(`email or password is invalid`)

	const token =	jwt.sign({id: user.id}, process.env.SECRET_KEY)
	const userInfo = _.omit(user, ['password']);
	res.header('token', token).send({token, userInfo})
})

module.exports = { register, login }