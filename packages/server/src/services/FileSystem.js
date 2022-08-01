const path = require('path');
const _glob = require('glob');
const { promisify } = require('util');
const fs = require('fs');
const glob = promisify(_glob);
const touch = require('touch');

const FILE_SYSTEM_PATH = path.join(__dirname, '..', '..', 'db');

if (!fs.existsSync(FILE_SYSTEM_PATH)) {
    fs.mkdirSync(FILE_SYSTEM_PATH);
}

module.exports = {
    async glob(pattern) {
        const files = await glob(path.join(FILE_SYSTEM_PATH, pattern));

        return files.map(filename => require(filename));
    },

    async get(name) {
        return require(path.join(FILE_SYSTEM_PATH, name));
    },

    async create(name, data) {
        return new Promise((resolve, reject) => {
            const filename = path.join(FILE_SYSTEM_PATH, name);

            touch(filename, (error) => {
                if (error) {
                    reject(error);
                }

                fs.writeFile(filename, JSON.stringify(data), 'utf8', (err) => {
                    if (err) {
                        reject(err);
                    }

                    resolve(data);
                });
            });
        });
    },

    async exists(name) {
        return new Promise((resolve) => {
            const filename = path.join(FILE_SYSTEM_PATH, name);

            fs.exists(filename, (exists) => {
                resolve(exists);
            });
        });
    },

    async destroy(name) {
        return new Promise((resolve, reject) => {
            const filename = path.join(FILE_SYSTEM_PATH, name);

            fs.unlink(filename, (err) => {
                if (err) {
                    reject(err);
                }

                resolve();
            });
        });
    }
}