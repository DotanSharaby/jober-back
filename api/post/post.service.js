
const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById,
    remove,
    update,
    add
}

async function query(filterBy = {}) {
    const criteria = _buildCriteria(filterBy)
    const collection = await dbService.getCollection('job')
    try {
        const jobs = await collection.find(criteria).toArray();
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
        await collection.remove({ "_id": ObjectId(jobId) })
    } catch (err) {
        console.log(`ERROR: cannot remove job ${jobId}`)
        throw err;
    }
}

async function update(job, jobId) {
    const collection = await dbService.getCollection('job')
    try {
        console.log('job._id', jobId);
        await collection.replaceOne({ "_id": ObjectId(jobId) }, { $set: job })
        return job
    } catch (err) {
        console.log(`ERROR: cannot update job ${jobId}`)
        throw err;
    }
}

async function add(post) {
    const collection = await dbService.getCollection('job')

    try {
        await collection.updateOne({ "_id": ObjectId(post.jobId) },
            { $push: { posts: post } })
        return post;

    } catch (err) {
        console.log(`ERROR: cannot insert post`)
        throw err;
    }
}

function _buildCriteria(filterBy) {
    const criteria = {};
    if (filterBy.txt) {
        criteria.desc = filterBy.txt
    }
    return criteria;
}