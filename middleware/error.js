const winston = require('winston');
module.exports = function(err, req, res, next){
  const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
      //
      // - Write to all logs with level `info` and below to `combined.log` 
      // - Write all logs error (and below) to `error.log`.
      //
      new winston.transports.File({ filename: 'error.log', level: 'info' }),
    ]
  });
  logger.add(new winston.transports.Console());
  logger.log({level: 'info', message: err.message});
  //  console.log(err.message);
    res.status(500).send(JSON.stringify('an error has occured:  ' +  err.message));
};
