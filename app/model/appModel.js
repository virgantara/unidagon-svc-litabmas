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

function syncDosenLitabmas(dataPost, callback){
    let pMain = new Promise((resolve, reject)=>{
        let params = [dataPost.kode_unik]
        
        let txt = "SELECT niy, nidn_asli,nidn as kode_unik, nama_dosen FROM simak_masterdosen "
        txt += " WHERE nidn = ? "

        sql.query(txt,params,function(err, res){
            if(err)
                reject(err)
            else{
                if(res[0])
                    resolve(res[0])
                else
                    resolve(null)
            }
        })
    })

    pMain.then(hasil=>{
        //update user
        if(hasil){

            let params = [
                dataPost.nama, 
                dataPost.kode_fakultas, 
                dataPost.kode_prodi, 
                dataPost.jenjang,
                dataPost.nidn,
                dataPost.kode_feeder,
                dataPost.id_reg_ptk,
                dataPost.kode_unik
            ]
            let txt = "UPDATE simak_masterdosen SET nama_dosen = ?, kode_fakultas = ?, "
            txt += " kode_prodi = ?, kode_jenjang_studi = ?, nidn_asli = ?, kode_feeder = ?, "
            txt += " id_reg_ptk = ? WHERE nidn = ?  "
            sql.query(txt,params,function(err, res){
                if(err)
                    callback(err, null)
                else{
                    callback(null,'Nama Dosen ELITABMAS telah diupdate')
                }
            })
        }

        //user not exist
        else{
            let p1 = new Promise((resolve, reject)=>{
                let params = [
                    dataPost.kode_pt,
                    dataPost.kode_fakultas,
                    dataPost.kode_prodi,
                    dataPost.nik,
                    dataPost.nidn,
                    dataPost.kode_unik,
                    dataPost.niy,
                    dataPost.nama,
                    dataPost.jenjang,
                    dataPost.kode_feeder,
                    dataPost.id_reg_ptk
                ]

                let txt = "INSERT INTO simak_masterdosen (kode_pt, "
                txt += " kode_fakultas, kode_prodi, no_ktp_dosen, nidn_asli, "
                txt += " nidn, niy, nama_dosen, "
                txt += " kode_jenjang_studi, kode_feeder, id_reg_ptk) "
                txt += " VALUES (?,?,?,?,?,?,?,?,?,?,?) "
                sql.query(txt,params,function(err, res){
                    if(err)
                        reject(err)
                    else{
                        resolve(res)
                    }
                })  
            })

            p1.then(hsl=>{
                callback(null, 'Data Dosen telah ditambahkan ke ELITABMAS')
            }) 

            p1.catch(err=>{
                callback(err,null)
            })
        }
    })

    pMain.catch(err=>{
        callback(err, null)
    })

    
}


function syncUser(dataPost, callback){
    let pMain = new Promise((resolve, reject)=>{
        let params = [dataPost.kode_unik]
        
        let txt = "SELECT id, username, display_name, access_role, uuid FROM simak_users "
        txt += " WHERE nim = ?  "

        sql.query(txt,params,function(err, res){
            if(err){
                console.log(err)
                reject(err)
            }
            else{
                if(res[0])
                    resolve(res[0])
                else
                    resolve(null)
            }
        })
    })

    pMain.then(hasil=>{
        //update user
        if(hasil){
            if(dataPost.password_hash)
            {
                let params = [dataPost.kode_unik, dataPost.nama, dataPost.uuid, dataPost.password_hash, dataPost.kode_unik]
                let txt = "UPDATE simak_users SET username = ?, display_name = ?, uuid = ?, password_hash = ? "
                txt += " WHERE nim = ?  "
                sql.query(txt,params,function(err, res){
                    if(err){
                        console.log(err)
                        callback(err, null)
                    }
                    else{
                        callback(null,'Data user Dosen SSO updated')
                    }
                })
            }

            else 
            {
                let params = [dataPost.kode_unik, dataPost.nama, dataPost.uuid, dataPost.kode_unik]
                let txt = "UPDATE simak_users SET username = ?, display_name = ?, uuid = ? "
                txt += " WHERE nim = ?  "
                sql.query(txt,params,function(err, res){
                    if(err){
                        console.log(err)
                        callback(err, null)
                    }
                    else{
                        callback(null,'Data user Dosen SSO updated')
                    }
                })
            }
            
        }

        //user not exist
        else{
            let p1 = new Promise((resolve, reject)=>{
                let params = [
                    7,
                    dataPost.email,
                    dataPost.niy,
                    dataPost.uuid,
                    dataPost.nama,
                    'Dosen',
                    dataPost.kode_unik,
                    dataPost.kampus,
                    dataPost.kode_fakultas,
                    dataPost.kode_prodi,
                    dataPost.password_hash,
                    '10'
                ]
                let txt = "INSERT INTO simak_users (role_id, "
                txt += " email,username,uuid,display_name, access_role,nim,kampus, fakultas, "
                txt += " prodi, password_hash, status) "
                txt += " VALUES (?,?,?,?,?,?,?,?,?,?,?,?) "
                sql.query(txt,params,function(err, res){
                    if(err){
                        console.log(err)
                        reject(err)
                    }
                    else{
                        resolve(res)
                    }
                }) 
            })

            p1.then(hsl=>{
                let ptmp = new Promise((resolve,reject)=>{
                    let params = [dataPost.kode_unik]
                    let txt = "SELECT id, username, display_name, access_role, uuid FROM simak_users "
                    txt += " WHERE nim = ? ORDER BY id DESC LIMIT 1  "

                    sql.query(txt,params,function(err, res){
                        if(err){
                            console.log(err)
                            reject(err)
                        }
                        else{
                            if(res[0])
                                resolve(res[0])
                            else
                                resolve(null)
                        }
                    })
                })

                ptmp.then(tmp=>{
                    
                    if(tmp){
                        let params = [
                            'Dosen',
                            tmp.id
                        ]

                        let txt = "INSERT INTO auth_assignment (item_name, user_id) "
                        txt += " VALUES (?,?) "
                        sql.query(txt,params,function(err, res){
                            if(err){
                                console.log(err)
                                callback(err,null)
                            }
                            else{
                                callback(null,'Data Auth Dosen inserted')
                            }
                        })     
                    }

                    else{
                        callback(null,'user not found')
                    }
                    
                })

                ptmp.catch(err=>{
                    console.log(err)
                    callback(err,null)
                })
            }) 

            p1.catch(err=>{
                console.log(err)
                callback(err,null)
            })
        }
    })

    pMain.catch(err=>{
        console.log(err)
        callback(err, null)
    })

    
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

Litabmas.syncDosenLitabmas = syncDosenLitabmas
Litabmas.syncUser = syncUser
Litabmas.countPenelitian = countPenelitian
Litabmas.countPengabdian = countPengabdian
Litabmas.rekapPenelitian = rekapPenelitian
Litabmas.rekapPengabdian = rekapPengabdian

module.exports= Litabmas;