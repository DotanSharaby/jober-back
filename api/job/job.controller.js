
module.exports = {
    getJob,
    getJobs,
    deleteJob,
    addJob,
    updateJob
}

const jobService = require('./job.service')

async function getJob(req, res) {
    const job = await jobService.getById(req.params.id)
    res.send(job)
}

async function getJobs(req, res) {
    const jobs = await jobService.query(req.query)
    res.send(jobs)
}

async function deleteJob(req, res) {
    await jobService.remove(req.params.id)
    res.end()
}

async function addJob(req, res) {
    const job = await jobService.add(req.body)
    res.send(job)
}

async function updateJob(req, res) {
    const job = await jobService.update(req.body,req.params.id)
    res.send(job)
}
