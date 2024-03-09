import {
  useForm,
  Controller,
  SubmitHandler,
  FormProvider,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  InputGroup,
  InputLeftAddon,
  Container,
  Text,
  Flex,
} from "@chakra-ui/react";
import { CreatableSelect } from "chakra-react-select";
import { useState } from "react";
import UserDetails from "../UserDetails/UserDetails";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: { label: string; value: string } | string;
  dateOfBirth: Date;
  techStack: { label: string; value: string }[];
};

const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];
const isdCode = "+91";

const schema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup
    .string()
    .email("Must be a valid email")
    .required("Email is required"),
  phone: yup
    .string()
    .matches(/^[0-9]+$/, "Phone number must be only digits")
    .min(10, "Phone number must be at least 10 digits")
    .required("Phone number is required"),
  gender: yup.object().shape({
    label: yup.string().required("Gender is required"),
    value: yup.string().required(),
  }),
  dateOfBirth: yup.date().required("Date of birth is required"),
  techStack: yup
    .array()
    .of(
      yup.object().shape({
        value: yup.string().required(),
        label: yup.string().required(),
      })
    )
    .required("Tech stack is required"),
});

export const UserForm = () => {
  const techOptions = [{ value: "javascript", label: "JavaScript" }];
  const methods = useForm<FormValues>({
    resolver: yupResolver<FormValues>(schema),
    defaultValues: {
      gender: "",
      techStack: [techOptions[0]],
    },
  });
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = methods;
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      console.log("data", data);
    }, 3000);
  };

  return (
    <Container
      display="flex"
      justifyContent="center"
      bg="#f1eeef"
      mt={10}
      borderRadius={15}
    >
      <Box p={4} maxWidth={"md"}>
        <Text fontSize={20} fontWeight={"bold"} textAlign={"center"}>
          User Details Form
        </Text>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Text fontSize={17} fontWeight={"bold"} textAlign={"left"} mt={4}>
              Basic Details
            </Text>
            <Flex direction={{ base: "column", md: "row" }} gap={4}>
              <FormControl isInvalid={!!errors.firstName} mt={4}>
                <FormLabel htmlFor="firstName">First Name</FormLabel>
                <Input
                  id="firstName"
                  placeholder="First Name"
                  {...register("firstName")}
                />
                <FormErrorMessage>{errors.firstName?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.lastName} mt={4}>
                <FormLabel htmlFor="lastName">Last Name</FormLabel>
                <Input
                  id="lastName"
                  placeholder="Last Name"
                  {...register("lastName")}
                />
                <FormErrorMessage>{errors.lastName?.message}</FormErrorMessage>
              </FormControl>
            </Flex>

            <Flex direction={{ base: "column", md: "row" }} gap={4}>
              <FormControl isInvalid={!!errors.email} mt={4}>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input id="email" placeholder="Email" {...register("email")} />
                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.phone} mt={4}>
                <FormLabel htmlFor="phone">Phone</FormLabel>
                <InputGroup>
                  <InputLeftAddon>{isdCode}</InputLeftAddon>
                  <Input
                    id="phone"
                    placeholder="Phone number"
                    {...register("phone")}
                  />
                </InputGroup>
                <FormErrorMessage>{errors.phone?.message}</FormErrorMessage>
              </FormControl>
            </Flex>
            <Text fontSize={17} fontWeight={"bold"} textAlign={"left"} mt={4}>
              Other Information
            </Text>
            <Flex direction={{ base: "column", md: "row" }} gap={4}>
              <FormControl isInvalid={!!errors.gender} mt={4}>
                <FormLabel htmlFor="gender">Gender</FormLabel>
                <Controller
                  name="gender"
                  control={control}
                  render={({ field }) => (
                    <CreatableSelect
                      {...field}
                      options={genderOptions}
                      placeholder="Select gender..."
                      onChange={(option: { label: string; value: string }) =>
                        field.onChange(option)
                      }
                    />
                  )}
                />
                <FormErrorMessage>{errors.gender?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.dateOfBirth} mt={4}>
                <FormLabel htmlFor="dateOfBirth">Date of Birth</FormLabel>
                <Input
                  id="dateOfBirth"
                  type="date"
                  {...register("dateOfBirth")}
                />
                <FormErrorMessage>
                  {errors.dateOfBirth?.message}
                </FormErrorMessage>
              </FormControl>
            </Flex>

            <Box mt={4}>
              <FormLabel htmlFor="techStack">Tech Stack</FormLabel>
              <Controller
                name="techStack"
                control={control}
                render={({ field }) => {
                  const { onChange, value } = field;
                  const mandatoryValue = techOptions[0];
                  const handleChange = (
                    selectedOptions: { label: string; value: string }[]
                  ) => {
                    const mandatoryOptionSelected = selectedOptions.find(
                      (option) => option.value === mandatoryValue.value
                    );
                    if (!mandatoryOptionSelected) {
                      selectedOptions.push(mandatoryValue);
                    }
                    onChange(selectedOptions);
                  };

                  return (
                    <CreatableSelect
                      mt={4}
                      options={techOptions}
                      value={value}
                      isMulti
                      closeMenuOnSelect={false}
                      onChange={handleChange}
                      isOptionDisabled={(option: {
                        label: string;
                        value: string;
                      }) => option.value === mandatoryValue.value}
                      onCreateOption={(inputValue: string) => {
                        const trimmedInputValue = inputValue.trim();
                        if (trimmedInputValue) {
                          const newValue = {
                            label: trimmedInputValue,
                            value: trimmedInputValue
                              .toLowerCase()
                              .replace(/\W/g, ""),
                          };
                          onChange([...value, newValue]);
                        }
                      }}
                      noOptionsMessage={() => null}
                      formatCreateLabel={(inputValue: string) =>
                        inputValue.trim()
                          ? `Click here to add "${inputValue}" to tech stack`
                          : "Tech stack name cannot be empty"
                      }
                    />
                  );
                }}
              />
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              flexDirection={["column-reverse", "row"]}
              mt={2}
              mb={4}
            >
              <Button
                mt={4}
                colorScheme="orange"
                onClick={
                  !isLoading
                    ? () => {
                        reset();
                        setIsSubmitted(false);
                      }
                    : () => () => {}
                }
                width={["100%", null, 200]}
              >
                Reset
              </Button>
              <Button
                mt={4}
                colorScheme="teal"
                isLoading={isLoading}
                type="submit"
                width={["100%", null, 200]}
              >
                Submit
              </Button>
            </Box>
            {isSubmitted && (
              <>
                <UserDetails />
              </>
            )}
          </form>
        </FormProvider>
      </Box>
    </Container>
  );
};
