import express from 'express';
import productsRouter from './routes/products.router';
import ordersRouter from './routes/orders.router';
import loginRouter from './routes/login.router';

const app = express();

app.use(express.json());

app.use('/products', productsRouter);
app.use('/orders', ordersRouter);
app.use('/login', loginRouter);

export default app;
