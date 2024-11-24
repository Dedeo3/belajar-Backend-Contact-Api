import {app} from "./app.js";
import {logger} from "./apps/logging.js";

app.listen(8080,()=>{
    logger.info("Server is running on port 8080")
});