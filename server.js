// const express = require('express');
// const nodemailer = require('nodemailer');
// const bodyParser = require('body-parser');
// const path = require('path');

// const app = express();
// const PORT = 3000;

// // Middleware to parse JSON data from the frontend
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// // Serve static files from the "public" directory
// app.use(express.static(path.join(__dirname, 'public')));

// // --- EMAIL CONFIGURATION ---
// // Replace these with your actual details
// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: 'mdumar5601@gmail.com', // PUT YOUR EMAIL HERE
//         pass: 'vccm osvj gpct wyrn'    // PUT YOUR GMAIL APP PASSWORD HERE (Not normal password)
//     }
// });

// // --- API ROUTE TO SEND EMAIL ---
// app.post('/send-order', (req, res) => {
//     const data = req.body;

//     // Email Content Design
//     const mailOptions = {
//         from: 'your-email@gmail.com',
//         to: 'your-email@gmail.com', // Receive the order at your own email
//         subject: `New PC Order: ${data.product_name} - ${data.customer_name}`,
//         html: `
//             <div style="font-family: Arial, sans-serif; color: #333;">
//                 <h2 style="color: #00e676;">New Order Received!</h2>
//                 <hr>
//                 <h3>Customer Details</h3>
//                 <p><strong>Name:</strong> ${data.customer_name}</p>
//                 <p><strong>Phone:</strong> ${data.customer_phone}</p>
//                 <p><strong>Email:</strong> ${data.customer_email}</p>
                
//                 <h3>Order Details</h3>
//                 <p><strong>Product:</strong> ${data.product_name}</p>
//                 <p><strong>Base Price:</strong> ${data.base_price}</p>
//                 <p><strong>Specs:</strong> ${data.specs_summary}</p>
                
//                 <h3>Customization Notes</h3>
//                 <p style="background: #f4f4f4; padding: 10px; border-left: 4px solid #00e676;">
//                     ${data.custom_notes || "No customization requested."}
//                 </p>
//             </div>
//         `
//     };

//     // Send the email
//     transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             console.log(error);
//             res.status(500).json({ success: false, message: 'Error sending email' });
//         } else {
//             console.log('Email sent: ' + info.response);
//             res.status(200).json({ success: true, message: 'Email sent successfully' });
//         }
//     });
// });

// // Start the Server
// app.listen(PORT, () => {
//     console.log(`Server running at http://localhost:${PORT}`);
// });



const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors'); // <--- 1. Import CORS
const path = require('path');

const app = express();
const PORT = 3000;

// --- 2. ENABLE CORS ---
app.use(cors()); 

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Email Configuration (Keep your existing settings here)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'company@gmail.com', // Your email
        pass: 'vccm osvj gpct wyrn'      // Your app password
    }
});

// Route
app.post('/send-order', (req, res) => {
    // ... (Keep your existing email logic here) ...
    const data = req.body;
    
    // ... mailOptions ...

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).json({ success: false, message: 'Error sending email' });
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).json({ success: true, message: 'Email sent successfully' });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

