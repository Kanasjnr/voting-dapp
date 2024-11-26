import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import useContractInstance from "../hooks/useContractInstance";
import { readOnlyProvider } from "../constants/readOnlyProvider";
import { Contract } from "ethers";
import ABI from "../ABI/Proposalvote.json";

const ProposalContext = createContext({
  proposals: [],
});

export const ProposalContextProvider = ({ children }) => {
  const [proposal, setProposal] = useState([]);

  const readOnlyTodoContract = useContractInstance();

  const formatEnum = (value) => {
    const status = Number(value);
    switch (status) {
      case 1:
        return "Created";
      case 2:
        return "pending";
      case 3:
        return "Accepted";
      default:
        return "None";
    }
  };

  const getProposals = useCallback(async () => {
    if (!readOnlyTodoContract) return;

    try {
      const data = await readOnlyTodoContract.getAllProposals();

      const formattedTodos = data.map((proposal) => ({
        name: proposal.name,
        description: proposal.description,
        status: formatEnum(proposal.status),
        quorum: proposal.quorum
      }));

      setProposal(formattedTodos);
    } catch (error) {
      console.error("Error fetching all proposals", error);
     
    }
  }, [readOnlyTodoContract]);

  useEffect(() => {
    getProposals();
  }, [getProposals]);

  const proposalCreateHandler = useCallback((name, description, quorum) => {
    setProposal((prevState) => [
      ...prevState,
      { 
        name, 
        description, 
        quorum,
        status: 'Created' 
      },
    ]);
  }, []);

  useEffect(() => {
    const contract = new Contract(
      import.meta.env.VITE_CONTRACT_ADDRESS,
      ABI,
      readOnlyProvider
    );

    contract.on("ProposalCreated", proposalCreateHandler);
    return () => {
      contract.off("ProposalCreated", proposalCreateHandler);
    };
  }, [proposalCreateHandler, readOnlyTodoContract]);

  return (
    <ProposalContext.Provider value={{ proposal }}>
      {children}
    </ProposalContext.Provider>
  );
};

export const useProposal = () => {
  const context = useContext(ProposalContext);
  return context;
};

