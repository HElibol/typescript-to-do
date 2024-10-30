import express, {Application} from 'express';
import router from './routes';
import cors from 'cors';
import helmet from 'helmet';

const app: Application = express();


app.use(express.json());
app.use(cors());
app.use(helmet());

app.use('/api', router);

export default app;