import Router from 'express';
import FilesController from '../controllers/fileController';
import multer from 'multer';
import TokenHandler from '../middleware/tokenHandler';

const multerValidation = (req, res, next) => {
    var upload = multer({ dest: 'uploads/' })
    const multerUploads = upload.single('picture');

    multerUploads(req, res, (err) => {
        if (err) {
            // console.log('error', err)
        }
        // console.log('here======', req.file);
        next();
    });
}

const router = Router();

router.post('/uploadfile', TokenHandler.verifyToken, multerValidation,
    FilesController.storeFiles);

router.get('/uploadfile/:fileId', FilesController.retrieveSingleFile);

router.post('/share/file/:fileId/user/:userId', TokenHandler.verifyToken, FilesController.storeSharedFiles);

export default router;