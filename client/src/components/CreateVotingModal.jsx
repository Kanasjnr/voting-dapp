import {
  Dialog,
  Button,
  Flex,
  Text,
  TextField,
  TextArea,
} from "@radix-ui/themes";
import { useState } from "react";
import useCreateProposal from "../hooks/useCreateProposal";

const CreaeteVotingModal = () => {
  const handleCreateNewProposal = useCreateProposal();

  const [fields, setFields] = useState({
    name: "",
    description: "",
    qorum: "",
  });

  const handleChange = (name, e) => {
    setFields((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  const { name, description, qorum } = fields;

  const handleSubmit = async () => {
    await handleCreateNewProposal(name, description, qorum);
    setFields({ name: "", description: "", qorum: "" });
  };

  return (
    <div className="w-full flex justify-end">
      <Dialog.Root>
        <Dialog.Trigger>
          <Button color="orange">Create Proposal</Button>
        </Dialog.Trigger>

        <Dialog.Content maxWidth="450px">
          <Dialog.Title>New Proposal</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            Create A New Proposal Here.
          </Dialog.Description>

          <Flex direction="column" gap="3">
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Proposal name
              </Text>
              <TextField.Root
                placeholder="Enter title"
                value={name}
                onChange={(e) => handleChange("name", e)}
              />
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Proposal Description
              </Text>
              <TextArea
                placeholder="Enter description"
                value={description}
                onChange={(e) => handleChange("description", e)}
              />
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Proposal qourum
              </Text>
              <TextArea
                placeholder="Enter quorum number"
                value={qorum}
                onChange={(e) => handleChange("qorum", e)}
              />
            </label>
          </Flex>

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>

            <Button onClick={handleSubmit}>Submit</Button>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
};

export default CreaeteVotingModal;
