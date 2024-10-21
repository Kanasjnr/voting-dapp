import hre from "hardhat";

async function main(){
    const contractAddress = "0x2156842Af186bA8B9B232d4dB58ADDb016969FE5";

    const account = "0xF1240B5C1C468aA68Bd77DCFAf10d6d46E9CB8Ea";

    const signer = await hre.ethers.getSigner(account);

    const proposalVoting = await hre.ethers.getContractAt("ProposalVote", contractAddress)
}