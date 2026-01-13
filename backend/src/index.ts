import express from 'express';
import healthRouter from './routes/health';

const app = express();

app.use(express.json());
app.use('/api/v1/health', healthRouter);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
