const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const token = bearer[1];

        jwt.verify(token, '5489d9845m', (err, authData) => {
            if (err) {
                res.sendStatus(403);
            } else {
                next();
            }
        });
    }
}