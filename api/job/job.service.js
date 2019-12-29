
const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById,
    remove,
    update,
    add
}

async function query() {
    const collection = await dbService.getCollection('job')
    try {
        const jobs = await collection.find().toArray();
        // jobs = jobs.map(job => {
        //     if (!job.applies) job.applies = []
        //     if (job.applies.length > 0) {
        //         job.applies = job.applies.map(apply => {
        //             var min = job.createdAt + 240000
        //             apply.sentAt = Math.floor(Math.random() * (Date.now - min)) + min
        //             return apply
        //         })
        //     }
        //     return job
        // })
        return jobs
    } catch (err) {
        console.log('ERROR: cannot find jobs')
        throw err;
    }
}

async function getById(jobId) {
    const collection = await dbService.getCollection('job')
    try {
        const job = await collection.findOne({ "_id": ObjectId(jobId) })
        return job
    } catch (err) {
        console.log(`ERROR: while finding job ${jobId}`)
        throw err;
    }
}

async function remove(jobId) {
    const collection = await dbService.getCollection('job')
    try {
        await collection.deleteOne({ "_id": ObjectId(jobId) })
    } catch (err) {
        console.log(`ERROR: cannot remove job ${jobId}`)
        throw err;
    }
}

async function update(job, jobId) {
    const collection = await dbService.getCollection('job')
    try {
        let updatedJob = { ...job }
        delete updatedJob._id
        await collection.replaceOne({ "_id": ObjectId(job._id) }, { $set: updatedJob })
        return job
    } catch (err) {
        console.log(`ERROR: cannot update job ${jobId}`)
        throw err;
    }
}

async function add(job) {
    const collection = await dbService.getCollection('job')
    try {
        await collection.insertOne(job);
        return job;
    } catch (err) {
        console.log(`ERROR: cannot insert job`)
        throw err;
    }
}
