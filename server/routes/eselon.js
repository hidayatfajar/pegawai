const express = require("express");
const db = require("../config/db");
const router = express.Router();

router.get("/", (req, res, next) => {
  var sql = "SELECT * from eselon";
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

router.get("/:id_eselon", (req, res, next) => {
  const id_eselon = req.params.id_eselon;
  var sql =
    "SELECT * from eselon WHERE id_eselon=" +
    id_eselon;
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
        message: "Id eselon Tidak Ditemukan",
      });
    }
  });
});

router.post("/", (req, res, next) => {
  const nama_eselon = req.body.nama_eselon;
  var sql =
    "INSERT INTO eselon (nama_eselon) VALUES ('" +
    nama_eselon +
    "')";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.status(200).json({
      error: false,
      message: "Data Berhasil Ditambahkan",
    });
  });
});

router.put("/:id_eselon", (req, res, next) => {
  const id_eselon = req.params.id_eselon;
  const nama_eselon = req.body.nama_eselon;
  var sql =
    "UPDATE eselon SET nama_eselon='" +
    nama_eselon +
    "' WHERE id_eselon=" +
    id_eselon;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.status(200).json({
      error: false,
      message: "Data Berhasil Diubah",
    });
  });
});

router.delete("/:id_eselon", (req, res, next) => {
  const id_eselon = req.params.id_eselon;
  var sql = "DELETE FROM eselon WHERE id_eselon=" + id_eselon;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.status(200).json({
      error: false,
      message: "Berhasil Menghapus Data Eselon",
    });
  });
});


module.exports = router;
