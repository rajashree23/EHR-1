var crypto = require('crypto');

export function generate(){
    const buf = crypto.randomBytes(256);
    return buf;
}