export const StateAction = {
  User: {
    CheckAuth: 'user/checkAuth',
    Login: 'user/login',
    Logout: 'user/logout',
    RedirectToRoute: 'user/redirectToRoute',
  },
  Data: {
    LoadOffers: 'data/loadOffers',
    LoadOffer: 'data/loadOffer',
    LoadNearbyOffers: 'data/loadNearByOffers',
    LoadComments: 'data/loadComments',
    LoadFavorites: 'data/loadFavorites',
    SendNewComment: 'data/sendNewComment',
    ToggleFavorite: 'data/toggleFavorite',
  },
};
