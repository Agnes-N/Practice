import { Router } from 'express';
import FolderController from '../controllers/folderController';
import multer from 'multer';
import FolderHelper from '../helpers/folderHelper';
import TokenHandler from '../middleware/tokenHandler';
import FilesController from '../controllers/fileController';

const multerValidation = async(req, res, next) => {
    const { folderId } = req.params;
    const storedFolder = await FolderHelper.findFolder('id', folderId);
    var upload = multer({ dest: `server/temp/${storedFolder.foldername}` })
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

router.post('/createfolder', TokenHandler.verifyToken, FolderController.createFolder);
router.get('/createfolder/:folderId', TokenHandler.verifyToken, FolderController.retrieveSingleFolder);
router.post('/createfolder/:folderId/uploadfile', multerValidation, TokenHandler.verifyToken, FilesController.storeFiles);
router.get('/folders', TokenHandler.verifyToken, FolderController.retrieveAllFolders);

export default router;