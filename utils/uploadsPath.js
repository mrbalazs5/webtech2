const uploadsPath = (fileType) => {

    switch (fileType){
        case 'image':
            return '/uploads/images';
        default:
            return '/uploads';
    }

};

export default uploadsPath;