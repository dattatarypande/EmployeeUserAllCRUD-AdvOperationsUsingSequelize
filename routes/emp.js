var express = require("express");
const emp = require("../Controllers/emp.controller");
const { body, validationResult } = require("express-validator");
var router = express.Router();
/* GET home page. */

router.get("/:id", emp.findone);
router.post('/', [body("Fname").notEmpty()
        .isLength({ min: 2, max: 70 }),
        body("Lname").notEmpty()
        .isLength({ min: 2, max: 70 }),
        body("Address").notEmpty()
        .isLength({ min: 2, max: 70 }),
        body("Password").not().isEmpty().withMessage("Password required"),
        body("Mobile").isLength({ min: 10, max: 12 })
    ],
    emp.create);

router.post("/All", emp.findAll);
router.post('/update/:id', [
        body("Mobile").isLength({ min: 10, max: 12 })
    ],
    emp.update);



module.exports = router;