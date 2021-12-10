import {fileURLToPath} from 'url';
import {dirname} from 'path';

const filename = fileURLToPath(import.meta.url);
const __direname = dirname(filename);

export const authVerification = (req, res, next) => {
    if (!req.auth) {
        res.status(403).send({error:403, message:'No autorizado'});
    } else {
        next();
    }
}
export default __direname;