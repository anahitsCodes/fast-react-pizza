import CreateUser from "../features/user/CreateUser.jsx";
import {useSelector} from "react-redux";
import Button from "./Button.jsx";

function Home() {
  const username = useSelector(state=> state.user.username)

  return (
    <div className="my-10 text-center sm:my-16 px-4 ">
      <h1 className="text-stone-800 mb-8 md:text-3xl text-center font-semibold text-xl">
        The best pizza.
        <br />
        <span className="text-yellow-500">
        Straight out of the oven, straight to you.

        </span>
      </h1>

      {!username ? <CreateUser/> : <Button type="primary" to="/menu">Continue Ordering, {username}</Button>}
    </div>
  );
}

export default Home;
