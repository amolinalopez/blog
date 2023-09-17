import { test, expect } from "@playwright/test";
import { mockComments } from "./mockData";

let createdCommentIds: number[] = [];

test.beforeAll(async ({ request }) => {
  for (let comment of mockComments) {
    const response = await request.post("/api/comments", { data: comment });
    if (response.ok()) {
      const commentData = await response.json();
      createdCommentIds.push(commentData.id);
    }
  }
});

test.afterAll(async ({ request }) => {
  for (let commentId of createdCommentIds) {
    const deleteResponse = await request.delete(`/api/comments/${commentId}`);
    if (deleteResponse.ok()) {
      console.log(`Deleted comment with ID: ${commentId}`);
    } else {
      console.log(`Failed to delete comment with ID: ${commentId}`);
    }
  }
});

test("should fetch all comments", async ({ request }) => {
  const comments = await request.get("/api/comments");
  expect(comments.ok()).toBeTruthy();
  expect(typeof (await comments.json())).toBe("object");
});

test("should create a new mock comment", async ({ request }) => {
  const newComment = {
    content: "This is a test comment.",
    userId: 4,
    postId: 2,
  };

  const response = await request.post("/api/comments", { data: newComment });
  const responseData = await response.json();
  if (response.ok()) {
    console.log(
      `Successfully created new comment: ${JSON.stringify(responseData)}`
    );
    createdCommentIds.push(responseData.id);

    const fetchCommentResponse = await request.get(
      `/api/comments/${responseData.id}`
    );
    expect(fetchCommentResponse.ok()).toBeTruthy();
    expect(await fetchCommentResponse.json()).toEqual(
      expect.objectContaining({ id: responseData.id })
    );
  } else {
    console.log(
      `Failed to create new comment. Response: ${JSON.stringify(responseData)}`
    );
  }
  expect(response.ok()).toBeTruthy();
  expect(responseData).toEqual(expect.objectContaining(newComment));
});

test("should fetch a comment by its ID", async ({ request }) => {
  const commentId = createdCommentIds[0];
  const comment = await request.get(`/api/comments/${commentId}`);
  let commentData;

  try {
    commentData = await comment.json();
  } catch (error) {
    console.error(
      `Failed to parse JSON. Response was: ${await comment.text()}`
    );
    throw error;
  }

  expect(comment.ok()).toBeTruthy();
  expect(commentData).toEqual(expect.objectContaining({ id: commentId }));
});

test("should update a comment by its ID", async ({ request }) => {
  const commentId = createdCommentIds[0];
  const updatedData = {
    content: "Updated test comment.",
  };

  const response = await request.put(`/api/comments/${commentId}`, {
    data: updatedData,
  });

  expect(response.ok()).toBeTruthy();
  expect(await response.json()).toEqual(expect.objectContaining(updatedData));
});

test("should delete a comment by its ID", async ({ request }) => {
  const commentId = createdCommentIds.pop();
  const response = await request.delete(`/api/comments/${commentId}`);

  expect(response.ok()).toBeTruthy();
});
