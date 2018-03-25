let mongojs = require('mongojs');

let databaseUrl = 'calisto_mongojs';
let collections = ['users', 'clubs'];

let connect = mongojs(databaseUrl, collections);

module.exports = {
    connect: connect
};