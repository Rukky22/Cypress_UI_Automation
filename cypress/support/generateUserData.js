import { faker } from "@faker-js/faker";

export const generateUserData = (overrides = {}) => {
  const firstName = faker.person.firstName(); // Should return a string
  const lastName = faker.person.lastName(); // Should return a string

  return {
    firstName,
    lastName,
    email: faker.internet.email({ firstName, lastName }),
    phoneNo: faker.phone.number("###########"),
    password: "#password",
    ...overrides,
  };
};
