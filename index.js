const express = require("express");
const mongoose = require("mongoose");
const app = express();
/** Las cors son lo que permite comunicar el fronten con backend **/
const cors = require('cors');



const FoodModel = require('./models/Food');
const Food = require("./models/Food");

app.use(express.json());
app.use(cors());

mongoose.connect(
    "mongodb+srv://films:x9Crb4mBhvYRFsut@cluster0.942re.mongodb.net/food?retryWrites=true&w=majority",{
    useNewUrlParser: true
});


app.post('/insert', async(req, res) => {

    const foodName = req.body.foodName;
    const days = req.body.days;

    const food = new FoodModel(
        {
            foodName: foodName, 
            daysSinceIAte: days
        }
    )

    try {
        await food.save();
        res.send('Insert data');
    } catch (error) {
        console.log(error);
    }
});

app.get('/read', async(req, res) => {

    FoodModel.find({},(err, result) => {
        if(err){
            res.send(err);
        }

        res.send(result);
    })
    
});


app.put('/update', async(req, res) => {

    const newFoodName = req.body.newFoodName;
    const id = req.body.id;

    try {
        await FoodModel.findById(id, (error, updatedFood) => {
        updatedFood.foodName = newFoodName;
        updatedFood.save();
        res.send('Update')
       });
    } catch (error) {
        console.log(error);
    }
});

app.delete('/delete/:id', async(req, res) => {
    const id = req.params.id;
    await FoodModel.findByIdAndRemove(id).exec();
    res.send('Deleted')
});



app.listen(3001, () => {
    console.log('Server running on port 3001');
});