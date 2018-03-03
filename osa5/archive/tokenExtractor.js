const tokenExtractor = (req, res, next) => {
    if (req.get('authorization'))
        req.token = req.get('authorization').split(' ').pop()

    next()
}

module.exports = tokenExtractor
