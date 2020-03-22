import fs from 'fs';
import path from 'path';
import multer from 'multer';
import mkdirp from 'mkdirp';

//File uploader for general usage
class FileHandler{

    constructor(req, res, uploadsPath){
        this.req = req;
        this.res = res;
        this.uploadsPath = uploadsPath;
        this.publicDir = 'client/public';
        this.acceptedImageMimeTypes = [
            'image/jpeg',
            'image/jpg',
            'image/png',
            '',
            'image/svg+xml'
        ];
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

        let upload = multer({
            storage : storage
        }).any();

        return new Promise((resolve, reject) => {

            upload(this.req, this.res, (err) => {

                if(err) {
                    reject(err);
                } else {

                    if(this.req.files.length < 1){
                        reject(new Error('Required file missing'));
                    }

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

    revokeFileUpload(file){
        fs.unlinkSync(this.publicDir + file.path);
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

export default FileHandler;