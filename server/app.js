/**
 * @module app
 * @description Expressの設定ファイル，ほぼ自動生成されたデフォルトのままだが，小島がCORSの設定を追加した．
 * 
 * @since 2024/04/28
 * @author 小島佑太
 * 
 * @version 1.0
 */

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const dotenv = require('dotenv');

dotenv.config({path: path.resolve(__dirname, '..', '.env')});

//ここから小島が追加
const cors = require('cors');
const vue_url = process.env.VUE_APP_API_URL || 'http://localhost:8080';
const express_url = process.env.EXPRESS_APP_API_URL || 'http://localhost:3000';
console.log("vue url: "+vue_url);
console.log("express url: "+express_url);
const corsOptions = {
	origin: vue_url,
	credentials: true,
	optionsSuccessStatus: 200
};
//ここまで小島が追加

const sequelize = require('./db');

sequelize.authenticate().then(() => {
  console.log('Database connection has been established successfully.');
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var stocksRouter = require('./components/processingLayer/C6_searchSortProcessing/getItem');

var ActiveListingRouter = require('./components/processingLayer/C3_orderProcessing/activelisting');
var PastListingRouter = require('./components/processingLayer/C3_orderProcessing/PastListing');
var PurchasePastRouter = require('./components/processingLayer/C3_orderProcessing/PurchasePast');
var WishListingRouter = require('./components/processingLayer/C3_orderProcessing/WishListing');

var authenticateUserRouter = require('./components/processingLayer/C2_authenticationProcessing/authenticateUser');
var registerUserRouter = require('./components/processingLayer/C2_authenticationProcessing/registerUser');
var getSuggestedTextbooksRouter = require('./components/processingLayer/C5_scombIntegrationProcessing/getSuggestedTextbooks');
var initSuggestedTextbookPullDownRouter = require('./components/processingLayer/C5_scombIntegrationProcessing/initSuggestedTextbookPullDown');
var tmpRecieverRouter = require('./components/processingLayer/C5_scombIntegrationProcessing/tmpReciever');
var debugRouter = require('./components/processingLayer/C4_chatProcessing/debug');
var cancelPurchaseRouter = require('./components/processingLayer/C3_orderProcessing/cancelPurchase')
var chatRouter = require('./components/processingLayer/C4_chatProcessing/chatControl');
var listing = require('./components/processingLayer/C3_orderProcessing/listing');

var cancelListingRouter = require('./components/processingLayer/C3_orderProcessing/cancelListing');

//須藤追加
var getItemInfoRouter = 
require('./components/processingLayer/C3_orderProcessing/getItemInfo');
var getItemStateRouter = 
require('./components/processingLayer/C3_orderProcessing/getItemState');
//ここまで

var app = express();
//ここから小島が追加
app.use(cors(corsOptions));
//ここまで小島が追加


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '..','client/dist'))); //! サーバー用に追加

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/stocks', stocksRouter);
app.use('/', authenticateUserRouter);
app.use('/', registerUserRouter);
app.use('/getSuggestedTextbooks', getSuggestedTextbooksRouter);
app.use('/tmpReciever', tmpRecieverRouter);
app.use('/initSuggestedTextbookPullDown', initSuggestedTextbookPullDownRouter);
app.use('/debug', debugRouter);
app.use('/cancelPurchase', cancelPurchaseRouter);
app.use('/chatPage', chatRouter);
app.use('/listing', listing);

//須藤追加
app.use('/getItemInfo', getItemInfoRouter);
app.use('/getItemState', getItemStateRouter);
//ここまで

app.use('/',ActiveListingRouter);
app.use('/',PastListingRouter);
app.use('/',PurchasePastRouter);
app.use('/',WishListingRouter);

app.use('/cancelListing', cancelListingRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

  	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

console.log("app.js done");

module.exports = app;