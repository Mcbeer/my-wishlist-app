import { useHistory } from "react-router-dom";
import "./Landing.scss";

export const Landing = () => {
  const history = useHistory();
  return (
    <div className="Landing">
      <h1 className="Landing__title">Landing page</h1>

      <button onClick={() => history.push("/lists")}>To app!</button>
    </div>
  );
};
