import { Dispatch, FormEvent, RefObject, SetStateAction } from "react";
import { User } from "../../services/userService";

interface Props {
  users: User[];
  emailRef: RefObject<HTMLInputElement>;
  passRef: RefObject<HTMLInputElement>;
  currentUserID: number;
  setIsLoginActive: Dispatch<SetStateAction<boolean>>;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  setIsTableActive: Dispatch<SetStateAction<boolean>>;
  setIsEmailError: Dispatch<SetStateAction<boolean>>;
  setIsPassError: Dispatch<SetStateAction<boolean>>;
}

const LogInForm = ({
  users,
  emailRef,
  passRef,
  currentUserID,
  setIsLoginActive,
  setIsLoggedIn,
  setIsTableActive,
  setIsEmailError,
  setIsPassError,
}: Props) => {
  let newUser = {
    id: currentUserID,
    username: "",
    email: "",
    password: "",
  };

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();
    setIsEmailError(false);
    setIsPassError(false);

    if (emailRef.current !== null) {
      newUser.email = emailRef.current.value;
    }
    if (passRef.current !== null) {
      newUser.password = passRef.current.value;
    }

    let isEmail = false;
    let isPass = false;
    for (let i = 0; i < users.length; i++) {
      if (users[i].email === newUser.email) {
        isEmail = true;
      }
      if (
        users[i].password === newUser.password &&
        users[i].email === newUser.email
      ) {
        isPass = true;
      }
    }

    if (isEmail && isPass) {
      setIsLoggedIn(true);
      setIsLoginActive(false);
      setIsTableActive(true);
    } else if (!isEmail) {
      setIsEmailError(true);
    } else {
      setIsPassError(true);
    }
  };

  return (
    <form className="m-2" onSubmit={submitHandler}>
      <div className="form-floating mb-3">
        <input
          ref={emailRef}
          type="email"
          className="form-control"
          id="floatingInput"
          placeholder="name@example.com"
        />
        <label>Email address</label>
      </div>
      <div className="form-floating">
        <input
          ref={passRef}
          type="password"
          className="form-control"
          id="floatingPassword"
          placeholder="Password"
        />
        <label>Password</label>
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default LogInForm;
