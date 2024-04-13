import express, { application } from "express";
import path from "path";
import mongoose from "mongoose";
import Razorpay from "razorpay";
import cors from "cors";
import bodyParser from "body-parser";


mongoose
  .connect(
    "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.5",
    {
      dbName: "Razor_data",
    }
  )
  .then(() => console.log("Database Connected"))
  .catch((e) => console.log(e));

// const msg = mongoose.model("Message", newSchema);

// *** NEW SCHEMA

const newSchemas = new mongoose.Schema({
  // paymentId: String,
  // status: String,
  tickets: Number,
  amount: Number,
  order_id: String,
  payment_id: String,
});

const msg = mongoose.model("ticketsdT", newSchemas);

const app = express();

app.use(bodyParser.json());

// app.post('/passTicket', (req, res) => {
//   // Extract transaction data from the webhook payload
//   const transactionData = req.body.payload;

//   // console.log(transactionData);
//   // console.log("Hiii");
//   // const { id: transactionId, amount, customer } = transactionData;
// })

// app.post('/dailyPass', async(req, res) => {

// msg.order_id=32334;
// await msg.create(order_id);

// })

// new post method
// app.get('/dailyPass', async (req, res) => {

//   await msg.create({ order_id:"sadf", payment_id:"ladjkfh" });

//       res.send("nice");
//   } );

// app.get('/passTicket', (req, res)=>{
//   console.log("heey")
// })

app.use(express.static(path.join(path.resolve(), "public"))); //to serve the public folder which is static
// app.use(express.urlencoded({extended:true}));                    //to access data from the form
app.use(express.json());
app.use(cors());

app.set("view engine", "ejs");
const user = [];

const razorpay = new Razorpay({
  key_id: "rzp_test_gfdFb6h31THkeD", // Replace with your Razorpay Key ID
  key_secret: "tenbTq6iIyIWOe5ZBk55HvgW",
});

// app.get('/',(req,res)=>{
//     res.render("index",{name:"Singh"});
// const pathlocation=path.resolve();
// res.sendFile(path.join(pathlocation,"./index.html"));
// })

// app.get("/add",async (req,res)=>{
//     await msg.create({name:"ashu1",email:"sampl2e@gmail.com"})
//     res.send("Nice");
// })

app.get("/success", (req, res) => {
  res.render("success");
});
app.post("/contact", async (req, res) => {
  // console.log(req.body.name);
  await msg.create({ name: req.body.name, email: req.body.email });
  res.redirect("/about_us");
});

app.post("/payment", async (req, res) => {
  // let { amount } = req.body;

  // var instance = new Razorpay({ key_id: 'rzp_test_x9uLgNMPfHCfBD', key_secret: 'zhCXxxloLeozgaUdt2JoCUiz' });

  // let order=await instance.orders.create({
  //     amount:amount*100,
  //     currency:"INR",
  //     receipt:"receipt#1",
  // })
  // res.status(201).json({
  //     success:true,
  //     order,
  //     amount,
  // });
  const { amount, currency, receipt, payment_capture } = req.body;

  const options = {
    amount: amount * 100,
    currency: currency || "INR",
    receipt: receipt || "receipt_order_id",
    payment_capture: payment_capture || 1,
  };

  try {
    const response = await razorpay.orders.create(options);
    const orderId = response.id; // Extract the order ID from the response
    res.json({ orderId });

    console.log("payment is done");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error in creating Razorpay order");
    // res.redirect("/dailyPass");
  }
});

app.post("/razorpay/success", async (req, res) => {
  const paymentData = req.body;
  console.log("hello");
  // Save payment data to MongoDB
  const newPayment = new Payment({
    razorpay_payment_id: paymentData.razorpay_payment_id,
    amount: paymentData.amount,
    // Add other required fields
  });

  await newPayment.save();

  res.json({ success: true });
});

// payment verification

app.post("/paymentverification", async (req, res) => {
  const { order_id, payment_id, signature } = req.body;
  // const body=order_id+"|"+payment_id;
  await Payment.create({
    order_id,
    payment_id,
  });
});

app.get("/users", (req, res) => {
  res.json({
    user,
  });
});

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/index.html", (req, res) => {
  res.render("index");
});
app.get("/about_us.html", (req, res) => {
  res.render("about_us");
});
app.get("/help2.html", (req, res) => {
  res.render("help2");
});
app.get("/dailyPass.html", (req, res) => {
  res.render("dailyPass");
});
app.get("/confirm_booking.html", (req, res) => {
  res.render("confirm_booking");
});
app.get("/bookTicketnew.html", (req, res) => {
  res.render("bookTicketnew");
});
app.get("/passTicket.html", (req, res) => {
  res.render("passTicket");
  console.log("Helllo");
});
app.get("/normalTicket.html",(req,res)=>{
  res.render("normalTicket");
})
app.get("/route1.html",(req,res)=>{
  res.render("route1");
})
app.get("/route2.html",(req,res)=>{
  res.render("route2");
})
app.get("/route3.html",(req,res)=>{
  res.render("route3");
})
app.get("/route4.html",(req,res)=>{
  res.render("route4");
})
app.get("/route5.html",(req,res)=>{
  res.render("route5");
})

app.listen(5000, () => {
  console.log("Server is working");
});

// app.post('/passTicket.html', async(req, res) => {

//   // msg.create({ order_id:req.body.name});
//   res.render("confirm_booking");
//   const msssgdata={ order_id:req.body.order_id,payment_id:req.body.payment_id };
//   console.log("hello akhil");
//   console.log(msssgdata);
//   await msg.create(msssgdata);

//   } );


app.post("/passTicket.html", async (req, res) => {
  const { event, payload } = req.body;

  // Check the event type
  switch (event) {
    case "payment.captured":
      console.log("hellllllo ak");
      console.log(payload);
      console.log("event" + event);

      console.log("payloadddddddddd " + payload.payment.entity.amount);

      await handlePaymentCaptured(payload);

      // msg.order_id= payload.payment.entity.order_id;
      // msg.payment_id= payload.payment.entity.id;

      break;
    case "payment.failed":
      // await handlePaymentFailed(payload);
      console.log("skdfjhadsfdfasd");
      break;
    // Add more cases for other events as needed
  }

  // function to handlePaymentCaptured

  async function handlePaymentCaptured(payload) {
    const { payment_id, amount } = payload;

    const msssgdata = {
      // order_id:2546,
      // payment_id:1212,
      // amount:200,
      order_id: payload.payment.entity.order_id,
      payment_id: payload.payment.entity.id,
      amount: payload.payment.entity.amount / 100,
    };
    msg.create(msssgdata);

    console.log("hell");

    // try {
    //     // Save payment details to MongoDB
    //     const payment = new Payment({
    //         payment_id: payment_id,
    //         order_id: amount,

    //         // Add more fields as needed
    //     });
    //     await payment.save();
    //     console.log('Payment Captured:', payment);
    // } catch (error) {
    //     console.error('Error saving payment details:', error);
    // }
  }
  res.sendStatus(200);
});

// order_id: String,
// payment_id: String,

// const http=require('http');

// const server=http.createServer((req,res)=>{
//     if(req.url==="/about")
//     {
//         res.end("<h1>About Page <h1>");
//     }
//     else if(req.url==="/contact")
//     {
//         res.end("<h1>Contact Page <h1>");
//     }
//     else if(req.url==='/')
//     {
//         res.end("<h1>Home Page <h1>");
//     }
//     else{
//         res.end("Not Found");
//     }
// });

// server.listen(5000,(req,res)=>{
//     console.log("Server working");
// })

