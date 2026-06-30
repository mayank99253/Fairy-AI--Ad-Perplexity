import { app } from "./src/app.js";
import { connectDB } from "./src/config/db.js";
import { ENV } from "./src/config/env.js";
const PORT = ENV.PORT || 5000

app.listen(PORT , ()=>{
    connectDB()
    console.log(`Server is Running on PORT ${PORT}`);
})