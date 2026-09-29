const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

// Routerlar
const sparePartRoutes = require('./routes/sparePartRoutes');
const repairRoutes = require('./routes/repairRoutes');
const aiRoutes = require('./routes/aiRoutes');

// Middlewarelar
const errorHandler = require('./middlewares/errorHandler');
const notFound = require('./middlewares/notFound');

// Swagger
const setupSwagger = require('./docs/swagger');

const app = express();

// Xavfsizlik middlewarelari
app.use(helmet());
app.use(cors());

// Limit so'rovlar (DDoS himoyasi)
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 daqiqa
    max: 100 // Har bir IP uchun 15 daqiqada 100 ta so'rov
});
app.use('/api/', limiter);

// Loglash (dev rejimida)
app.use(morgan('dev'));

// JSON parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger ulanishi
setupSwagger(app);

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({ success: true, message: 'Server is running normally' });
});

// API Yo'nalishlar
app.use('/api/spare-parts', sparePartRoutes);
app.use('/api/repairs', repairRoutes);
app.use('/api/ai', aiRoutes);

// Topilmagan sahifalar uchun
app.use(notFound);

// Global Error Handler
app.use(errorHandler);

module.exports = app;
