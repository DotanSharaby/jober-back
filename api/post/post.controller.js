
module.exports = {
    getPost,
    getPosts,
    deletePost,
    addPost,
    updatePost
}




const postService = require('./post.service')



async function addPost(req, res) {
    const post = await postService.add(req.body)
    res.send(post)
}





async function getPost(req, res) {
    const post = await postService.getById(req.params.id)
    res.send(post)
}

async function getPosts(req, res) {
    const posts = await postService.query(req.query)
    res.send(posts)
}

async function deletePost(req, res) {
    await postService.remove(req.params.id)
    res.end()
}


async function updatePost(req, res) {
    const post = await PostService.update(req.body,req.params.id)
    res.send(post)
}
