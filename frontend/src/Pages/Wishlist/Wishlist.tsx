import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Wish } from "../../Components/Wish/Wish";
import { StoreModel, WishState } from "../../Models/Store";

export const Wishlist = () => {
  const { listId } = useParams<{ listId: string }>();
  const listInfo = useSelector((state: StoreModel) =>
    state.lists.data.find((list) => list.listId === listId)
  );
  const wishesOnList = useSelector((state: StoreModel) =>
    state.wishes.data.filter((wish) => wish.wishlistId === listId || "")
  );
  const { userId } = useSelector((state: StoreModel) => state.user.data);
  return (
    <div>
      <ul>
        {wishesOnList.map((wish: WishState) => (
          <li key={wish.wishId}>
            <Wish {...wish} userIsOwner={listInfo?.owner === userId} />
          </li>
        ))}
      </ul>
    </div>
  );
};
