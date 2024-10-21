import { ethers } from "hardhat";

async function main() {
  // Deploy the contract
  const ProposalVote = await ethers.getContractFactory("ProposalVote");
  const proposalVote = await ProposalVote.deploy();
  await proposalVote.deployed();
  console.log("ProposalVote deployed to:", proposalVote.address);

  // Create a proposal
  const createProposalTx = await proposalVote.createProposal(
    "First Proposal",
    "This is a test proposal",
    5 // quorum
  );
  await createProposalTx.wait();
  console.log("Proposal created");

  // Vote on the proposal
  const voteOnProposalTx = await proposalVote.voteOnProposal(0);
  await voteOnProposalTx.wait();
  console.log("Voted on proposal");

  // Get all proposals
  const allProposals = await proposalVote.getAllProposals();
  console.log("All proposals:", allProposals);

  // Get a specific proposal
  const proposal = await proposalVote.getProposal(0);
  console.log("Specific proposal:", proposal);

  // Vote multiple times to reach quorum
  for (let i = 1; i < 5; i++) {
    const signer = (await ethers.getSigners())[i];
    await proposalVote.connect(signer).voteOnProposal(0);
    console.log(`Signer ${i} voted on proposal`);
  }

  // Check the proposal status after reaching quorum
  const updatedProposal = await proposalVote.getProposal(0);
  console.log("Updated proposal after reaching quorum:", updatedProposal);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });