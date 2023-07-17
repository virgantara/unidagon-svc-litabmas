'user strict';
var sql = require('../../db.js');

var unique = require("array-unique").immutable;
var async = require('async');
var await = require('await');
var Promise = require('promise');
// const Sentry = require('@sentry/node');
// Sentry.init({ dsn: 'https://52063217d36c4e509b0ee9d502fe321e@sentry.io/1775560' });

//Task object constructor
var Litabmas = function(task){
   
};

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}


function rekapPengabdian(dataQuery, callback){
    let params = []
    var txt = "SELECT count(*) as jumlah FROM litab_pengabdian p "
    txt += " JOIN simak_masterdosen d ON d.id = p.dosen_id "
    txt += " WHERE 1 "

    if(dataQuery.status){
        txt += " and p.status = ? "
        params.push(dataQuery.status)   
    }

    if(dataQuery.tahun){
        txt += " and tahun_pengabdian = ? "
        params.push(dataQuery.tahun)
    }

    sql.query(txt, params, function(err, res){
        if(err) {
            console.log(err)
            callback(err,null)
        }

        if(res[0].jumlah)
            callback(null, res[0].jumlah)
        else
            callback(null, 0)
    });
}

function rekapPenelitian(dataQuery, callback){

    let params = []
    var txt = "SELECT count(*) as jumlah FROM litab_penelitian p "
    txt += " JOIN simak_masterdosen d ON d.id = p.dosen_id "
    txt += " WHERE 1 "

    if(dataQuery.status){
        txt += " and p.status = ? "
        params.push(dataQuery.status)   
    }

    if(dataQuery.kode_prodi){
        txt += " and d.kode_prodi = ? "
        params.push(dataQuery.kode_prodi)   
    }

    if(dataQuery.tahun){
        txt += " and tahun_penelitian = ? "
        params.push(dataQuery.tahun)
    }
    sql.query(txt, params, function(err, res){
        if(err) {
            console.log(err)
            callback(err,null)
        }

        if(res[0].jumlah)
            callback(null, res[0].jumlah)
        else
            callback(null, 0)
    });
}

function countPenelitian(dataQuery, callback){
    var params = []

    var txt = "select tahun_penelitian as tahun, count(*) as jumlah from litab_penelitian WHERE status = 1"

    if (dataQuery.list_tahun){
        let years = dataQuery.list_tahun.toString()
        console.log(years)
        txt += " AND tahun_penelitian IN ("+years+") "
    }
    txt += " group by tahun_penelitian order by tahun_penelitian "

    sql.query(txt, params, function(err, res){
        if(err){
            console.log(err)
            callback(err, null)  
        } 

        callback(null, res)
    })
}

function countPengabdian(dataQuery, callback){
    var params = []

    var txt = "select tahun_pengabdian as tahun, count(*) as jumlah from litab_pengabdian WHERE status = 1 "


    txt += " group by tahun_pengabdian order by tahun_pengabdian "

    sql.query(txt, params, function(err, res){
        if(err) callback(err, null)

        callback(null, res)
    })
}

Litabmas.countPenelitian = countPenelitian
Litabmas.countPengabdian = countPengabdian
Litabmas.rekapPenelitian = rekapPenelitian
Litabmas.rekapPengabdian = rekapPengabdian

module.exports= Litabmas;