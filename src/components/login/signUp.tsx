import { Dispatch, FormEvent, RefObject, SetStateAction } from "react";
import userService, { User } from "../../services/userService";

interface Props {
  users: User[];
  usernameAddRef: RefObject<HTMLInputElement>;
  emailAddRef: RefObject<HTMLInputElement>;
  passAddRef: RefObject<HTMLInputElement>;
  setIsSignInActive: Dispatch<SetStateAction<boolean>>;
  setUsers: Dispatch<SetStateAction<User[]>>;
}

const signUp = ({
  users,
  usernameAddRef,
  emailAddRef,
  passAddRef,
  setIsSignInActive,
  setUsers,
}: Props) => {
  let newUser = {
    id: users[users.length - 1].id + 1,
    username: "",
    email: "",
    password: "",
  };

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();

    if (usernameAddRef.current !== null) {
      newUser.username = usernameAddRef.current.value;
    }
    if (emailAddRef.current !== null) {
      newUser.email = emailAddRef.current.value;
    }
    if (passAddRef.current !== null) {
      newUser.password = passAddRef.current.value;
    }

    console.log(newUser);
    setIsSignInActive(false);

    const oldUsers = [...users];
    setUsers([...users, newUser]);
    userService.addUser(newUser).catch((err) => {
      setUsers(oldUsers);
      if (err) {
        console.log(err);
      }
    });
  };

  return (
    <form className="m-2" onSubmit={submitHandler}>
      <div className="form-floating mb-3">
        <input
          ref={usernameAddRef}
          type="username"
          className="form-control"
          id="floatingInput1"
          placeholder="John_3"
        />
        <label>Username</label>
      </div>
      <div className="form-floating mb-3">
        <input
          ref={emailAddRef}
          type="email"
          className="form-control"
          id="floatingInput2"
          placeholder="name@example.com"
        />
        <label>Email address</label>
      </div>
      <div className="form-floating">
        <input
          ref={passAddRef}
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

export default signUp;
