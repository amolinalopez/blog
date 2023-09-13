import { test, expect } from "@playwright/test";

const mockUsers = [
  {
    username: "Citrouille",
    email: "citrouille@halloween.com",
    password: "pereNoel123",
  },
  {
    username: "Pomme",
    email: "pomme@damour.com",
    password: "feteforaine123",
  },
];

let createdUserIds: number[] = [];

test.beforeAll(async ({ request }) => {
  for (let user of mockUsers) {
    const response = await request.post("/api/users", { data: user });
    if (response.ok()) {
      const userData = await response.json();
      createdUserIds.push(userData.id);
    }
  }
});

test.afterAll(async ({ request }) => {
  for (let userId of createdUserIds) {
    const deleteResponse = await request.delete(`/api/users/${userId}`);
    if (deleteResponse.ok()) {
      console.log(`Deleted user with ID: ${userId}`);
    } else {
      console.log(`Failed to delete user with ID: ${userId}`);
    }
  }
});

test("should fetch all users", async ({ request }) => {
  const users = await request.get("/api/users");
  expect(users.ok()).toBeTruthy();
  expect(typeof (await users.json())).toBe("object");
});

test("should create a new user", async ({ request }) => {
  const newUser = {
    username: "Katherina",
    email: "vampire@mysticfalls.com",
    password: "damonStefan123",
  };

  const response = await request.post("/api/users", { data: newUser });
  const responseData = await response.json();
  if (response.ok()) {
    console.log(
      `Successfully created new user: ${JSON.stringify(responseData)}`
    );
    createdUserIds.push(responseData.id);
  } else {
    console.log(
      `Failed to create new user. Response: ${JSON.stringify(responseData)}`
    );
  }
  expect(response.ok()).toBeTruthy();
  expect(responseData).toEqual(expect.objectContaining(newUser));
});

test("should fetch a user by its ID", async ({ request }) => {
  const userId = createdUserIds[0];
  console.log(`Attempting to fetch user with ID: ${userId}`);

  const user = await request.get(`/api/users/${userId}`);

  if (user.ok()) {
    console.log(
      `Successfully fetched user with ID: ${userId}. Data: ${JSON.stringify(
        await user.json()
      )}`
    );
  } else {
    console.log(
      `Failed to fetch user with ID: ${userId}. Response: ${JSON.stringify(
        await user.json()
      )}`
    );
  }

  expect(user.ok()).toBeTruthy();
  expect(await user.json()).toEqual(expect.objectContaining({ id: userId }));
});

// test("should fetch a user by its ID", async ({ request }) => {
//   const userId = createdUserIds[0];
//   const user = await request.get(`/api/users/${userId}`);
//   expect(user.ok()).toBeTruthy();
//   expect(await user.json()).toEqual(expect.objectContaining({ id: userId }));
// });

test("should update a user by its ID", async ({ request }) => {
  const userId = createdUserIds[0];
  console.log(`Attempting to update user with ID: ${userId}`);

  const updatedData = {
    username: "Stephanie",
    email: "dandan@rottenmango.com",
    password: "myHusbandisPanda",
  };

  const response = await request.put(`/api/users/${userId}`, {
    data: updatedData,
  });

  if (response.ok()) {
    console.log(`Successfully updated user with ID: ${userId}`);
  } else {
    console.log(
      `Failed to update user with ID: ${userId}. Response: ${JSON.stringify(
        await response.json()
      )}`
    );
  }

  expect(response.ok()).toBeTruthy();
  expect(await response.json()).toEqual(expect.objectContaining(updatedData));
});

// test("should update a user by its ID", async ({ request }) => {
//     const userId = createdUserIds[0];
//     const updatedData = {
//       username: "Stephanie",
//       email: "dandan@rottenmango.com",
//       password: "myHusbandisPanda",
//     };
//     const response = await request.put(`/api/users/${userId}`, {
//       data: updatedData,
//     });
//     expect(response.ok()).toBeTruthy();
//     expect(await response.json()).toEqual(expect.objectContaining(updatedData));
//   });

test("should delete a user by its ID", async ({ request }) => {
  const userId = createdUserIds.pop();
  console.log(`Attempting to delete user with ID: ${userId}`);

  const response = await request.delete(`/api/users/${userId}`);

  if (response.ok()) {
    console.log(`Successfully deleted user with ID: ${userId}`);
  } else {
    console.log(
      `Failed to delete user with ID: ${userId}. Response: ${JSON.stringify(
        await response.json()
      )}`
    );
  }

  expect(response.ok()).toBeTruthy();
});

// test("should delete a user by its ID", async ({ request }) => {
//     const userId = createdUserIds.pop();
//     const response = await request.delete(`/api/users/${userId}`);
//     expect(response.ok()).toBeTruthy();
//   });
