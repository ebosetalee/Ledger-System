import { app, port } from "./app.js";
import { connectToDB } from "./config/database.js";

connectToDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`server is runnng on port: ${port}`);
        });
    })
    .catch(() => {
        console.log("Database connection failed");
    });
