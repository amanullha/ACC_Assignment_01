let counter = 0;

module.exports.viewCount = (req, res, next) => {

    counter++;
    console.log("viewCount : ", counter);

    next();

}