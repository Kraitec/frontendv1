import { useEffect, useRef, useState } from "react";
import navBar from "./components/shared/navBar.tsx";
import LogInForm from "./components/login/LogInForm.tsx";
import { displayTable } from "./components/dashboard/displayTable.tsx";
import { entityDialog } from "./components/dashboard/entityDialog.tsx";
import { CanceledError } from "./services/apiManager.ts";
import entityService, { Entity } from "./services/entityService.ts";
import userService, { User } from "./services/userService.ts";
import signUp from "./components/login/signUp.tsx";
import { failedEmailAlert } from "./components/login/failedEmailAlert.tsx";
import { failedPassAlert } from "./components/login/failedPassAlert.tsx";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [entities, setEntities] = useState<Entity[]>([]);

  const [isLoginActive, setIsLoginActive] = useState(false);
  const [isTableActive, setIsTableActive] = useState(false);
  const [isAddActive, setIsAddActive] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSignInActive, setIsSignInActive] = useState(false);
  const [isEmailError, setIsEmailError] = useState(false);
  const [isPassError, setIsPassError] = useState(false);
  const [currentEditID, setCurrentEditID] = useState(-1);
  const [currentUserID] = useState(-1);

  useEffect(() => {
    const { req, cancel } = userService.getAllUsers();
    req
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
      });
    return () => cancel();
  }, []);

  useEffect(() => {
    const { req, cancel } = entityService.getAllEntities();
    req
      .then((res) => {
        setEntities(res.data);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
      });
    return () => cancel();
  }, [isAddActive]);

  const valueRef = useRef(null);
  const tagRef = useRef(null);
  const noteRef = useRef(null);

  const emailRef = useRef(null);
  const passRef = useRef(null);

  const usernameAddRef = useRef(null);
  const emailAddRef = useRef(null);
  const passAddRef = useRef(null);

  const onClickEdit = (id: number) => {
    setCurrentEditID(id);
    setIsTableActive(false);
    setIsAddActive(true);
  };

  const onClickTableAdd = () => {
    setCurrentEditID(-1);
    setIsTableActive(false);
    setIsAddActive(true);
  };

  const onClickCancelAdd = () => {
    setIsAddActive(false);
    setIsTableActive(true);
  };

  const onClickEntityDelete = (id: number) => {
    const originalEntities = [...entities];
    setEntities(entities.filter((e: Entity) => e.id !== id));
    entityService.deleteEntity(id).catch((err) => {
      setEntities(originalEntities);
      console.log(err);
    });
  };

  return (
    <>
      {isLoginActive || isSignInActive
        ? null
        : navBar({
            isLogggedIn: isLoggedIn,
            setIsLoggedIn,
            setIsLoginActive,
            setIsSignInActive,
          })}
      {isLoginActive
        ? LogInForm({
            users,
            emailRef,
            passRef,
            currentUserID,
            setIsLoginActive,
            setIsLoggedIn,
            setIsTableActive,
            setIsEmailError,
            setIsPassError,
          })
        : null}
      {isSignInActive
        ? signUp({
            users,
            usernameAddRef,
            emailAddRef,
            passAddRef,
            setIsSignInActive,
            setUsers,
          })
        : null}
      {isTableActive && isLoggedIn
        ? displayTable({
            entities,
            onClickEdit,
            onClickEntityDelete,
            onClickTableAdd,
          })
        : null}
      {isAddActive
        ? entityDialog({
            entities,
            currentEditID,
            valueRef,
            tagRef,
            noteRef,
            setEntities,
            onClickCancelAdd,
          })
        : null}
      {isEmailError ? failedEmailAlert() : null}
      {isPassError ? failedPassAlert() : null}
    </>
  );
}

export default App;
