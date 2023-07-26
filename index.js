require('dotenv').config();
const express = require('express');
const app = express();
const fileUpload = require('express-fileupload');
app.use(express.static(__dirname));
app.use(express.json());
const path = require("path");
const {ethers, JsonRpcProvider } = require("ethers");

var port = 3000;

app.use(express.json());
app.use(fileUpload({
    extended:true
}))

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
})

app.get("/index.html", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
})

const API_URL = process.env.API_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

const {abi} =require('./artifacts/contracts/TaskTodo.sol/TaskToDo.json');
// console.log(ethers)
const provider = new JsonRpcProvider(API_URL);

const signer = new ethers.Wallet(PRIVATE_KEY, provider);

const contractInstance = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

app.post("/addTask", async (req, res) => {
    var task = req.body.task;
    
    async function storeDataInBlockchain(task) {
        console.log('Adding the task in the blockchain network...');
        const tx = await contractInstance.addTask(task);
        await tx.wait();
    }

    await storeDataInBlockchain(task);
    res.send("The task has been registered in the smart contract");
});

app.post("/changeStatus", async (req, res) => {
    var task = req.body.id;
    
    async function storeDataInBlockchain(task) {
        console.log('Changing the task status...');
        const tx = await contractInstance.markAsFinished(task);
        await tx.wait();
    }

    await storeDataInBlockchain(task);
    res.send("The task status has been changed in the smart contract");
});


app.listen(port, function () {
    console.log("App is listning on port 3000");
});
