import { initialState, UserState, userAdapter } from './state';
import { Actions, ActionTypes } from './actions';

export function reducer(state = initialState, action: Actions): UserState {
  switch (action.type) {
    case ActionTypes.LOAD: {
      return {
        ...state,
        isLoading: true,
        error: null,
        pendingItem: null,
      };
    }
    case ActionTypes.LOAD_SUCCESS: {
      return userAdapter.setAll(action.payload.items, {
        ...state,
        isLoading: false,
        count: action.payload.items.length,
        error: null,
        pendingItem: null,
      });
    }
    case ActionTypes.LOAD_ITEM: {
      return {
        ...state,
        isLoading: true,
        error: null,
        pendingItem: null,
      };
    }
    case ActionTypes.DELETE_SUCCESS: {
      return userAdapter.removeOne(action.payload.id, {
        ...state,
        isLoading: false,
        error: null,
      });
    }
    case ActionTypes.ADD_SUCCESS:
    case ActionTypes.UPSERT_ITEM: {
      return userAdapter.upsertOne(action.payload.item, {
        ...state,
        isLoading: false,
        pendingItem: null,
        error: null,
      });
    }
    case ActionTypes.ADD:
    case ActionTypes.UPDATE: {
      return {
        ...state,
        isLoading: true,
        error: null,
        pendingItem: action.payload.item,
      };
    }
    case ActionTypes.UPSERT_ITEMS: {
      return userAdapter.upsertMany(action.payload.items, {
        ...state,
        isLoading: false,
        pendingItem: null,
        error: null,
      });
    }

    case ActionTypes.DELETE: {
      return {
        ...state,
        isLoading: true,
        error: null,
        pendingItem: { id: action.payload.id },
      };
    }
    case ActionTypes.FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };
    }
    default:
      return state;
  }
}
