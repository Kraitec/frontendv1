import { Dispatch, FormEvent, RefObject, SetStateAction } from "react";
import { Entity } from "../../services/entityService";
import entityService from "../../services/entityService";

interface Props {
  entities: Entity[];
  currentEditID: number;
  valueRef: RefObject<HTMLInputElement>;
  tagRef: RefObject<HTMLInputElement>;
  noteRef: RefObject<HTMLTextAreaElement>;
  setEntities: Dispatch<SetStateAction<Entity[]>>;
  onClickCancelAdd: () => void;
}

export const entityDialog = ({
  entities,
  currentEditID,
  valueRef,
  tagRef,
  noteRef,
  setEntities,
  onClickCancelAdd,
}: Props) => {
  let currentEntity = {
    id: currentEditID,
    value: "",
    tag: "",
    note: "",
  };

  if (currentEditID >= 0) {
    currentEntity =
      entities.find((e) => e.id === currentEditID) || currentEntity;
  }

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();

    let newEntity = {
      id: currentEditID,
      value: "",
      tag: "",
      note: "",
    };

    if (valueRef.current !== null) {
      newEntity.value = valueRef.current.value;
    }
    if (tagRef.current !== null) {
      newEntity.tag = tagRef.current.value;
    }
    if (noteRef.current !== null) {
      newEntity.note = noteRef.current.value;
    }

    if (currentEditID >= 0) {
      const oldUsers = [...entities];
      setEntities(
        entities.map((e) => (e.id === currentEditID ? newEntity : e))
      );
      entityService.editEntity(newEntity).catch((err) => {
        setEntities(oldUsers);
        if (err) {
          console.log(err);
        }
      });
    } else {
      const oldEntities = [...entities];
      entityService
        .addEntity(newEntity)
        .then(() => setEntities([...entities, newEntity]))
        .catch((err) => {
          setEntities(oldEntities);
          if (err) {
            console.log(err);
          }
        });
    }
  };

  return (
    <>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">
            {currentEditID >= 0
              ? 'Editing "' + currentEntity.value + '"'
              : "Add new entity"}
          </h5>
          <p className="card-text">
            Edit contents below and select save when finished
          </p>
        </div>
        <div className="card-body">
          <form onSubmit={submitHandler}>
            <div className="mb-3">
              <label className="form-label">Value</label>
              <input
                ref={valueRef}
                className="form-control"
                id="exampleFormControlInput1"
                defaultValue={currentEditID >= 0 ? currentEntity.value : ""}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Tag</label>
              <input
                ref={tagRef}
                className="form-control"
                id="exampleFormControlInput1"
                defaultValue={currentEditID >= 0 ? currentEntity.tag : ""}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Note</label>
              <textarea
                ref={noteRef}
                className="form-control"
                id="exampleFormControlTextarea1"
                defaultValue={currentEditID >= 0 ? currentEntity.note : ""}
              ></textarea>
            </div>
            <button type="submit" className="btn btn-success">
              Save
            </button>
            <button className="btn btn-danger mx-2" onClick={onClickCancelAdd}>
              Back
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
