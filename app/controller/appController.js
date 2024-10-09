'use strict';

var Litabmas = require('../model/appModel.js');

var response = require('../../res.js');

exports.listMasterProgramPenelitian = function(req, res) {
  Litabmas.listMasterProgramPenelitian(req.query, function(err, values) {
    if (err)
      res.send(err);

    response.ok(values, res);

  });
};

exports.listMasterSkema = function(req, res) {
  Litabmas.listMasterSkema(req.query, function(err, values) {
    if (err)
      res.send(err);

    response.ok(values, res);

  });
};

exports.syncDosenLitabmas = function(req, res) {
  Litabmas.syncDosenLitabmas(req.body,function(err, values) {    
    if (err){
      response.sqlErr(err, res);
    }
    else
      response.ok(values, res);
  });
};

exports.syncUser = function(req, res) {
  Litabmas.syncUser(req.body,function(err, values) {    
    if (err){
      response.sqlErr(err, res);
    }
    else
      response.ok(values, res);
  });
};

exports.rekapPengabdian = function(req, res) {
  Litabmas.rekapPengabdian(req.query, function(err, values) {
    if (err)
      res.send(err);

    response.ok(values, res);

  });
};

exports.rekapPenelitian = function(req, res) {
  Litabmas.rekapPenelitian(req.query, function(err, values) {
    if (err)
      res.send(err);

    response.ok(values, res);

  });
};

exports.countPenelitian = function(req, res) {
  Litabmas.countPenelitian(req.query, function(err, values) {
    if (err)
      res.send(err);

    response.ok(values, res);

  });
};

exports.countPengabdian = function(req, res) {
  Litabmas.countPengabdian(req.query, function(err, values) {
    if (err)
      res.send(err);

    response.ok(values, res);

  });
};
