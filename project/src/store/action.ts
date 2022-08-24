import { createAction } from '@reduxjs/toolkit';
import { AppRoute } from '../const';
import { StateAction } from './action-types';

export const redirectToRoute = createAction<AppRoute>(StateAction.User.RedirectToRoute);

