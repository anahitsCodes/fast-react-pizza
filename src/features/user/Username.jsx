import React from 'react';
import {useSelector} from "react-redux";

function Username() {
  const username = useSelector(state => state.user.username)

  if(!username) return null;

  return (
    <p className="text-sm  hidden md:block font-semibold">{username}</p>
  );
}

export default Username;