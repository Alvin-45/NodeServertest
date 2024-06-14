const mongoose=require('mongoose')
const CONNECTION_STRING=`mongodb+srv://ajk:XiyDsUomwZ3nFj60@cluster0.5ppwmtu.mongodb.net/Nodetest?retryWrites=true&w=majority&appName=Cluster0`

mongoose.connect(CONNECTION_STRING).then(
    result=>{
        console.log('Mongodb Atlas connected with Server');
    }
).catch(err=>{
    console.log("Connection Failed!!! Check the connection String");
})