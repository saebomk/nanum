import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.connect(
  process.env.PRODUCTION ? process.env.MONGO_URL_PROD : process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useFindAndModify: false,
  }
);

const db = mongoose.connection;

const handleOpen = () => {
  console.log("✅ Connected to DB");
};

const handleError = (error) =>
  console.log(`❌ Error on DB Connection:${error}`);

db.once("open", handleOpen);
db.on("error", handleError);

// export const videos = [
//   {
//     id: 1,
//     title: "Titanic",
//     description: "My childhood crush",
//     views: 3142,
//     videoFile: "https://www.w3schools.com/html/mov_bbb.mp4",
//     creator: {
//       id: 10,
//       name: "April",
//       email: "april@email.com",
//     },
//   },
//   {
//     id: 2,
//     title: "Up",
//     description: "Heartwarming",
//     views: 3142,
//     videoFile: "https://www.w3schools.com/html/mov_bbb.mp4",
//     creator: {
//       id: 11,
//       name: "April",
//       email: "april@email.com",
//     },
//   },
//   {
//     id: 3,
//     title: "Movie 1",
//     description: "Description 1",
//     views: 3142,
//     videoFile: "https://www.w3schools.com/html/mov_bbb.mp4",
//     creator: {
//       id: 12,
//       name: "April",
//       email: "april@email.com",
//     },
//   },
//   {
//     id: 4,
//     title: "Movie 1",
//     description: "Movie Description 2",
//     views: 3142,
//     videoFile: "https://www.w3schools.com/html/mov_bbb.mp4",
//     creator: {
//       id: 13,
//       name: "April",
//       email: "april@email.com",
//     },
//   },
// ];
