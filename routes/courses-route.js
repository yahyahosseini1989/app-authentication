const express = require('express')
const auth = require('../middleware/auth');
const { getCourses, getCourse, insertCourse, updateCourse, deleteCourse } = require('../controller/courses-controller')
const router = express.Router()

router.use(auth)
router.get('', getCourses)
router.get('/:id', getCourse)
router.post('', insertCourse)
router.put('/:id', updateCourse)
router.delete('/:id', deleteCourse)

module.exports = router