import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import actualitesRoutes from './routes/actualites.routes';
import evenementsRoutes from './routes/evenements.routes';
import servicesRoutes from './routes/services.routes';
import contactRoutes from './routes/contact.routes';
import participationRoutes from './routes/participation.routes';
import transparenceRoutes from './routes/transparence.routes';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/actualites', actualitesRoutes);
app.use('/api/evenements', evenementsRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/participation', participationRoutes);
app.use('/api/transparence', transparenceRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/sidi-bennour-db')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);

}); 