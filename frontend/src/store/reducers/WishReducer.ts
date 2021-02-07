import { ActionModel, StateModel, WishState } from "../../Models/Store";
import {
  CLAIM_WISH_BEGIN,
  CLAIM_WISH_FAILURE,
  CLAIM_WISH_SUCCESS,
} from "../Actions/wishActions";

const initialState: StateModel<WishState[]> = {
  loading: false,
  error: null,
  lastFetched: Date.now(),
  data: [
    {
      wishId: "123456789",
      wishlistId: "abc123",
      title: "Test wish #1",
      description: "Test Description #1",
      avatarUrl:
        "https://www.londonsockcompany.com/wp-content/uploads/2019/08/LSC-100-cotton-canonball-grey-socks.jpg",
      purchaseUrl: "#",
      claimedBy: null,
    },
    {
      wishId: "123456781",
      wishlistId: "abc123",
      title: "Test wish #1",
      description: "Test Description #1",
      avatarUrl:
        "https://www.londonsockcompany.com/wp-content/uploads/2019/08/LSC-100-cotton-canonball-grey-socks.jpg",
      purchaseUrl: "#",
      claimedBy: null,
    },
    {
      wishId: "123456782",
      wishlistId: "abc123",
      title: "Test wish #1",
      description: "Test Description #1",
      avatarUrl:
        "https://www.londonsockcompany.com/wp-content/uploads/2019/08/LSC-100-cotton-canonball-grey-socks.jpg",
      purchaseUrl: "#",
      claimedBy: null,
    },
    {
      wishId: "123456783",
      wishlistId: "abc123",
      title: "Test wish #1",
      description: "Test Description #1",
      avatarUrl:
        "https://www.londonsockcompany.com/wp-content/uploads/2019/08/LSC-100-cotton-canonball-grey-socks.jpg",
      purchaseUrl: "#",
      claimedBy: null,
    },
  ],
};

export const wishReducer = (state = initialState, action: ActionModel) => {
  switch (action.type) {
    case CLAIM_WISH_BEGIN:
      return {
        ...state,
        loading: true,
      };

    case CLAIM_WISH_SUCCESS:
      const updatedWishes = state.data.map((wish) => {
        if (wish.wishId === action.payload.wishId) {
          return {
            ...wish,
            claimedBy: {
              userId: action.payload.userId,
              userName: action.payload.userName,
            },
          };
        } else {
          return wish;
        }
      });
      return {
        ...state,
        loading: false,
        data: updatedWishes,
      };

    case CLAIM_WISH_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
