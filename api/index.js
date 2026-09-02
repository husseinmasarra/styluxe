const requestListener = require('../server.js');
module.exports = (req, res) => {
    return requestListener(req, res);
};
