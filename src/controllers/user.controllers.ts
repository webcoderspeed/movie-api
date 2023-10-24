import asyncHandler from 'express-async-handler';
import { Request, Response, NextFunction } from 'express';
import prisma from '../config/prisma';
import { signJwt } from '../utils/jwt.utils';
import constants from '../constants';
import bcrypt from 'bcrypt';

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

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
        },
      });

      if (user) {
        const accessToken = signJwt(user.id, JWT_ACCESS_TOKEN_SECRET, {
          expiresIn: JWT_ACCESS_TOKEN_EXPIRY,
        });

        const userAgent = req.headers['user-agent'];

        if (userAgent && userAgent.includes('PostmanRuntime')) {
          // Return a JSON response
          res.status(200).json({ accessToken });
        } else {
          // Redirect to a page
          res.cookie('accessToken', accessToken, {
            maxAge: JWT_ACCESS_COOKIE_EXPIRY,
            secure: true,
            httpOnly: true,
            sameSite: true,
          });
          res.redirect('/');
        }
      } else {
        res.redirect('/login');
      }
    } catch (error) {
      next(error);
    }
  },
);

/**
 * @description This function is used to login a user
 * @route POST /api/v1/users/login
 * @access Public
 * @body { email, password }
 */

export const loginUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw Error('User not found!');
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!req.headers['user-agent']?.includes('Postman')) {
      if (isPasswordMatch) {
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
    } else {
      // If the user agent is not a browser, return a JSON response
      if (isPasswordMatch) {
        const accessToken = signJwt(user.id, JWT_ACCESS_TOKEN_SECRET, {
          expiresIn: JWT_ACCESS_TOKEN_EXPIRY,
        });

        res.status(200).json({ accessToken });
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    }
  } catch (error) {
    next(error);
  }
});
