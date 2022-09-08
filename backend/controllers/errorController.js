"use strict";

const httpStatus = require("http-status-codes").StatusCodes;

module.exports = {
  logErrors: (error, req, res, next) => {
    console.error(error.stack);
    next(error);
  },

  pageNotFoundError: (req, res) => {
    let errorCode = httpStatus.NOT_FOUND;
    res.status(errorCode);
    res.json({
      message: "404: Not found!"
    });
  },

  internalServerError: (error, req, res) => {
    let errorCode = httpStatus.INTERNAL_SERVER_ERROR;
    console.log(`ERROR occurred: ${error.stack}`);
    res.status(errorCode);
    res.json({
      message: "Sorry, our application is experiencing a problem!"
    });
  }
};
