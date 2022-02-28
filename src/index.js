import app from "./app.js";
import { connectToDB } from "./config/database.js";

const port = process.env.PORT || 4041;

connectToDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`server is runnng on port: ${port}`);
        });
    })
    .catch(() => {
        console.log("Database connection failed");
    });

process.on("unhandledRejection", err => {
    console.log("UNHANDLED REJECTION! 💥 Shutting down...");
    console.log(err);
    process.exit(1);
});