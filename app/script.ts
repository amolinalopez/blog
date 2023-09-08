// const { PrismaClient } = require('@prisma/client');

// const prisma = new PrismaClient();

// // This main function creates a user with the fields username and email.

// async function main() {
//     const newUser = await prisma.user.create({
//         data: {
//             username: 'Alice',
//             email: 'alice@prisma.io',
//             password: 'somePlaceholderPassword',
//         },
//     });
//     console.log("Created user:", newUser);
    
//     const allUsers = await prisma.user.findMany();
//     console.log("All users:", allUsers);
// }



// // This main function retrieves all users.
// /*
// async function main() {
//     const users = await prisma.user.findMany();
//     console.log(users);
// }
// */

// // This main function creates a user with a post.
// /*
// async function main() {
//     const user = await prisma.user.create({
//         data: {
//             username: 'Bob',
//             email: 'bob@prisma.io',
//             posts: {
//                 create: {
//                     title: 'Hello World',
//                 },
//             },
//         },
//     });
//     console.log(user);
// }
// */

// // This main function retrieves users with their posts.
// // async function main() {
// //     const usersWithPosts = await prisma.user.findMany({
// //         include: {
// //             posts: true,
// //         },
// //     });
// //     console.dir(usersWithPosts, { depth: null });
// // }

// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });