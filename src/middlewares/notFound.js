const notFound = (req, res, next) => {
    res.status(404).json({
        success: false,
        message: 'Bunday sahifa yoki API endpoint topilmadi (404 Not Found)'
    });
};

module.exports = notFound;
