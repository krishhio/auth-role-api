import mongoose from 'mongoose'

mongoose.connect("mongodb+srv://administrator:Crishio1@clustermedmanage.gty3n.mongodb.net/MedManage?retryWrites=true&w=majority")
.then(db=> console.log('DB is connected'))
.catch(error=> console.log(error))