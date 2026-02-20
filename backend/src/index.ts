import express from 'express';
import routes from './routes';
import cors, { CorsOptions } from 'cors';

const app = express();

const allowedOrigins = ['https://scouts.camcam.dev', 'localhost'];
// eslint-disable-next-line no-undef
if (process.env.NODE_ENV !== 'production') {
  allowedOrigins.push('http://localhost:8080');
  allowedOrigins.push('http://localhost:5173');
}

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use('/v1', routes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
