import FolderHelper from '../helpers/folderHelper';
import FileHelper from '../helpers/fileHelper';

class FolderController {
    static async createFolder(req, res) {
        try {
            const { filesId, foldername } = req.body;
            const foundFolder = await FolderHelper.createFolter({
                foldername,
                filesId
            });
            await FolderHelper.makeFolder(foldername);

            if (foundFolder) {
                return res.status(201).json({
                    status: 200,
                    message: 'Folder is successfully created!',
                    data: foundFolder.dataValues
                })
            }
        } catch (error) {
            return res.status(500).json({
                status: 500,
                message: 'Somethig went wrong.',
                error: error.message
            })
        }
    }


    static async retrieveSingleFolder(req, res) {
        try {
            const { folderId } = req.params;
            const storedFolder = await FolderHelper.findFolder('id', folderId);
            if (storedFolder !== null) {
                return res.status(200).json({
                    status: 200,
                    data: storedFolder
                });
            }
            res.status(404).json({
                status: 404,
                error: `No folder found with this id ${folderId}`
            });
        } catch (error) {
            return res.status(500).json({
                status: 500,
                message: 'Something went wrong when retrieving the file',
                error: error.message
            });
        }
    }

    static async moveFile(req, res) {
        try {
            const { fileId, folderId } = req.body;
            const findFile = await FileHelper.findExistingFile("id", fileId);
            const findFolder = await FolderHelper.findFolder("id", folderId)
            const a = findFolder.filesId;
            a.push(parseInt(fileId));
            if (findFile) {
                await FolderHelper.updateFilesArray(folderId, a);
                await FolderHelper.moveFile(findFolder.foldername, findFile.file);
                return res.status(200).json({
                    status: 200,
                    message: 'File Moved',
                })
            } else {
                return res.status(404).json({
                    status: 404,
                    message: 'No file found',
                })
            }
        } catch (error) {
            return res.status(500).json({
                status: 500,
                message: 'Somethig went wrong.',
                error: error.message
            })
        }
    }

    static async retrieveAllFolders(req, res) {
        try {
            const foundFolders = await FolderHelper.retrieveAllFolder();
            const folderData = foundFolders.rows;

            if (folderData.length === 0) {
                return res.status(404).json({
                    status: 404,
                    message: 'You don’t currently have any folder'
                });
            }

            return res.status(200).json({
                status: 201,
                message: 'All Folders retrieved successfully',
                Folders: folderData
            });
        } catch (error) {
            return res.status(500).json({
                status: 500,
                message: 'Something went wrong when retrieving all Folders',
                error: error.message
            });
        }
    }
}
export default FolderController;