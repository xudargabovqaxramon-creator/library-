const {Router} = require("express");
const uploadRouter = Router();
const { uploadAuthorImage, uploadBookImage } = require("../controller/upload.controller");

uploadRouter.post("/img_author", uploadAuthorImage);
uploadRouter.post("/img_book", uploadBookImage);

module.exports = uploadRouter;
