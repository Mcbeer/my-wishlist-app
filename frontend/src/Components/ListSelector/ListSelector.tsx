import { BsChevronRight } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ListState, StoreModel } from "../../Models/Store";
import "./ListSelector.scss";

interface ListSelectorProps {
  listId: string;
  title: string;
  owner: string;
  description: string;
}

export const ListSelector = () => {
  const lists = useSelector((state: StoreModel) => state.lists);

  return (
    <>
      {lists.loading && <div>I am loading...</div>}
      {lists.data && (
        <ul>
          {lists.data.map((listItem: ListState) => (
            <ListSelectorEntry {...listItem} key={listItem.listId} />
          ))}
        </ul>
      )}
    </>
  );
};

export const ListSelectorEntry = ({
  listId = "",
  title = "",
  owner = "",
}: ListSelectorProps) => (
  <li className="ListSelectorEntry">
    <Link
      to={(location) => `${location.pathname}/${listId}`}
      className="ListSelectorEntry__button"
    >
      <div className="ListSelectorEntry__content">
        <h2 className="ListSelectorEntry__title">{title}</h2>
        <p className="ListSelectorEntry__owner">{owner}</p>
      </div>
      <div className="ListSelectorEntry__chevron">
        <BsChevronRight size="2rem" />
      </div>
    </Link>
  </li>
);
