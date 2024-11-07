const express = require('express');

const session = require('express-session'); // создать сессию
const FileStore = require('session-file-store')(session); // хранить сессию

const sessionConfig = {
  store: new FileStore(), // настройка файлового хранилища
  name: 'user_sid', // имя куки для хранения id сессии
  secret: process.env.SESSION_SECRET ?? 'tesasdffdsfsadf123123at', // для шифрования id сессии
  resave: false, // не пересохранять куку при каждом запросе
  saveUninitialized: false, // не создавать сессию без записи в req.session
  cookie: {
    // secure: false,
    maxAge: 1000 * 60 * 60 * 12, // срок действия куки в миллисекундах
    httpOnly: true,
    // secure: true, 
    // sameSite: 'none',

  },
};

const sessionConfigs = (app) => {
  app.set("trust proxy", 1);
  app.use(session(sessionConfig));
};

module.exports = sessionConfigs;
