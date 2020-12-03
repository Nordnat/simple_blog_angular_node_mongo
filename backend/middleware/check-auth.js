const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, 'asdasdasdasdyf6326t6t6t6%E5rwyyy');
        next();
    } catch (error) {
        res.status(401).json({message: 'Auth failed!'})
    }

}
