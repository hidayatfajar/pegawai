const express = require("express");
const db = require("../config/db");
const router = express.Router();

router.get("/", (req, res, next) => {
  var sql = "SELECT * from unit";
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

router.get("/:id_unit", (req, res, next) => {
  const id_unit = req.params.id_unit;
  var sql =
    "SELECT * from unit WHERE id_unit=" +
    id_unit;
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
        message: "Id unit Tidak Ditemukan",
      });
    }
  });
});

router.post("/", (req, res, next) => {
  const nama_unit = req.body.nama_unit;
  var sql =
    "INSERT INTO unit (nama_unit) VALUES ('" +
    nama_unit +
    "')";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.status(200).json({
      error: false,
      message: "Data Berhasil Ditambahkan",
    });
  });
});

router.put("/:id_unit", (req, res, next) => {
  const id_unit = req.params.id_unit;
  const nama_unit = req.body.nama_unit;
  var sql =
    "UPDATE unit SET nama_unit='" +
    nama_unit +
    "' WHERE id_unit=" +
    id_unit;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.status(200).json({
      error: false,
      message: "Data Berhasil Diubah",
    });
  });
});

router.delete("/:id_unit", (req, res, next) => {
    const id_unit = req.params.id_unit;
    var sql = "DELETE FROM unit WHERE id_unit=" + id_unit;
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.status(200).json({
        error: false,
        message: "Berhasil Menghapus Data Unit Kerja",
      });
    });
  });

module.exports = router;
