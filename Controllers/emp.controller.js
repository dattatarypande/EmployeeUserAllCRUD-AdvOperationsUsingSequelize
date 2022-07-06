const db = require("../config/config");
const emp = db.emp;
const Op = db.Sequelize.Op;
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

exports.create = async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: true, errors: errors.array() });
    } else {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.Password, salt);
        // console.log(hash);
        const empdata = {
            Fname: req.body.Fname,
            Lname: req.body.Lname,
            Mobile: req.body.Mobile,
            Password: hash,
            EmailId: req.body.EmailId,
            Address: req.body.Address,
        }
        emp.create(empdata).then((data) => {
            res.status(200).send({ error: false, message: "Employee created" });
        }).catch((err) => {
            res.status(200).send({
                error: true,
                message: err.message,
            });
        });
    }
}




exports.update = async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: true, errors: errors.array() });
    } else {
        const id = req.params.id;
        const stud = {

            Mobile: req.body.Mobile,

        }

        emp.update(emp, { where: { Id: id } }).then((data) => {
            res.status(200).send({ error: false, message: "employee update" });
        }).catch((err) => {
            res.status(200).send({
                error: true,
                message: err.message,
            });
        });
    }
}

exports.loginuser = async(data, callback) => {
    emp.findAll({ where: { Mobile: data.Mobile } }).then(function(data) {
            callback(data);
        })
        .catch((err) => {
            callback(err);
        });
};


exports.findAll = async(req, res) => {


    emp.findAll({}).then(function(data) {
            res.send({ error: false, message: "success", data: data });
        })
        .catch((err) => {
            res.status(200).send({
                error: true,
                message: err.message || "Some error occurred while retrieving User details.",
            });
        });
};



exports.findone = (req, res) => {
    const id = req.params.id;
    let where = {
        where: { id: id }
    }


    emp.findAll(where)
        .then(function(data) {
            res.send({ error: false, message: "success", data: data });
        })
        .catch((err) => {
            res.status(200).send({
                error: true,
                message: err.message || "Some error occurred while retrieving User details.",
            });
        });
};