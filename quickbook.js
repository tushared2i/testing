const bodyParser = require('body-parser');
const express = require('express');
const QuickBooks = require('node-quickbooks');
const axios = require('axios');
const app = express();
const port = 3000;

// QuickBooks API credentials
const consumerKey = 'ABys9MmMoOSlJMWu1JpKBxRFHdDG4p7fgYWOrTsAWuBfG0Mnmo';
const consumerSecret = 'd54LXUCXRc0XThUg2SQ74MMowntRaR0pFw7nAfxz';
const accessToken = `eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiZGlyIn0..jw-N-hMFvxtFtjWFeW4yhg.wBF6QeNuBwL7UVAiSzf5PefHzydliWurU7zpYEhpITMj5aTrqVKyh9r7fzzzVdYKju9yxpeVkBPAW1L-rvSpraGUlOA7iJEqsRu8fWSdvMYtEjem_kL-0kKkhcJWQhGztiuWgezm34M3gF6kpEMarOmJTXEJ6NBw4P298RuReUdGj9g5iBoCtOuyQJS6MddLOSSptySXf627opyaDU_Tl54ZHKl-ojIwngevt4ARrYwMDqdMTmSau-SP7KBy4BFAr3_wWlXh1Z2QD_XmuKHtWBxoqRCXHsQ2GH4_9EDKdasfcDpZ8lmFcLL76WBMsxGDlyJCW1WN-lly19d04eU8MqopQoppf1wN4ZwONRku-Msk0ZyHtuvDesT0ECBaEPLtazOXCX26KlF6h3zPE5VlbbWulLF5iZ7zBr90Hc7mhomGnO_0l4pkPoeoV4JADmsOcgBLAl5X5KKrljsbM4lXXmpoV6iyeUMIDzddGpR0unVIBWemTfSWU6x_xaCf_abMUfENgEd7vtm2hN9_yHgMfFk2vlx4JEr2XM03uOHh-PLP6g13SLqSGn-nQLe4xEzSPeHrkzzPnOdU4RyAI95LB5Nwf99lzzTMZPy9aK7PS3jmdpsXRjq09BuQrW6RjbkSdwIhxi_OjS2x0oGlCyyvHS42vc5waMsLoswK5C3FxiUJXRBQgX_fkKDqtAV2EYMUuaZUN8p9A50WPwzxPpT7vTozU7HhHV0kMndKIFXTmmjSoEF0FoiwL8abtxzgChJP1mm7Ube8RuQuiLCMVDgx6qaD2-sPV8a6d41_hKsPKTIB4DW8cr-0Zv4hh8TngGqAlO9y0w3g_dL32SLX2Kqbqo5ye_aj7o2K4tKyqeznUbUFe2drT6ERFuAuXlZhKUw8iuj9gIHs3UUvaf_IOOA6w.pDVgmCFJr6JB5fFmPS-CVA`;
const realmId = `9130357842542146`;
const apiUrl = 'https://sandbox-quickbooks.api.intuit.com/v3/company/' + realmId + '/invoice';
const minorVersion = '70';

// Middleware to parse incoming JSON requests
app.use(bodyParser.json());

// POST endpoint to create an invoice
app.post('/createInvoice', async (req, res) => {
    try {
        // Making a POST request to QuickBooks API to create an invoice
        const response = await axios.post(apiUrl, req.body, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });

        // Logging the retrieved invoices to the console for debugging
        const invoices = response.data;
        console.log('Invoices:', invoices);

        // Sending the JSON-formatted invoices as the response back to the client
        res.json(invoices);
    } catch (error) {
        // Handling errors and sending an error response
        console.error('QuickBooks API Error:', error.message);
        res.status(500).send('Error creating invoice');
    }
});

// Handling 404 errors
app.use((req, res) => {
    logger.error("404 error : ", req.originalUrl, req.get('Host'))
    res.status(404).json({ success: false, message: 'Not Found' });
});

// Starting the server on specified port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
