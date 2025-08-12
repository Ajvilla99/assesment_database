import express from 'express';
import cors from 'cors';
import fs from 'fs';

import swaggerUi from "swagger-ui-express";
import { billingRoute, transactionRoute, usersRoutes, advanceRoutes, uploadsRoute } from './routes/index.js';

const app = express()

app.use(cors())
app.use(express.json())

// Read Swagger documentation JSON file
const swaggerDocument = JSON.parse(fs.readFileSync('./docs/api.docs.json', 'utf-8'));

// Swagger UI route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/advance', advanceRoutes);
app.use('/api/v1/billings', billingRoute);
app.use('/api/v1/upload', uploadsRoute);
app.use('/api/v1/transactions', transactionRoute);

app.listen('3000', () => {
  console.log('✅ Application running correctly on port 3000');
})