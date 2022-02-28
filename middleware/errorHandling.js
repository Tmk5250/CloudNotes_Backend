
const errorHandling = async (err,req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 in err) {
        console.error(err);
        return res.sendStatus(400); // Bad request
    }
    next();
};
module.exports = errorHandling;