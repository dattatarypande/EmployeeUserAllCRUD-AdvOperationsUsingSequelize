var express = require('express');
let jwt = require("jsonwebtoken");
const serviceObj = require('../controllers/emp.controller');
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator");
var router = express.Router();


router.post(
    "/", [
        check("Mobile").isNumeric().withMessage("Mobile  required"),
        check("Password").isLength({ min: 5 }).withMessage("password required"),
    ],
    async(req, res) => {
        //Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        } else {

            console.log(req.body);

            serviceObj.loginuser(req.body, async(user) => {
                console.log(user);
                console.log(user[0].dataValues.Password);

                const isSame = await bcrypt.compare(req.body.Password, user[0].dataValues.Password);
                if (!isSame) {

                    res.status(200).send({
                        error: true,
                        message: "Invalid password.",
                    });
                } else {
                    const token = jwt.sign({ ID: user[0].dataValues.Id }, "node", {
                        algorithm: "HS256",
                        expiresIn: 24 * 1000,
                    });


                    res.send({
                        error: false,
                        message: "logged in successfully.",
                        token: token,



                    });
                }




            });

        }
    }
);

module.exports = router;