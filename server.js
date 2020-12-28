let express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const db = mongoose.connect('mongodb://localhost/Category' , { useNewUrlParser: true, useUnifiedTopology: true  });

let Tshirt = require('./model/t-shirt'),
    Category = require('./model/category'),
    orders = require('./model/order');

app.post('/tShirts', function (req, res) {
    let newTshirt = new Tshirt();
    newTshirt.TShirtId = req.body.TShirtId
    newTshirt.TshirtName = req.body.name;
    newTshirt.TshirtPrice = req.body.price;
    newTshirt.quantety = req.body.quan;
    newTshirt.save(function (err, addedTshirt) {
        if (err) {
            res.status(500).send({ error: "Can't add T-Shirt!" });
        } else {
            res.status(200).send(addedTshirt);
        }
    });
});
app.get('/tShirts', function (req, res) {
    Tshirt.find({}, function (err, addedTshirt) {
        if (err) {
            res.status(500).send({ error: "Can't get T-Shirt!" });
        } else {
            res.status(200).send(addedTshirt);
        }
    }) 
    /* Tshirt.find({}).populate(
        {
            path: 'categorys',
            model: 'Category',
            select: 'categoryName'
        }).exec(function (err, addedTshirt) {
            if (err) {
                res.status(500).send({ error: "Can't get T-Shirt!" });
            } else {
                res.status(200).send(addedTshirt);
            }
        }); */
});

app.post('/category', function (req, res) {
    let newCategory = new Category();
    newCategory.categoryName = req.body.categoryName;
    newCategory.categoryID = req.body.categoryID;

    newCategory.save(function (err, addedCategory) {
        if (err) {
            res.status(500).send({ error: "Can't add course" });
        } else {
            res.status(200).send(addedCategory);
        }
    })
});
app.get('/category', function (req, res) {
    Category.find({}, function (err, addedCategory) {
        if (err) {
            res.status(500).send({ error: "Can't get Category!" });
        } else {
            res.status(200).send(addedCategory);
        }
    })
});

app.post('/orders', function (req, res) {
    let newOrder = new orders();
    newOrder.ordersNumber = req.body.ordersNumber;
    newOrder.orderDateTime = req.body.orderDateTime;
    newOrder.customerPhoneNumber = req.body.customerPhoneNumber;

    newOrder.save(function (err, orderAdded) {
        if (err) {
            res.status(500).send({ error: "Can't add order" });
        } else {
            res.status(200).send(orderAdded);
        }
    })
});
app.get('/orders', function (req, res) {
    /* orders.find({}).populate(
        {
            path: 'tShirts',
            model: 'Tshirt',
            select: 'quantety'
        }).exec(function (err, addedOrder) {
            if (err) {
                res.status(500).send({ error: "Can't get Category!" });
            } else {
                res.status(200).send(addedOrder);
            }
        }); */
    orders.find({}, function (err, addedOrder) {
            if (err) {
                res.status(500).send({ error: "Can't get Category!" });
            } else {
                res.status(200).send(addedOrder);
            }
        });
});


app.put('/category/tShirts', function (req, res) {
    let categorytID = req.body.categorytID,
        tshirtID = req.body.tshirtID;
    
    Category.findOne({ _id: categorytID }, function (err, category) {
        if (err) {
            res.status(500).send({ error: "Can't find category" });
        } else {
            Tshirt.updateOne(
                { _id: tshirtID },
                { $addToSet: { categorys: category._id } },
                function (err, status) {
                    if (err) {
                        res.status(500).send({ error: "Can't update Tshirt" });
                    } else {
                        res.send(status);
                    }
                }
            )
        }
    })
})
app.put('/tshirtOrders', function (req, res) {
    let tshirtID = req.body.tshirtID;
    let orderID = req.body.orderID;
    Tshirt.findOne({_id: tshirtID}, function (err, Tshirt) {
         if (err) {
            res.status(500).send({ error: "Can't find Tshirt" });
         } else {
             orders.updateOne(
                 { _id: orderID },
                 {$addToSet: {tShirts: Tshirt._id}},
                 function(err, status) {
                    if (err) {
                        res.status(500).send({ error: "Can't update orders" });
                    } else {
                        res.send(status);
                    }
                 }
             )
        }
    })
});
app.listen(3000, function () {
    console.log("WORKING");
})