import {
  UI_LOCATIONS,
  UI_PROFILE,
  UI_TOURS,
  UI_USERS,
  UI_TYPES,
  UI_TABLE_VIEW,
  UI_CARD_VIEW
} from './types';

export const useTableView = () => {
  return {
    type: UI_TABLE_VIEW
  }
}

export const useCardView = () => {
  return {
    type: UI_CARD_VIEW
  }
}
