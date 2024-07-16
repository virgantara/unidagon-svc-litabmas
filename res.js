'use strict';

exports.ok = function(values, res) {
  var data = {
      'status': 200,
      'values': values
  };
  res.json(data);
  res.end();
};

exports.sqlErr = function(values, res) {
  var data = {
      'status': 500,
      'values': {
        'code' : values.errno,
        'sql' : values.sql,
        'message' : values.sqlMessage
      }
  };
  // res.writeHead(500);
  res.json(data);
  res.end();
};