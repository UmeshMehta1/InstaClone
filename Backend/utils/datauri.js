import DataUriParser from 'datauri/parser.js'

import path from 'path'

const parse = new DataUriParser();

const getDataUri = (file)=>{
    const extName = path.extname(file.originalname).toString();
    return parse.format(extName, file.buffer).content;
}

export default getDataUri;