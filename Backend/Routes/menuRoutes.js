const express = require("express");
const { AddMenu, getMenu, getMenuById, editMenuItem, DeleteMenuById } = require("../Controller/Admincontoller");
const{multer, storage} = require("../Services/multerConfig");
const upload = multer({storage:storage})


const router = express.Router(); 


router.post("/add-menu",upload.single('photo'), AddMenu);
router.get("/get-Menu", getMenu);
router.get("/getMenuById/:id", getMenuById);
router.post("/editMenuItem/:id",upload.single('photo'), editMenuItem);
router.delete("/delete-menu-by-id/:id", DeleteMenuById);

module.exports = router;
