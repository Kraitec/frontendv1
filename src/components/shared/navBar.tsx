import { Dispatch, SetStateAction } from "react";

interface Props {
  isLogggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  setIsLoginActive: Dispatch<SetStateAction<boolean>>;
  setIsSignInActive: Dispatch<SetStateAction<boolean>>;
}

export const navBar = ({
  isLogggedIn,
  setIsLoggedIn,
  setIsLoginActive,
  setIsSignInActive,
}: Props) => {
  const onClickLoginHandler = () => {
    if (isLogggedIn) {
      setIsLoggedIn(false);
    } else {
      setIsLoginActive(true);
    }
  };

  const onClickSignInHandler = () => {
    setIsSignInActive(true);
  };

  return (
    <>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            AAron
          </a>
          <div>
            <button
              type="button"
              className="btn btn-success m-2"
              onClick={onClickLoginHandler}
            >
              {isLogggedIn ? "Logout" : "Login"}
            </button>
            {isLogggedIn ? null : (
              <button
                type="button"
                className="btn btn-info"
                onClick={onClickSignInHandler}
              >
                Sign Up
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default navBar;
