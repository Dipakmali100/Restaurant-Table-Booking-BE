import express from 'express';
import cors from 'cors';
import getBookedTimes from './controllers/getBookedTimes';
import bookOrder from './controllers/bookOrder';
import morgan from 'morgan';

const app=express();
const PORT=process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

// Use Morgan middleware
app.use(morgan('dev')); // 'dev' format logs concise output with color coding

app.get('/',(req,res)=>{
    res.send('Server is running...');
});

app.post('/api/getBookedTimes',getBookedTimes);
app.post('/api/bookOrder',bookOrder);


app.listen(PORT,()=>{
    console.log(`Server is running on port http://localhost:${PORT}`);
});
