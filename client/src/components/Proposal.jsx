import { AlertDialog, Box, Button, Card, Flex, Text } from "@radix-ui/themes";
import React from "react";
import useAcceptProposal from "../hooks/useAcceptProposal";


const Proposal = ({ proposal, index }) => {
  if (!proposal) {
    return <Text color="red">Proposal data is missing.</Text>;
  }

  const { name, description, quorum, status } = proposal;

  const vote = useAcceptProposal();

  const handleVote = (value) => {
    const index = Number(value);
    vote(index);
  };

  return (
    <Box className="w-full my-6">
    <Card variant="surface">
      <Flex gap={4} direction={"column"}>
        <Text as="div" size="2" weight="bold">
          Name: &nbsp;
        </Text>
        <Text as="div" color="gray" size="2">
          {name}
        </Text>
        <Text as="div" size="2" weight="bold">
          Description: &nbsp;
        </Text>
        <Text as="div" color="gray" size="2">
          {description}
        </Text>
        <Text as="div" size="2" weight="bold">
          Quorum: &nbsp;
        </Text>
        <Text as="div" color="gray" size="2">
          {Number(quorum)}
        </Text>
        <Text as="div" size="2" weight="bold">
          Status: &nbsp;
        </Text>
        <Text as="div" color="gray" size="2">
          {status}
        </Text>
      </Flex>

      <div className="flex justify-end mt-4">
        <AlertDialog.Root>
          <AlertDialog.Trigger>
            <Button color="blue" className="cursor-pointer">
              Vote On Proposal{" "}
            </Button>
          </AlertDialog.Trigger>
          <AlertDialog.Content maxWidth="450px">
            <AlertDialog.Title>Vote Proposal</AlertDialog.Title>
            <AlertDialog.Description size="2">
              Are you sure?
            </AlertDialog.Description>

            <Flex gap="3" mt="4" justify="end">
              <AlertDialog.Cancel>
                <Button variant="soft" color="gray">
                  Cancel
                </Button>
              </AlertDialog.Cancel>
              <AlertDialog.Action>
                <Button
                  onClick={() => handleVote(index)}
                  variant="solid"
                  color="green"
                >
                  Yes
                </Button>
              </AlertDialog.Action>
            </Flex>
          </AlertDialog.Content>
        </AlertDialog.Root>
      </div>
    </Card>
  </Box>
);
};

export default Proposal;

