const Web3 = require("web3");

const MFA = require("./build/contracts/MFA.json");
const readlineSync = require("readline-sync");
const web3 = new Web3("https://alfajores-forno.celo-testnet.org");

async function setSecret(contract) {
  const account = readlineSync.question("Enter the account address: ");
  const secret = readlineSync.question("Enter the secret: ");
  const privateKey =
    "880931cd6c3757ff3f2868e34043a06157ab3f2c08e1d3c290d470d401b2a7b4"; // replace with the private key of your celo account
  const celoAccount = web3.eth.accounts.privateKeyToAccount(privateKey);
  web3.eth.accounts.wallet.add(celoAccount);
  await contract.methods
    .setSecret(account, secret)
    .send({
      from: celoAccount.address,
      gas: 3000000,
      gasPrice: "10000000000",
    })
    .then((result) => {
      console.log(`Secret set for address ${account}`);
    })
    .catch((error) => {
      console.error(error);
    });
}

async function getSecret(contract) {
  const account = readlineSync.question("Enter the account address: ");
  await contract.methods
    .getSecret(account)
    .call()
    .then((result) => {
      console.log(result);
      console.log(`Secret set for address ${account} is ${result}`);
    })
    .catch((error) => {
      console.error(error);
    });
}

async function checkCode(contract) {
  const account = readlineSync.question("Enter the account address: ");
  const code = readlineSync.question("Enter the code: ");
  await contract.methods
    .checkCode(account, code)
    .call()
    .then((result) => {
      console.log(result);
      console.log(
        `Code is ${result ? "valid" : "invalid"} for address ${account}`
      );
    })
    .catch((error) => {
      console.error(error);
    });
}

async function main() {
  const contractAddress = "0x31cdbaA451e1e799a88E138a0F8Fc4971E02AeB9"; // Change to you your contract address

  // Create an instance of the contract
  const contract = new web3.eth.Contract(MFA.abi, contractAddress);

  const action = readlineSync.question(
    "Enter action (setSecret/getSecret/checkCode): "
  );
  switch (action) {
    case "setSecret":
      await setSecret(contract);
      break;
    case "getSecret":
      await getSecret(contract);
      break;
    case "checkCode":
      await checkCode(contract);
      break;
    default:
      console.log("Invalid action");
  }
}

main();
