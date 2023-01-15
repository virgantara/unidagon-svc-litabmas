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
    var txt = "SELECT pr.nama_prodi, count(*) as jumlah FROM litab_pengabdian p "
    txt += " JOIN simak_masterdosen d ON d.id = p.dosen_id "
    txt += " JOIN simak_masterprogramstudi pr ON pr.kode_prodi = d.kode_prodi "
    
    txt += " WHERE 1 "

    if(dataQuery.status){
        txt += " and p.status = ? "
        params.push(dataQuery.status)   
    }

    if(dataQuery.kode_fakultas){
        txt += " and pr.kode_fakultas = ? "
        params.push(dataQuery.kode_fakultas)   
    }

    if(dataQuery.tahun){
        txt += " and tahun_pengabdian = ? "
        params.push(dataQuery.tahun)
    }

    txt += " GROUP BY pr.nama_prodi ORDER BY jumlah DESC "
    sql.query(txt, params, function(err, res){
        if(err) {
            console.log(err)
            callback(err,null)
        }

        callback(null, res)
    });
}

function rekapPenelitian(dataQuery, callback){
    let params = []
    var txt = "SELECT pr.nama_prodi, count(*) as jumlah FROM litab_penelitian p "
    txt += " JOIN simak_masterdosen d ON d.id = p.dosen_id "
    txt += " JOIN simak_masterprogramstudi pr ON pr.kode_prodi = d.kode_prodi "
    txt += " WHERE 1 "

    if(dataQuery.status){
        txt += " and p.status = ? "
        params.push(dataQuery.status)   
    }

    if(dataQuery.kode_fakultas){
        txt += " and pr.kode_fakultas = ? "
        params.push(dataQuery.kode_fakultas)   
    }

    if(dataQuery.tahun){
        txt += " and tahun_penelitian = ? "
        params.push(dataQuery.tahun)
    }

    txt += " GROUP BY pr.nama_prodi ORDER BY jumlah DESC "
    sql.query(txt, params, function(err, res){
        if(err) {
            console.log(err)
            callback(err,null)
        }

        callback(null, res)
    });
}

function countPenelitian(dataQuery, callback){
    var params = []

    var txt = "select tahun_penelitian as tahun, count(*) as jumlah from litab_penelitian WHERE status = 1"

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