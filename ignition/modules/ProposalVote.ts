import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const ProposalVoteModule = buildModule("ProposalVoteModule", (m) => {
  const ProposalVote = m.contract("ProposalVote");

  return { ProposalVote };
});

export default ProposalVoteModule;