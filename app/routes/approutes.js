'use strict';
module.exports = function(app) {
  var todoList = require('../controller/appController');

  app.route('/litab/dosen/sync')
    .post(todoList.syncDosenLitabmas);

  app.route('/litab/user/sync')
    .post(todoList.syncUser);

  // todoList Routes
  app.route('/litab/master/programpenelitian')
    .get(todoList.listMasterProgramPenelitian);

  app.route('/litab/master/skema')
    .get(todoList.listMasterSkema);

  app.route('/litab/rekap/pengabdian')
    .get(todoList.rekapPengabdian);
    
  app.route('/litab/rekap/penelitian')
    .get(todoList.rekapPenelitian);

  app.route('/litab/count/penelitian')
    .get(todoList.countPenelitian);

  app.route('/litab/count/pengabdian')
    .get(todoList.countPengabdian);


};