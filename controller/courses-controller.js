const CoursesModel = require('../models/courses-model');
const trycatchHandler = require('../utilities/trycatch_handler');

// read all courses
const getCourses = trycatchHandler((req, res) => {
	CoursesModel.getCourses(req.params.id).then(result => {
		console.log('getCourses :>> ', result);
		res.send(result) // courses
	})
})

// read course by id
const getCourse = trycatchHandler(async (req, res) => {
	CoursesModel.getCourse(req.params.id).then((result) => {
		if (!result) return res.status(404).send('course with given id not found.')
		res.send(result) // course
	})
})

// create course by title
const insertCourse = trycatchHandler((req, res) => {
	console.log('req.params :>> ', req.body);
	const title = req?.body?.Title
	if (!title || title.length < 3) return res.status(400).send('parameter title with 3 syntax is required.')
	CoursesModel.insertCourse(title).then((result) => {
		res.send(result)
	})
})

// read course by id & edit course by title
const updateCourse = trycatchHandler(async (req, res) => {
	CoursesModel.getCourse(req.params.id).then((result) => {
		if (!result) return res.status(404).send('course with given id not found.')
	})

	const title = req?.body?.Title
	if (!title || title.length < 3) return res.status(400).send('parameter title with 3 syntax is required.')
	CoursesModel.updateCourse(req.params.id, title).then((result) => {
		res.status(200).send('successfully edited')
	})
})

// delete course by id
const deleteCourse = trycatchHandler(async (req, res) => {
	CoursesModel.getCourse(req.params.id).then((result) => {
		if (!result) return res.status(404).send('course with given id not found.')
		return res.send(result)
	})

	CoursesModel.deleteCourse(req.params.id).then((result) => {
		res.send(result)
	})
})

module.exports = {
	getCourses,
	getCourse,
	insertCourse,
	updateCourse,
	deleteCourse,
}