import Accounts from 'web3-eth-accounts'
import isEmpty from 'lodash/isEmpty';
import Web3 from 'web3';

const initialize = (client) => new Promise (async (resolve, reject) => {
    if(!isEmpty(client)) return resolve(client);
    try {
        const client = new Web3(Web3.givenProvider || "ws://localhost:8546");
        const network = await client.eth.net.getNetworkType()
        const accounts = await client.eth.getAccounts()
        return resolve({ client, network, accounts })
    } catch (error) {
        console.log('Whoops, error while initilizing the web3 client')
        return reject(error)
    }
})
// const initialize = () => {
//     const client = new Web3(Web3.givenProvider || "ws://localhost:8546");
//     const network = await client.eth.net.getNetworkType()
//     const accounts = await client.eth.getAccounts()
//     return { client, network, accounts }
// }

/**
 * Load some data from the main net
 */
// const loadBlockchainData = async (client) => {
//     const client = new Web3(Web3.givenProvider || "ws://localhost:8546");
//     const network = await client.eth.net.getNetworkType()
//     console.log("loadBlockchainData network: %s", network)
//     const accounts = await client.eth.getAccounts()
//     console.log('accounts', accounts)
//     return {network, accounts};
// }

module.exports = {
    initialize
}