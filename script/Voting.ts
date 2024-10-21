import hre from "hardhat";

async function main() {
  const contractAddress = "0x2156842Af186bA8B9B232d4dB58ADDb016969FE5";

  const account = "0xF1240B5C1C468aA68Bd77DCFAf10d6d46E9CB8Ea";
  const account2= "0xF3709C87432488B6aAEb9629cf5cb5BA6Db793F0"
  const account3 = "0x1853E7DE95130a304e4dF355CF8aB7AE80160189"

  const signer = await hre.ethers.getSigner(account);
  const signer1 = await hre.ethers.getSigner(account2);
  const signer2 = await hre.ethers.getSigner(account3);

  const proposalVoting = await hre.ethers.getContractAt(
    "ProposalVote",
    contractAddress
  );

  const createProposal = await proposalVoting
    .connect(signer)
    .createProposal(
      "propose to cancel test",
      "i think we should cancel the test",
      2
    );

  await createProposal.wait();

  console.log("proposal created successfully");
  

  const votingOnProposal = await proposalVoting
    .connect(signer)
    .voteOnProposal(0);

  await votingOnProposal.wait();

  const votingOnProposal_ = await proposalVoting
    .connect(signer1)
    .voteOnProposal(0);

  await votingOnProposal_.wait();
  const _votingOnProposal = await proposalVoting
    .connect(signer2)
    .voteOnProposal(0);

  await _votingOnProposal.wait();

  console.log("You have voted on proposal");



  const allCreatedProposals = await proposalVoting.getAllProposals();

  console.log("All Proposal created", allCreatedProposals);

  
  const proposalCreated = await proposalVoting.getProposal(0);

  console.log("proposal has been created", {
    name: proposalCreated.name_,
    description: proposalCreated.desc_,
    quorum: proposalCreated.quorum_,
    voters: proposalCreated.voters_,
    count: proposalCreated.Count_.toString(),
    status: proposalCreated.status_


  });
  

  
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });