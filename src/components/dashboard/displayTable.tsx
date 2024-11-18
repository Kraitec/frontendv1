import { Entity } from "../../services/entityService";

interface Props {
  entities: Entity[];
  onClickEdit: (id: number) => void;
  onClickEntityDelete: (id: number) => void;
  onClickTableAdd: () => void;
}

export const displayTable = ({
  entities,
  onClickEdit,
  onClickEntityDelete,
  onClickTableAdd,
}: Props) => {
  let count = 0;
  return (
    <>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Value</th>
            <th>Tag</th>
            <th>Note</th>
            <th></th>
            <th>
              <button
                type="button"
                className="btn btn-success"
                onClick={() => onClickTableAdd()}
              >
                Add
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {entities.map((entity) => {
            count++;
            return (
              <tr key={entity.id}>
                <td>{count}</td>
                <td>{entity.value}</td>
                <td>{entity.tag}</td>
                <td>{entity.note}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => onClickEdit(entity.id)}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => onClickEntityDelete(entity.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
