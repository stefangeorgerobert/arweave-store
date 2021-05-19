const Arweave = require('arweave');

class ArweaveStore {
    constructor(key, config) {
        this.arweave = Arweave.init(config);
        this.key = key;
    }

    async generate_wallet() {
        return await this.arweave.wallets.generate();
    }

    async wallet() {
        return await this.arweave.wallets.jwkToAddress(this.key);
    }

    async balance(wallet) {
        return await this.arweave.wallets.getBalance(wallet);
    }

    async store(data, content_type) {
        let transaction = await this.arweave.createTransaction({ data: data }, this.key);
        transaction.addTag('Content-Type', content_type);
    
        await this.arweave.transactions.sign(transaction, this.key);
    
        let uploader = await this.arweave.transactions.getUploader(transaction);
    
        while (!uploader.isComplete) {
            await uploader.uploadChunk();
        }
    
        return `https://arweave.net/${transaction.id}`;
    }
}

module.exports = {
    ArweaveStore
};
