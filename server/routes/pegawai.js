const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/", (req, res, next) => {
  var sql =
    "SELECT id_pegawai, nip_pegawai, image_pegawai, nama_pegawai, tempat_lahir, alamat_pegawai, tgl_lahir, jenis_kelamin, no_hp, npwp, tempat_kerja, nama_golongan, nama_eselon, nama_jabatan, nama_agama, nama_unit FROM pegawai INNER JOIN agama ON pegawai.id_agama = agama.id_agama INNER JOIN jabatan ON pegawai.id_jabatan = jabatan.id_jabatan INNER JOIN eselon ON pegawai.id_eselon = eselon.id_eselon INNER JOIN golongan ON pegawai.id_golongan = golongan.id_golongan INNER JOIN unit ON pegawai.id_unit = unit.id_unit";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.status(200).json({
      error: false,
      message: "Data Ditemukan",
      data: result,
    });
  });
});

router.get("/:id_pegawai", (req, res, next) => {
  const id_pegawai = req.params.id_pegawai;
  var sql =
    "SELECT id_pegawai, nip_pegawai, image_pegawai, nama_pegawai, tempat_lahir, alamat_pegawai, tgl_lahir, jenis_kelamin, no_hp, npwp, tempat_kerja, nama_golongan, nama_eselon, nama_jabatan, nama_agama, nama_unit FROM pegawai INNER JOIN agama ON pegawai.id_agama = agama.id_agama INNER JOIN jabatan ON pegawai.id_jabatan = jabatan.id_jabatan INNER JOIN eselon ON pegawai.id_eselon = eselon.id_eselon INNER JOIN golongan ON pegawai.id_golongan = golongan.id_golongan INNER JOIN unit ON pegawai.id_unit = unit.id_unit WHERE id_pegawai=" +
    id_pegawai;
  db.query(sql, (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      res.status(200).json({
        error: false,
        message: "Data Ditemukan",
        data: result,
      });
    } else {
      res.status(200).json({
        error: true,
        message: "Id Pegawai Tidak Ditemukan",
      });
    }
  });
});

router.delete("/:id_pegawai", (req, res, next) => {
  const id_pegawai = req.params.id_pegawai;
  var sql = "DELETE FROM pegawai WHERE id_pegawai=" + id_pegawai;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.status(200).json({
      error: false,
      message: "Berhasil Menghapus Data Pegawai",
    });
  });
});

router.post("/", (req, res, next) => {
  console.log(req.body);
  const nip_pegawai = req.body.nip_pegawai;
  const nama_pegawai = req.body.nama_pegawai;
  const image_pegawai = req.files;
  const tempat_lahir = req.body.tempat_lahir;
  const alamat_pegawai = req.body.alamat_pegawai;
  const tgl_lahir = req.body.tgl_lahir;
  const jenis_kelamin = req.body.jenis_kelamin;
  const no_hp = req.body.no_hp;
  const npwp = req.body.npwp;
  const tempat_kerja = req.body.tempat_kerja;
  const id_golongan = req.body.golongan;
  const id_eselon = req.body.eselon;
  const id_jabatan = req.body.jabatan;
  const id_agama = req.body.agama;
  const id_unit = req.body.unit;
  if (image_pegawai) {
    const extension = image_pegawai["image_pegawai"].mimetype.split("/")[1];
    const allowedExtension = ["jpg", "jpeg", "png"];
    if (allowedExtension.indexOf(extension) === -1) {
      res.status(500).json({
        message: "Extension image not allowed",
        error: true,
      });
    } else {
      // move image to public/images/ with name image using file.mv()

      let file = image_pegawai["image_pegawai"];
      let filename = file.name;
      file.mv(`public/images/` + filename, (err) => {
        if (err) {
          res.status(500).json({
            message: "Failed to move image",
            error: err,
          });
        } else {
          var sql =
            "INSERT INTO pegawai (nip_pegawai, image_pegawai, nama_pegawai, tempat_lahir, alamat_pegawai, tgl_lahir, jenis_kelamin, no_hp, npwp, tempat_kerja, id_golongan, id_eselon, id_jabatan, id_agama, id_unit) VALUES ('" +
            nip_pegawai +
            "','" +
            filename +
            "','" +
            nama_pegawai +
            "','" +
            tempat_lahir +
            "','" +
            alamat_pegawai +
            "','" +
            tgl_lahir +
            "','" +
            jenis_kelamin +
            "','" +
            no_hp +
            "','" +
            npwp +
            "','" +
            tempat_kerja +
            "','" +
            id_golongan +
            "','" +
            id_eselon +
            "','" +
            id_jabatan +
            "','" +
            id_agama +
            "','" +
            id_unit +
            "')";
          db.query(sql, (err, result) => {
            if (err) throw err;
            res.status(200).json({
              error: false,
              message: "Berhasil Menambah Data Pegawai",
            });
          });
        }
      });
    }
  } else {
    res.status(500).json({
      message: "Image cannot be empty",
      error: true,
    });
  }
});

router.put("/:id_pegawai", (req, res, next) => {
  console.log(req.body);
  const id_pegawai = req.params.id_pegawai;
  const nip_pegawai = req.body.nip_pegawai;
  const nama_pegawai = req.body.nama_pegawai;
  const image_pegawai = req.files;
  const tempat_lahir = req.body.tempat_lahir;
  const alamat_pegawai = req.body.alamat_pegawai;
  const tgl_lahir = req.body.tgl_lahir;
  const jenis_kelamin = req.body.jenis_kelamin;
  const no_hp = req.body.no_hp;
  const npwp = req.body.npwp;
  const tempat_kerja = req.body.tempat_kerja;
  const id_golongan = req.body.golongan;
  const id_eselon = req.body.eselon;
  const id_jabatan = req.body.jabatan;
  const id_agama = req.body.agama;
  if (image_pegawai) {
    const extension = image_pegawai["image_pegawai"].mimetype.split("/")[1];
    const allowedExtension = ["jpg", "jpeg", "png"];
    if (allowedExtension.indexOf(extension) === -1) {
      res.status(500).json({
        message: "Extension image not allowed",
        error: true,
      });
    } else {
      // move image to public/images/ with name image using file.mv()
      let file = image_pegawai["image_pegawai"];
      let filename = file.name;
      file.mv(`public/images/` + filename, (err) => {
        if (err) {
          res.status(500).json({
            message: "Failed to move image",
            error: err,
          });
        } else {
          var sql =
            "UPDATE pegawai SET nip_pegawai='" +
            nip_pegawai +
            "', image_pegawai='" +
            filename +
            "', nama_pegawai='" +
            nama_pegawai +
            "', tempat_lahir='" +
            tempat_lahir +
            "', alamat_pegawai='" +
            alamat_pegawai +
            "', tgl_lahir='" +
            tgl_lahir +
            "', jenis_kelamin='" +
            jenis_kelamin +
            "', no_hp='" +
            no_hp +
            "', npwp='" +
            npwp +
            "', tempat_kerja='" +
            tempat_kerja +
            "', id_golongan='" +
            id_golongan +
            "', id_eselon='" +
            id_eselon +
            "', id_jabatan='" +
            id_jabatan +
            "', id_agama='" +
            id_agama +
            "' WHERE id_pegawai='" +
            id_pegawai +
            "'";
          db.query(sql, (err, result) => {
            if (err) throw err;
            res.status(200).json({
              error: false,
              message: "Berhasil Mengubah Data Pegawai",
            });
          });
        }
      });
    }
  } else {
    res.status(500).json({
      message: "Image cannot be empty",
      error: true,
    });
  }
});

// router.put("/", (req, res, next) => {
//   const id_pegawai = req.body.id_pegawai;
//   const nip_pegawai = req.body.nip_pegawai;
//   const nama_pegawai = req.body.nama_pegawai;
//   const tempat_lahir = req.body.tempat_lahir;
//   const alamat_pegawai = req.body.alamat_pegawai;
//   const tgl_lahir = req.body.tgl_lahir;
//   const jenis_kelamin = req.body.jenis_kelamin;
//   const no_hp = req.body.no_hp;
//   const npwp = req.body.npwp;
//   const tempat_kerja = req.body.tempat_kerja;
//   const id_golongan = req.body.id_golongan;
//   const id_eselon = req.body.id_eselon;
//   const id_jabatan = req.body.id_jabatan;
//   const id_agama = req.body.id_agama;
//   var sql =
//     "UPDATE pegawai SET nip_pegawai='" +
//     nip_pegawai +
//     "',nama_pegawai='" +
//     nama_pegawai +
//     "',tempat_lahir='" +
//     tempat_lahir +
//     "',alamat_pegawai='" +
//     alamat_pegawai +
//     "',tgl_lahir='" +
//     tgl_lahir +
//     "',jenis_kelamin='" +
//     jenis_kelamin +
//     "',no_hp='" +
//     no_hp +
//     "',npwp='" +
//     npwp +
//     "',tempat_kerja='" +
//     tempat_kerja +
//     "',id_golongan='" +
//     id_golongan +
//     "',id_eselon='" +
//     id_eselon +
//     "',id_jabatan='" +
//     id_jabatan +
//     "',id_agama='" +
//     id_agama +
//     "' WHERE id_pegawai=" +
//     id_pegawai;
//   db.query(sql, (err, result) => {
//     if (err) throw err;
//     res.status(200).json({
//       error: false,
//       message: "Berhasil Mengubah Data Pegawai",
//     });
//   });
// });

// router.post("/", (req, res, next) => {
//     const
// })

module.exports = router;
