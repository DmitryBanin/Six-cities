import { createSlice } from '@reduxjs/toolkit';
import { DataProcess } from '../../types/state';
import { NameSpace } from '../../const';
import {
  fetchOffersAction,
  fetchOneOfferAction,
  sendNewComment,
  fetchFavoriteOffersAction,
  toggleFavorite,
} from '../api-actions';
import { toast } from 'react-toastify';

const initialState: DataProcess = {
  offers: [],
  activeOffer: null,
  comments: [],
  nearByOffers: [],
  isOffersListLoading: false,
  isActiveOfferLoading: false,
  isNewCommentSending: false,
  favoriteOffers: [],
  isActiveOfferError: false,
};

export const dataProcess = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isOffersListLoading = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.isOffersListLoading = false;
        state.offers = action.payload;
      })
      .addCase(fetchOneOfferAction.pending, (state) => {
        state.isActiveOfferLoading = true;
        state.isActiveOfferError = false;
      })
      .addCase(fetchOneOfferAction.fulfilled, (state, action) => {
        state.isActiveOfferLoading = false;
        state.activeOffer = action.payload.offer;
        state.comments = action.payload.comments;
        state.nearByOffers = action.payload.nearByOffers;
      })
      .addCase(fetchOneOfferAction.rejected, (state) => {
        state.isActiveOfferError = true;
        toast.error('Hotel ID does not exist');
      })
      .addCase(sendNewComment.pending, (state) => {
        state.isNewCommentSending = true;
      })
      .addCase(sendNewComment.fulfilled, (state, action) => {
        state.isNewCommentSending = false;
        state.comments = action.payload;
      })
      .addCase(fetchFavoriteOffersAction.fulfilled, (state, action) => {
        state.favoriteOffers = action.payload;
      })

      .addCase(toggleFavorite.fulfilled, (state, action) => {
        const offer = action.payload;

        if (offer.isFavorite) {
          state.favoriteOffers.push(offer);
        } else {

          state.favoriteOffers = state.favoriteOffers.filter(
            (item) => item.id !== offer.id
          );
        }

        const currentOffer = state.offers.find((item) => item.id === offer.id);

        if (currentOffer) {

          currentOffer.isFavorite = !currentOffer.isFavorite;
        }

        const currentNearbyOffer = state.nearByOffers.find(
          (item) => item.id === offer.id
        );
        if (currentNearbyOffer) {
          currentNearbyOffer.isFavorite = !currentNearbyOffer.isFavorite;
        }

        if (offer.id === state.activeOffer?.id) {
          state.activeOffer.isFavorite = !state.activeOffer?.isFavorite;
        }
      });
  },
});
