import asyncHandler from 'express-async-handler';
import { Request, Response, NextFunction } from 'express';
import prisma from '../config/prisma';

/**
 * @description This function is used to create movies
 * @route POST /api/v1/movies
 * @access Public
 * @body {  movieName, rating, genre, releaseDate, cast[] }
 */

export const createMovie = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { movieName, rating, genre, releaseDate, cast } = req.body;

    const movie = await prisma.movie.create({
      data: {
        genre,
        movieName,
        rating: Number(rating),
        releaseDate: new Date(releaseDate),
      },
    });

    if (cast) {
      const castNames = cast.split(',');
      for (const name of castNames) {
        await prisma.cast.create({
          data: {
            name,
            movieId: movie.id,
          },
        });
      }
    }

    res.redirect('/');
  } catch (error) {
    next(error);
  }
});
