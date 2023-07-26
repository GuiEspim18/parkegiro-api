import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';
import { extname } from 'path';


/** 
 * Type multer config
 */

type TMulterConfig = {
    dest: string
};


/** 
 * Type multer options
 */

type TMulterOptions = {
    limits: {
        fileSize: number;
    };
    fileFilter: (req: any, file: any, cb: any) => void;
    storage: any;
};


/**
 * Multer configs, uploads folder
 */

export const multerConfig: TMulterConfig = {
    dest: './uploads/'
};


/**
 * Multer Options const
 */

export const multerOptions: TMulterOptions = {
    // File size limits
    limits: {
        fileSize: 262144000,
    },

    // Check the mimetypes to allow for upload
    fileFilter: (req: any, file: any, cb: any) => {
        cb(null, true);
    },

    // Storage properties
    storage: diskStorage({

        // Destination storage path details
        destination: (req: any, file: any, cb: any) => {
            const uploadPath = multerConfig.dest;

            // Create folter if doesn't exist
            if(!existsSync(uploadPath)) mkdirSync(uploadPath)
            cb(null, uploadPath);
        },

        // File modification details
        filename: (req: any, file: any, cb: any) => {

            // Calling the callback passing the random name generated with the original extension name
            cb(null, `${uuid()}${extname(file.originalname)}`);
        }
    })
};