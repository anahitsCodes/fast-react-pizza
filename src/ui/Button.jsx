import React from 'react';
import {Link} from "react-router-dom";

function Button({children, disabled, to, type, onClick}) {
  const base = "bg-yellow-400 text-sm rounded-full font-semibold uppercase hover:bg-yellow-300 duration-300 focus:ring focus:ring-yellow-300 " +
    "disabled:cursor-not-allowed focus:ring-offset-2 focus:bg-yellow-300 focus:outline-none transition-colors text-stone-800 tracking-wide inline-block ";
  const styles = {
    primary: base + 'md:px-6 md:py-4 px-4 py-3',
    round:base + 'py-1 md:px-3.5 md:py-2 px-2.5 text-sm',
    small: base + 'py-2 md:px-5 md:py-2.5 px-4 text-xs',
    secondary: 'inline-block rounded-full border-2 border-stone-300 ' +
      'font-semibold uppercase tracking-wide hover:bg-stone-300 text-stone-400' +
      ' transition-colors duration-300 hover:text-stone-800 ' +
      'focus:bg-stone-300 focus:text-stone-800 focus:outline-none focus:ring ' +
      'focus:ring-stone-200 focus:ring-offset-2 ' +
      'disabled:cursor-not-allowed px-4 py-2.5 md:px-6 md:py-3.5 '
  }

  if (to) {
    return (<Link className={styles[type]} to={to}>{children}</Link>)
  }


  if (onClick) {
    return (<button onClick={onClick} disabled={disabled} className={styles[type]}>{children}</button>)
  }

  return (
    <>
      <button disabled={disabled} className={styles[type]}>{children}</button>

    </>
  );
}

export default Button;