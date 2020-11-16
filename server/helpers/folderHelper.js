import models from '../sequelize/models';
import multer from 'multer';
import fs from 'fs';
import path from 'path';

class FolderHelper {
    static async createFolter(data) {
        try {
            const { Folders } = models;
            const createdFolder = await Folders.create(data, {
                fields: [
                    'foldername', 'filesId'
                ]
            })
            return createdFolder;
        } catch (error) {

        }
    }

    static async findFolder(column, value) {
        try {
            const { Folders } = models;
            const folder = await Folders.findOne({
                where: {
                    [column]: value
                },
            });
            return folder;
        } catch (error) {
            return error;
        }
    }

    static async updateFilesArray(id, data) {
        try {
            const { Folders } = models;
            const folder = await Folders.update({ filesId: data }, {
                where: { id },
                returning: true
            });
            return folder;
        } catch (error) {
            return error;
        }
    }

    static async makeFolder(folderName) {
        fs.mkdir(`./server/temp/${folderName}`, { recursive: true }, (err) => {
            if (err) throw err;
        });
    }

    static async moveFile(folderName, fileName) {
        const currentPath = path.join(__dirname, "../../uploads", `${fileName}`);
        const destinationPath = path.join(__dirname, `../temp/${folderName}`, `${fileName}`);
        fs.rename(currentPath, destinationPath, function(err) {
            if (err) {
                throw err
            }
        });
    }

    static async retrieveAllFolder() {
        try {
            const { Folders } = models;
            const allFolders = await Folders.findAndCountAll();
            return allFolders;
        } catch (error) {
            return error;
        }
    }
}

export default FolderHelper;