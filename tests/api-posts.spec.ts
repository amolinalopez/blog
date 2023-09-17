import { test, expect } from "@playwright/test";
import { mockPosts } from "./mockData";

let createdPostIds: number[] = [];

test.beforeAll(async ({ request }) => {
  for (let post of mockPosts) {
    const response = await request.post("/api/posts", { data: post });
    if (response.ok()) {
      const postData = await response.json();
      createdPostIds.push(postData.id);
    }
  }
});

test.afterAll(async ({ request }) => {
  for (let postId of createdPostIds) {
    const deleteResponse = await request.delete(`/api/posts/${postId}`);
    if (deleteResponse.ok()) {
      console.log(`Deleted post with ID: ${postId}`);
    } else {
      console.log(`Failed to delete post with ID: ${postId}`);
    }
  }
});

test("should fetch all posts", async ({ request }) => {
  const posts = await request.get("/api/posts");
  expect(posts.ok()).toBeTruthy();
  expect(typeof (await posts.json())).toBe("object");
});

test("should create a new mock post", async ({ request }) => {
  const newPost = {
    title: "a new test post",
    content: "Today is a good day. No TESTS!",
    userId: 4    
  };

  const response = await request.post("/api/posts", { data: newPost });
  const responseData = await response.json();
  if (response.ok()) {
    console.log(
      `Successfully created new post: ${JSON.stringify(responseData)}`
    );
    createdPostIds.push(responseData.id);

    const fetchPostResponse = await request.get(
      `/api/posts/${responseData.id}`
    );
    expect(fetchPostResponse.ok()).toBeTruthy();
    expect(await fetchPostResponse.json()).toEqual(
      expect.objectContaining({ id: responseData.id })
    );
  } else {
    console.log(
      `Failed to create new post. Response: ${JSON.stringify(responseData)}`
    );
  }
  expect(response.ok()).toBeTruthy();
  expect(responseData).toEqual(expect.objectContaining(newPost));
});


test("should fetch a post by its ID", async ({ request }) => {
  console.log(`Current post IDs: ${createdPostIds}`);
  const postId = createdPostIds[0];
  console.log(`Attempting to fetch post with ID: ${postId}`);

  const post = await request.get(`/api/posts/${postId}`);

  let postData;
  try {
    postData = await post.json();
  } catch (error) {
    console.error(`Failed to parse JSON. Response was: ${await post.text()}`);
    throw error;
  }

  if (post.ok()) {
    console.log(
      `Successfully fetched post with ID: ${postId}. Data: ${JSON.stringify(
        postData
      )}`
    );
  } else {
    console.log(
      `Failed to fetch post with ID: ${postId}. Response: ${JSON.stringify(
        postData
      )}`
    );
  }

  expect(post.ok()).toBeTruthy();
  expect(postData).toEqual(expect.objectContaining({ id: postId }));
});

test("should update a post by its ID", async ({ request }) => {
  const postId = createdPostIds[0];
  console.log(`Attempting to update post with ID: ${postId}`);

  const updatedData = {
    title: "Updated Test Post",
    content: "Content of the updated test post.",
  };

  const response = await request.put(`/api/posts/${postId}`, {
    data: updatedData,
  });

  if (response.ok()) {
    console.log(`Successfully updated post with ID: ${postId}`);
  } else {
    console.log(
      `Failed to update post with ID: ${postId}. Response: ${JSON.stringify(
        await response.json()
      )}`
    );
  }

  expect(response.ok()).toBeTruthy();
  expect(await response.json()).toEqual(expect.objectContaining(updatedData));
});

test("should delete a post by its ID", async ({ request }) => {
  const postId = createdPostIds.pop();
  console.log(`Attempting to delete post with ID: ${postId}`);

  const response = await request.delete(`/api/posts/${postId}`);

  if (response.ok()) {
    console.log(`Successfully deleted post with ID: ${postId}`);
  } else {
    console.log(
      `Failed to delete post with ID: ${postId}. Response: ${JSON.stringify(
        await response.json()
      )}`
    );
  }
  expect(response.ok()).toBeTruthy();
});
