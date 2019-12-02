const express = require('express')
const requireAuth = require('../../middlewares/requireAuth.middleware')

const { getJob, deleteJob, getJobs, updateJob, addJob } = require('./job.controller')
const { addPost } = require('../post/post.controller')
const router = express.Router()

router.get('/', getJobs);
router.get('/:id', getJob);

router.post('/post', addPost);

router.post('/edit', addJob);
router.put('/edit/:id', updateJob);
router.delete('/:id',  deleteJob); //requireAuth,

module.exports = router