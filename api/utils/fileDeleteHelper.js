const fs = require('fs-extra');

const deleteFile = async (path) => {
    try {
            // If the filename does not end with .pdf, delete only the file
            fs.unlink(path, (err) => {
                if (err) {
                    console.error(`Error deleting file: ${err}`);
                } else {
                    console.log(`File deleted: ${path}`);
                }
            });

    } catch (e) {
        console.log("Error: ",e.message);
    }
};

module.exports = {
    deleteFile
}