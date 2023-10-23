import { Express } from 'express';
import { Request, Response } from 'express';

const renderTemplate = (app: Express) => {
  app.get('/', (req: Request, res: Response) => {
    res.render('dashboard', {
      user: { username: 'user1', password: 'password1', favoriteMovies: ['Movie 1', 'Movie 2'] },
    });
  });

  app.get('/register', (req: Request, res: Response) => {
    res.render('register');
  });

  // Login route
  app.get('/login', (req: Request, res: Response) => {
    res.render('login');
  });
};

export default renderTemplate;
