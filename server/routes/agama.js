const express = require("express");
const db = require("../config/db");
const router = express.Router();

router.get("/", (req, res, next) => {
  var sql = "SELECT * from agama";
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

router.get("/:id_agama", (req, res, next) => {
  const id_agama = req.params.id_agama;
  var sql =
    "SELECT * from agama WHERE id_agama=" +
    id_agama;
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
        message: "Id Agama Tidak Ditemukan",
      });
    }
  });
});

router.post("/", (req, res, next) => {
  const nama_agama = req.body.nama_agama;
  var sql =
    "INSERT INTO agama (nama_agama) VALUES ('" +
    nama_agama +
    "')";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.status(200).json({
      error: false,
      message: "Data Berhasil Ditambahkan",
    });
  });
});

router.put("/:id_agama", (req, res, next) => {
  const id_agama = req.params.id_agama;
  const nama_agama = req.body.nama_agama;
  var sql =
    "UPDATE agama SET nama_agama='" +
    nama_agama +
    "' WHERE id_agama=" +
    id_agama;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.status(200).json({
      error: false,
      message: "Data Berhasil Diubah",
    });
  });
});

router.delete("/:id_agama", (req, res, next) => {
  const id_agama = req.params.id_agama;
  var sql = "DELETE FROM agama WHERE id_agama=" + id_agama;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.status(200).json({
      error: false,
      message: "Berhasil Menghapus Data Agama",
    });
  });
});

module.exports = router;
