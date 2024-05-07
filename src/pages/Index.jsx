import React, { useState } from "react";
import { Container, VStack, Input, Button, Text, Table, Thead, Tbody, Tr, Th, Td, Box, Textarea, useToast } from "@chakra-ui/react";
import { FaSave, FaFileExport } from "react-icons/fa";

const Index = () => {
  const [entries, setEntries] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    timeIn: "",
    timeOut: "",
    signature: "",
  });

  const toast = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validatePhoneNumber = (number) => {
    const regex = /^\+2547\d{8}$/;
    return regex.test(number);
  };

  const handleSubmit = () => {
    if (!validatePhoneNumber(formData.phoneNumber)) {
      toast({
        title: "Invalid Phone Number",
        description: "Phone number must be in the format +254712345678",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setEntries([...entries, { ...formData, id: entries.length + 1 }]);
    setFormData({
      name: "",
      phoneNumber: "",
      timeIn: "",
      timeOut: "",
      signature: "",
    });
  };

  const exportToExcel = () => {
    toast({
      title: "Export Feature",
      description: "Export to Excel is not implemented in this demo.",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Container maxW="container.xl">
      <VStack spacing={4} align="stretch">
        <Text fontSize="2xl" mb={4}>
          Role Call Application
        </Text>
        <Box>
          <Input placeholder="Name" value={formData.name} name="name" onChange={handleInputChange} />
          <Input placeholder="Phone Number (+254712345678)" value={formData.phoneNumber} name="phoneNumber" onChange={handleInputChange} />
          <Input placeholder="Time In" type="time" value={formData.timeIn} name="timeIn" onChange={handleInputChange} />
          <Input placeholder="Time Out" type="time" value={formData.timeOut} name="timeOut" onChange={handleInputChange} />
          <Textarea placeholder="Signature" value={formData.signature} name="signature" onChange={handleInputChange} />
          <Button leftIcon={<FaSave />} colorScheme="blue" onClick={handleSubmit}>
            Save Entry
          </Button>
        </Box>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Phone Number</Th>
              <Th>Time In</Th>
              <Th>Time Out</Th>
              <Th>Signature</Th>
            </Tr>
          </Thead>
          <Tbody>
            {entries.map((entry) => (
              <Tr key={entry.id}>
                <Td>{entry.name}</Td>
                <Td>{entry.phoneNumber}</Td>
                <Td>{entry.timeIn}</Td>
                <Td>{entry.timeOut}</Td>
                <Td>{entry.signature}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Button leftIcon={<FaFileExport />} colorScheme="green" onClick={exportToExcel}>
          Export to Excel
        </Button>
      </VStack>
    </Container>
  );
};

export default Index;
