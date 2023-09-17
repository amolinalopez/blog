// import { test, expect } from "@playwright/test";

// let createdLikeIds: number[] = [];

// test.beforeAll(async ({ request }) => {
//   const mockLike = {
//     userId: 1,
//     postId: 1,
//   };

//   const response = await request.post("/api/likes/create", { data: mockLike });
//   const responseData = await response.json();

//   if (response.ok()) {
//     console.log(
//       `Successfully created new like: ${JSON.stringify(responseData)}`
//     );
//     createdLikeIds.push(responseData.id);
//   } else {
//     console.log(
//       `Failed to create new like. Response: ${JSON.stringify(responseData)}`
//     );
//   }
// });

// test.afterAll(async ({ request }) => {
//   for (let likeId of createdLikeIds) {
//     const deleteResponse = await request.delete(`/api/likes/${likeId}`);
//     if (deleteResponse.ok()) {
//       console.log(`Deleted like with ID: ${likeId}`);
//     } else {
//       console.log(`Failed to delete like with ID: ${likeId}`);
//     }
//   }
// });

// test("should create a new like", async ({ request }) => {
//   const mockLike = {
//     userId: 1, // Assuming a user with ID 1 exists.
//     postId: 1, // Assuming a post with ID 1 exists.
//   };

//   const response = await request.post("/api/likes/create", { data: mockLike });
//   const responseData = await response.json();

//   if (response.ok()) {
//     console.log(
//       `Successfully created new like: ${JSON.stringify(responseData)}`
//     );
//     createdLikeIds.push(responseData.id);
//   } else {
//     console.log(
//       `Failed to create new like. Response: ${JSON.stringify(responseData)}`
//     );
//   }

//   expect(response.ok()).toBeTruthy();
//   expect(responseData).toEqual(expect.objectContaining(mockLike));
// });

// test("should fetch likes by postId", async ({ request }) => {
//   const postId = 1; // Using the same post from the creation test

//   const response = await request.get(`/api/likes/${postId}`);
//   const likes = await response.json();

//   if (response.ok()) {
//     console.log(`Successfully fetched likes for post with ID: ${postId}`);
//   } else {
//     console.log(`Failed to fetch likes for post with ID: ${postId}`);
//   }

//   expect(response.ok()).toBeTruthy();
//   expect(Array.isArray(likes)).toBe(true);
//   expect(likes).toEqual(
//     expect.arrayContaining([expect.objectContaining({ postId })])
//   );
// });

// test("should delete a like by its ID", async ({ request }) => {
//   const likeId = createdLikeIds.pop(); // Use the last created like for deletion

//   const response = await request.delete(`/api/likes/${likeId}`);

//   if (response.ok()) {
//     console.log(`Successfully deleted like with ID: ${likeId}`);
//   } else {
//     console.log(`Failed to delete like with ID: ${likeId}`);
//   }

//   expect(response.ok()).toBeTruthy();
// });
