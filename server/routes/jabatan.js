const express = require("express");
const db = require("../config/db");
const router = express.Router();

router.get("/", (req, res, next) => {
  var sql = "SELECT * from jabatan";
  db.query(sql, (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      res.status(200).json({
        error: false,
        message: "Data Ditemukan",
        data: result,
      });
    } else if (result.length === 0){
      res.status(200).json({
        error: true,
        message: "Data Tidak Ditemukan",
      });
    } 
  });
});

router.get("/:id_jabatan", (req, res, next) => {
  const id_jabatan = req.params.id_jabatan;
  var sql =
    "SELECT * from jabatan WHERE id_jabatan=" +
    id_jabatan;
  db.query(sql, (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      res.status(200).json({
        error: false,
        message: "Data Ditemukan",
        data: result,
      });
    }else {
      res.status(200).json({
        error: true,
        message: "Id jabatan Tidak Ditemukan",
      });
    }
  });
});

router.post("/", (req, res, next) => {
  const nama_jabatan = req.body.nama_jabatan;
  var sql =
    "INSERT INTO jabatan (nama_jabatan) VALUES ('" +
    nama_jabatan +
    "')";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.status(200).json({
      error: false,
      message: "Data Berhasil Ditambahkan",
    });
  });
});

router.put("/:id_jabatan", (req, res, next) => {
  const id_jabatan = req.params.id_jabatan;
  const nama_jabatan = req.body.nama_jabatan;
  var sql =
    "UPDATE jabatan SET nama_jabatan='" +
    nama_jabatan +
    "' WHERE id_jabatan=" +
    id_jabatan;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.status(200).json({
      error: false,
      message: "Data Berhasil Diubah",
    });
  });
});

router.delete("/:id_jabatan", (req, res, next) => {
  const id_jabatan = req.params.id_jabatan;
  var sql = "DELETE FROM jabatan WHERE id_jabatan=" + id_jabatan;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.status(200).json({
      error: false,
      message: "Berhasil Menghapus Data Jabatan",
    });
  });
});


module.exports = router;
