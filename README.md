# ArweaveStore

# Install
```
npm i arweave-store
```

# Usage

```
const { ArweaveStore } = require('arweave-store');
var fs = require('fs');

async function generate_wallet() {
    const arweaveStore = new ArweaveStore();
    let gen_key = await arweaveStore.generate_wallet();
    fs.writeFileSync("key.json", JSON.stringify(gen_key));
};

(async () => {
    await generate_wallet();

    const key = fs.readFileSync('key.json');
    const arweaveStore = new ArweaveStore(JSON.parse(key),
        {
            host: 'arweave.net',// Hostname or IP address for a Arweave host
            port: 443,          // Port
            protocol: 'https',  // Network protocol http or https
            timeout: 20000,     // Network request timeouts in milliseconds
            logging: false,     // Enable network request logging
        });

    const wallet = await arweaveStore.wallet();
    const balance = await arweaveStore.balance(wallet);

    console.log(`wallet : ${wallet} balance: ${balance}`);

    let data = fs.readFileSync('arweave.json');

    const url = await arweaveStore.store(data, 'application/json');

    console.log(url);
})();
```
