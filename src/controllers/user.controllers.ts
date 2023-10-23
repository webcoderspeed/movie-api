import asyncHandler from 'express-async-handler';
import { Request, Response, NextFunction } from 'express';
import prisma from '../config/prisma';
import { signJwt } from '../utils/jwt.utils';
import constants from '../constants';

const { JWT_ACCESS_TOKEN_EXPIRY, JWT_ACCESS_TOKEN_SECRET, JWT_ACCESS_COOKIE_EXPIRY } =
  constants.authConstants;

/**
 * @description This function is used to register a user
 * @route POST /api/v1/users/register
 * @access Public
 * @body { email, password }
 */

export const registerUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;

      const user = await prisma.user.create({
        data: {
          email,
          password,
        },
      });

      if (user) {
        const accessToken = signJwt(user.id, JWT_ACCESS_TOKEN_SECRET, {
          expiresIn: JWT_ACCESS_TOKEN_EXPIRY,
        });

        res.cookie('accessToken', accessToken, {
          maxAge: JWT_ACCESS_COOKIE_EXPIRY,
          secure: true,
          httpOnly: true,
          sameSite: true,
        });

        res.redirect('/');
      } else {
        res.redirect('/login');
      }
    } catch (error) {
      next(error);
    }
  },
);
