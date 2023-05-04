// load env-vars
require('dotenv').config();

// requiring dependencies
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// initialize express
const app = express();

// requiring routers

const inforRouter = require('./routes/inforRouter');
const bloodStorageRouter = require('./routes/bloodStorageRouter');
const commentRouter = require('./routes/commentRouter');
const staffRouter = require('./routes/staffRouter');
const notificationRouter = require('./routes/notificationRouter');
const postRouter = require('./routes/postRouter');
const bookingRouter = require('./routes/bookingRouter');
const donateRouter = require('./routes/donateRouter');
const cashFlowRouter = require('./routes/cashFlowRouter');
const adminRouter = require('./routes/adminRouter');
const bloodDonateRouter = require('./routes/bloodDonateRouter');



// requiring middlewares
const errorMiddleware = require('./middleware/Error');

// require db configs
const connectToDb = require('./config/db');

// require cloudinary configs
const cloudinary = require('./config/cloudinary');

// uncaught exception
process.on('uncaughtException', (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Server shutting down due to uncaught exception`);
  process.exit(1);
});

// connect to db
connectToDb();

// using middlewares
app.use(
  cors({
    origin: [/netlify\.app$/, /localhost:\d{4}$/],
    credentials: true,
  })
);
app.use(express.json({ limit: '20mb' }));
app.use(cookieParser());

// basic api route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API service running ',
  });
});

// using routers
app.use('/api/infors', inforRouter);

app.use('/api/bloodStorages', bloodStorageRouter);
app.use('/api/notifications', notificationRouter);
app.use('/api/bookings', bookingRouter);
app.use('/api/posts', postRouter);
app.use('/api/comments', commentRouter);
app.use('/api/staffs', staffRouter);
app.use('/api/donates', donateRouter);
app.use('/api/bloodDonates', bloodDonateRouter);
app.use('/api/cashFlows', cashFlowRouter);

app.use('/api/admin', adminRouter);



// using other middlewares
app.use(errorMiddleware);

// starting server
const server = app.listen(process.env.PORT || 5000, () => {
  console.log('Server running');
});

// unhandled promise rejection
process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Server shutting down due to unhandled promise rejection`);
  server.close(() => {
    process.exit(1);
  });
});
