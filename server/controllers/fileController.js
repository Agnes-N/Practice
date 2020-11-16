import fileHelper from '../helpers/fileHelper';
import FolderHelper from '../helpers/folderHelper';

class FilesController {
    static async storeFiles(req, res) {
        try {
            const file = req.file.filename;
            const { id } = req.user;
            const { folderId } = req.params;
            const uploadedFile = await fileHelper.CreateFile({
                file,
                userId: id
            });

            const findFolder = await FolderHelper.findFolder("id", folderId)
            const a = findFolder.filesId;

            a.push(parseInt(uploadedFile.id));

            if (uploadedFile) {
                await FolderHelper.updateFilesArray(folderId, a)
                return res.status(201).json({
                    status: 201,
                    message: 'File uploaded succesfully',
                    data: uploadedFile
                });
            }
        } catch (error) {
            return res.status(500).json({
                status: 500,
                message: 'Something went wrong when registering the file',
                error: error.message
            });
        }
    }

    static async retrieveSingleFile(req, res) {
        try {
            const { fileId } = req.params;
            const storedFile = await fileHelper.findExistingFile('id', fileId);
            if (storedFile !== null) {
                return res.status(200).json({
                    status: 200,
                    data: storedFile
                });
            }
            res.status(404).json({
                status: 404,
                error: `No file found with this id ${fileId}`
            });
        } catch (error) {
            return res.status(500).json({
                status: 500,
                message: 'Something went wrong when retrieving the file',
                error: error.message
            });
        }
    }

    static async storeSharedFiles(req, res) {
        try {
            const { userId, fileId } = req.params;
            const storeSharedFiles = await fileHelper.savedSharedFile({
                userId,
                fileId
            });

            if (storeSharedFiles) {
                return res.status(201).json({
                    status: 201,
                    message: `File has sucessfully shared to user with id ${userId}`,
                    data: storeSharedFiles.dataValues
                });
            }
        } catch (error) {
            return res.status(500).json({
                status: 500,
                message: 'Something went wrong',
                error: error.message
            });
        }
    }

}
export default FilesController;