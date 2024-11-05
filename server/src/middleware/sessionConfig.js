const express = require('express');

const session = require('express-session'); // создать сессию
const FileStore = require('session-file-store')(session); // хранить сессию

const sessionConfig = {
  store: new FileStore(), // настройка файлового хранилища
  name: 'user_sid', // имя куки для хранения id сессии
  secret: process.env.SESSION_SECRET ?? 'tesasdffdsfsadf123123at', // для шифрования id сессии
  resave: false, // не пересохранять куку при каждом запросе
  saveUninitialized: true, // не создавать сессию без записи в req.session
  cookie: {
    maxAge: 1000 * 60 * 60 * 12, // срок действия куки в миллисекундах
    httpOnly: true,
  },
};

const sessionConfigs = (app) => {
  app.use(session(sessionConfig));
};

module.exports = sessionConfigs;
