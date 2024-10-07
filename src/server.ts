import mongoose from 'mongoose';
import app from './app';
import dbConfig from './config/db.config';


const PORT = process.env.PORT || 5000;


mongoose.connect(dbConfig.uri, {
}).then(() => {
    console.log(`Connected to MongoDB`);
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}).catch(err => console.error('Database connection error:', err));