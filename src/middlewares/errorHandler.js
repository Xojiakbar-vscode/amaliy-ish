const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    
    // Sequelize unique constraint xatoligi
    if (err.name === 'SequelizeUniqueConstraintError') {
        return res.status(409).json({
            success: false,
            message: 'Bu ma\'lumot allaqachon mavjud'
        });
    }

    // Default error
    const statusCode = err.status || 500;
    res.status(statusCode).json({
        success: false,
        message: err.message || 'Internal Server Error'
    });
};

module.exports = errorHandler;
