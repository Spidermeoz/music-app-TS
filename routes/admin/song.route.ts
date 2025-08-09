// song.route.ts
import { Router } from "express";
import multer from "multer";
import * as controller from "../../controllers/admin/song.controller";
import * as uploadCloud from "../../middlewares/admin/uploadCloud.middlewares";

const router: Router = Router();
const upload = multer({ storage: multer.memoryStorage() }); // hoặc diskStorage

router.get("/", controller.index);
router.get("/create", controller.create);

// Parse multipart: field file là "avatar"
router.post("/create",
    upload.single("avatar"),
    uploadCloud.uploadSingle,
    controller.createPost
);

export const songRoutes: Router = router;
