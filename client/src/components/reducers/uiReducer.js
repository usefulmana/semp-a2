import {
  UI_LOCATIONS,
  UI_PROFILE,
  UI_TOURS,
  UI_USERS,
  UI_TYPES,
  UI_TABLE_VIEW,
  UI_CARD_VIEW
} from './../actions/types';

const initialState = {
  card: true
};

export default function (state = initialState, action) {
  switch (action.type) {
    case UI_CARD_VIEW:
      return {
        ...state,
        card: true
      }
    case UI_TABLE_VIEW:
      return {
        ...state,
        card: false
      }
    default:
      return state;
  }}
