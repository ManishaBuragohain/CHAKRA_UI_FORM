import { useFormContext } from "react-hook-form";
import { Box, Text } from "@chakra-ui/react";

const UserDetails = () => {
  const { watch } = useFormContext();
  const watchedValue = watch();
  console.log("watchedValue", watchedValue);
  const isdCode = "+91";
  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="flex-end"
        mt={7}
      >
        <Text fontSize={20} fontWeight={"bold"} textAlign={"center"} mb={4}>
          Submitted Details
        </Text>
        <Text>
          <strong>First Name:</strong> {watchedValue?.firstName}
        </Text>
        <Text>
          <strong>Last Name:</strong> {watchedValue?.lastName}
        </Text>
        <Text>
          <strong>Email:</strong> {watchedValue?.email}
        </Text>
        <Text>
          <strong>Phone:</strong> {isdCode} {watchedValue?.phone}
        </Text>
        <Text>
          <strong>Gender:</strong> {watchedValue?.gender?.label}
        </Text>
        <Text>
          <strong>Date of Birth:</strong> {watchedValue?.dateOfBirth}
        </Text>
        <Text display="flex" flexDirection="row">
          <strong>Tech Stack:&nbsp; </strong>{" "}
          {watchedValue?.techStack &&
            watchedValue?.techStack.map((tech: any, index: number) => (
              <Text key={index}> {tech.label}&nbsp;</Text>
            ))}
        </Text>
      </Box>
    </>
  );
};

export default UserDetails;
