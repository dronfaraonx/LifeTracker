const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors');
const userSession = require('./getUser');

const corsOptions = {
 origin: ['http://localhost:5173', 'http://87.228.25.111', 'https://talad.shop'],
 optionsSuccessStatus: 200,
 credentials: true, 
 methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

const serverConfig = (app) => {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cookieParser());
  app.use(morgan('dev'));
  app.use(cors(corsOptions));
  app.use(userSession);
};

module.exports = serverConfig;
