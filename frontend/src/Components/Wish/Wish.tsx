import { MouseEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StoreModel, WishState } from "../../Models/Store";
import { Button, ButtonTypes } from "../Button/Button";
import { claimWishFunction } from "../../Store/Actions/wishActions";
import "./Wish.scss";

interface WishProps extends WishState {
  userIsOwner: boolean;
}

export const Wish = ({
  wishId,
  title,
  description,
  avatarUrl,
  purchaseUrl,
  claimedBy,
  userIsOwner = false,
}: WishProps) => {
  const dispatch = useDispatch();
  const user = useSelector((state: StoreModel) => state.user.data);
  console.log(userIsOwner);

  const puchaseHandler = (e: MouseEvent) => {
    console.log("Purchase stuff");
  };

  const claimHandler = () => {
    dispatch(
      claimWishFunction({
        wishId,
        userId: user.userId,
        userName: `${user.firstName} ${user.lastName}`,
      })
    );
  };

  return (
    <article className="Wish">
      {claimedBy && <p>Claimed by: {claimedBy.userName}</p>}
      <div className="Wish__avatar">
        <img
          className="Wish__avatar-img"
          src={avatarUrl}
          alt="No avatar found"
        />
      </div>
      <div className="Wish__content">
        <h2 className="Wish__content-title">{title}</h2>
        <p className="Wish__content-description">{description}</p>
      </div>
      <div className="Wish__actions">
        <Button
          label="Purchase here"
          type={ButtonTypes.ACTION}
          onClick={puchaseHandler}
        />
        <Button
          label="Claim"
          type={ButtonTypes.ACTION}
          onClick={claimHandler}
        />
      </div>
      {/* {!userIsOwner && (
        <div className="Wish__claim">
          <CircleButton state={claimed} handlerFunction={claimedHandler} />
        </div>
      )} */}
    </article>
  );
};
