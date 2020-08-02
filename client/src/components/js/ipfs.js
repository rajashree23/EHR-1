const ipfsClient=require('ipfs-http-client');
const ipfs = ipfsClient({host: 'ipfs.infura.io', port:5001,protocol:'https'});

export default ipfs;