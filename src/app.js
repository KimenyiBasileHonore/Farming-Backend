import express from 'express';
import cors from 'cors';
import dbConnect from './database/dbConnect';
import farmerRouter from './routes/farmerRouter';
import directorRouter from './routes/directorRouter';
import adminRouter from './routes/adminRouter';
import donationFormRouter from './routes/donationFormRouter';
import rabRouter from "./routes/rabRouter"; 
import countRouter from "./routes/countRouter";
import toolsRouter from "./routes/toolsRouter";
import feedbackRoute from "./routes/feedbackRoute";



const app = express();
dbConnect();

app.use(cors({ orgin: "*" }));
app.use(express.json());


app.use('/api/farmer', farmerRouter);
app.use('/api/donation',donationFormRouter);
app.use('/api/director', directorRouter);
app.use('/api/admin', adminRouter);
app.use('/api/reply-form',rabRouter);
app.use('/api/mateliars',toolsRouter);
app.use('/api/report',countRouter);
app.use('/api/feedback' ,feedbackRoute);

export default app;

