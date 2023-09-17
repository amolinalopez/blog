// export const mockUsers = [
//   {
//     id: 5, // New ID
//     username: "Citrouille",
//     email: "citrouille@halloween.com",
//     password: "pereNoel123",
//   },
//   {
//     id: 6, // New ID
//     username: "Pomme",
//     email: "pomme@damour.com",
//     password: "feteforaine123",
//   },
// ];

// export const mockPosts = [
//   {
//     id: 7, // New ID
//     title: "Test Post 1",
//     content: "Le rer ne marche pas.",
//     userId: 5, // Citrouille's ID
//   },
//   {
//     id: 8, // New ID
//     title: "Test Post 2",
//     content: "Les vacances ne sont pas assez longues.",
//     userId: 6, // Pomme's ID
//   },
// ];

// export const mockComments = [
//   {
//     id: 2, // New ID
//     postId: 7, // Test Post 1's ID
//     content: "Yes my voice matters.",
//     userId: 5, // Citrouille's ID
//   },
//   {
//     id: 3, // New ID
//     postId: 8, // Test Post 2's ID
//     content: "Thank you for the warm welcome.",
//     userId: 6, // Pomme's ID
//   },
// ];

// export const mockLikes = [
//   {
//     id: 2, // New ID
//     userId: 5, // Citrouille's ID
//     postId: 7, // Test Post 1's ID
//   },
//   {
//     id: 3, // New ID
//     userId: 6, // Pomme's ID
//     postId: 8, // Test Post 2's ID
//   },
// ];

// export const mockFollows = [
//   {
//     id: 2, // New ID
//     followerUserId: 5, // Citrouille's ID
//     followedUserId: 6, // Pomme's ID
//   },
// ];

export const mockUsers = [
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

export const mockPosts = [
  {
    title: "Test Post 1",
    content: "Le rer ne marche pas.",
    userId: 3,
  },
  {
    title: "Test Post 2",
    content: "Les vacances ne sont pas assez longues.",
    userId: 4,
  },
];

export const mockComments = [
  {
    postId: 3,
    content: "Yes my voice matters.",
    userId: 3,
  },
  {
    postId: 2,
    content: "Thank you for the warm welcome.",
    userId: 4,
  },
];

export const mockLikes = [
  {
    userId: 1,
    postId: 2,
  },
  {
    userId: 4,
    postId: 1,
  },
];

// export const mockFollows = [
//   {
//     followerUserId: 3, // Citrouille is following Pomme
//     followedUserId: 4,
//   },
//   {
//     followerUserId: 4, // Pomme is following Citrouille
//     followedUserId: 3,
//   },
//   // This can represent a scenario where a user follows and then unfollows another user
//   // {
//   //   followerUserId: 3,
//   //   followedUserId: 4,
//   //   deletedAt: "2023-09-12T17:35:46.528Z",  // Date representing when Citrouille unfollowed Pomme
//   // },
// ];
