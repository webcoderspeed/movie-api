import asyncHandler from 'express-async-handler';
import { Request, Response, NextFunction } from 'express';

/**
 * @description This function is used to show register page
 * @route GET /api/v1/register
 * @access Public
 */

export const registerPageUI = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.render('register');
    } catch (error) {
      next(error);
    }
  },
);

/**
 * @description This function is used to show login page
 * @route GET /api/v1/login
 * @access Public
 */

export const loginPageUI = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.render('login');
  } catch (error) {
    next(error);
  }
});

/**
 * @description This function is used to show dashboard page
 * @route GET /api/v1/dashboard
 * @access Public
 */

export const dashboardPageUI = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.render('dashboard', {
        user: { username: 'user1', password: 'password1', favoriteMovies: ['Movie 1', 'Movie 2'] },
      });
    } catch (error) {
      next(error);
    }
  },
);
