import fs from 'fs';
import path from 'path';
import multer from 'multer';
import mkdirp from 'mkdirp';

class FileUploader{

    constructor(req, res, uploadsPath){
        this.req = req;
        this.res = res;
        this.uploadsPath = uploadsPath;
        this.publicDir = 'client/public';
    }

    upload(){

        const storage = multer.diskStorage({
            destination: (req, file, cb) => {
                const dir = this.publicDir + this.uploadsPath;
                mkdirp.sync(dir);
                cb(null, dir);
            },
            filename: (req, file, cb) => {
                cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
            }
        });

        let upload = multer({ storage : storage}).any();

        return new Promise((resolve, reject) => {

            upload(this.req, this.res, (err) => {

                if(err) {
                    reject(err);
                } else {
                    resolve(this.req.files);
                }

            });

        });

    }

    uploadSingle(){

        return new Promise((resolve, reject) => {

            this.upload()
                .then((files) => {
                    files[0]['path'] =  this.uploadsPath + '/' + files[0].filename;
                    return resolve(files[0]);
                })
                .catch((err) =>{
                    return reject(err);
                })

        });

    }

    uploadMultiple(){

        return new Promise((resolve, reject) => {

            this.upload()
                .then((files) => {

                    files.forEach((file) => {
                        file.path = this.uploadsPath + '/' + file.filename
                    });

                    return resolve(files);
                })
                .catch((err) =>{
                    return reject(err);
                })

        });

    }

}

export default FileUploader;