const express = require('express');
const con = require('./config/db')
const app = express();
const port = 5000;
const path = require("path");
const cors = require('cors');
const bodyParser = require('body-parser');
const upload = require('express-fileupload');
const pegawaiRoutes = require('./routes/pegawai');
const eselonRoutes = require('./routes/eselon');
const agamaRoutes = require('./routes/agama');
const jabatanRoutes = require('./routes/jabatan');
const golonganRoutes = require('./routes/golongan');
const unitRoutes = require('./routes/unit');

app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use("/public", express.static(path.join(__dirname, "/public")));

app.use(upload({
  createParentPath: true
})); // use express-fileupload for upload file


app.use('/pegawai', pegawaiRoutes);
app.use('/eselon', eselonRoutes);
app.use('/agama', agamaRoutes);
app.use('/jabatan', jabatanRoutes);
app.use('/golongan', golonganRoutes);
app.use('/unit', unitRoutes);

// app.use((req, res, next) => {
//     const error = new Error('Tidak Ditemukan');
//     error.status = 404;
//     next(error);
// })

// app.use((req, res, error, next) => {
//     res.status(error.status || 500);
//     res.json({
//         error: {
//             message: error.message
//         }
//     })
// })

app.use(function (req, res, next) {
    req.con = con;
    next();
  });

app.listen(port, ()=>{
    console.log(`Server Is Running On Port ${port}`)
});