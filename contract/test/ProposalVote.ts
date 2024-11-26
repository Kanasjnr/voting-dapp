import { expect } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { ethers } from "hardhat";
import { ProposalVote } from "../typechain-types/ProposalVote"; 

describe("ProposalVote Contract", function () {
    let proposalVote: ProposalVote;
    let owner: any;
    let addr1: any;
    let addr2: any;

    async function deployProposalVoteFixture() {
        const ProposalVoteFactory = await ethers.getContractFactory("ProposalVote");
        [owner, addr1, addr2] = await ethers.getSigners();
        proposalVote = await ProposalVoteFactory.deploy();
        await proposalVote.waitForDeployment(); 
        return { proposalVote, owner, addr1, addr2 };
    }

    describe("Creating Proposals", function () {
        beforeEach(async function () {
            const { proposalVote: pv } = await loadFixture(deployProposalVoteFixture);
            proposalVote = pv;
        });

        it("Should create a proposal", async function () {
            const proposalName = "Test Proposal";
            const proposalDesc = "This is a test proposal";
            const quorum = 2;

            await proposalVote.createProposal(proposalName, proposalDesc, quorum);
            const proposals = await proposalVote.getAllProposals();
            
            expect(proposals.length).to.equal(1);
            expect(proposals[0].name).to.equal(proposalName);
            expect(proposals[0].description).to.equal(proposalDesc);
            expect(proposals[0].quorum).to.equal(quorum);
            expect(proposals[0].status).to.equal(1);
        });
    });

    describe("Voting on Proposals", function () {
        beforeEach(async function () {
            const { proposalVote: pv } = await loadFixture(deployProposalVoteFixture);
            proposalVote = pv;
            await proposalVote.createProposal("Test Proposal", "This is a test proposal", 2);
        });

        it("Should allow a user to vote on a proposal", async function () {
            await proposalVote.connect(addr1).voteOnProposal(0);
            const proposals = await proposalVote.getAllProposals();
            expect(proposals[0].voteCount).to.equal(1);
            expect(proposals[0].voters.length).to.equal(1);
            expect(proposals[0].voters[0]).to.equal(addr1.address);
        });

        it("Should not allow the same user to vote multiple times", async function () {
            await proposalVote.connect(addr1).voteOnProposal(0);
            await expect(proposalVote.connect(addr1).voteOnProposal(0)).to.be.revertedWith("You have voted already");
        });

        it("Should update proposal status to Accepted if quorum is reached", async function () {
            await proposalVote.createProposal("Quorum Proposal", "This proposal needs 2 votes", 2);
            await proposalVote.connect(addr1).voteOnProposal(1); 
            await proposalVote.connect(owner).voteOnProposal(1); 
            const proposals = await proposalVote.getAllProposals();
            expect(proposals[1].status).to.equal(3); 
        });
    });

    describe("Fetching Proposals", function () {
        beforeEach(async function () {
            const { proposalVote: pv } = await loadFixture(deployProposalVoteFixture);
            proposalVote = pv;
            await proposalVote.createProposal("Fetchable Proposal", "This proposal can be fetched", 1);
        });

       
    });
});
