const express = require("express");
const db = require("../config/db");
const router = express.Router();

router.get("/", (req, res, next) => {
  var sql = "SELECT * from golongan";
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

router.get("/:id_golongan", (req, res, next) => {
  const id_golongan = req.params.id_golongan;
  var sql =
    "SELECT * from golongan WHERE id_golongan=" +
    id_golongan;
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
        message: "Id golongan Tidak Ditemukan",
      });
    }
  });
});

router.post("/", (req, res, next) => {
  const nama_golongan = req.body.nama_golongan;
  var sql =
    "INSERT INTO golongan (nama_golongan) VALUES ('" +
    nama_golongan +
    "')";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.status(200).json({
      error: false,
      message: "Data Berhasil Ditambahkan",
    });
  });
});

router.put("/:id_golongan", (req, res, next) => {
  const id_golongan = req.params.id_golongan;
  const nama_golongan = req.body.nama_golongan;
  var sql =
    "UPDATE golongan SET nama_golongan='" +
    nama_golongan +
    "' WHERE id_golongan=" +
    id_golongan;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.status(200).json({
      error: false,
      message: "Data Berhasil Diubah",
    });
  });
});

router.delete("/:id_golongan", (req, res, next) => {
  const id_golongan = req.params.id_golongan;
  var sql = "DELETE FROM golongan WHERE id_golongan=" + id_golongan;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.status(200).json({
      error: false,
      message: "Berhasil Menghapus Data Golongan",
    });
  });
});

module.exports = router;
