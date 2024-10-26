const express = require("express");
const bodyParser = require('body-parser')
const userRouter = require("./routes/index")
const cors = require('cors')
const app = express();

app.use(cors())
app.use(bodyParser.json());

app.use("/api/v1",userRouter)


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});


