async function main() {
  // const TaskToDo = await ethers.getContractFactory("TaskToDo");
  const TaskToDo = await ethers.deployContract("TaskToDo");

  // Start deployment, returning a promise that resolves to a contract object
  // const TaskToDo_ = await TaskToDo.deploy();
  await TaskToDo.waitForDeployment();
  // console.log("Contract address:", TaskToDo_.address);
  console.log("Contract address:", await TaskToDo.getAddress());
}
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.log(error);
    process.exit(1);
  })