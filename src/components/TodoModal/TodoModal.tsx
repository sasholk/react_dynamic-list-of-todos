import React, { useContext, useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { TodosContext } from '../context/TodosContext';

// interface Props {
//   todos: Todo[],
// }

export const TodoModal: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const { setIsShow, selectedTodo, setSelectedTodo } = useContext(TodosContext);

  useEffect(() => {
    getUser(selectedTodo?.userId).then(user => setSelectedUser(user));
  }, [selectedTodo?.userId]);

  const handleClose = () => {
    setIsShow(false);
    setSelectedTodo(null);
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!selectedUser ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${selectedTodo?.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={handleClose}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              {selectedTodo?.completed ? (
                <strong className="has-text-success">
                  Done
                </strong>
              ) : (
                <strong className="has-text-danger">
                  Planned
                </strong>
              )}

              {' by '}

              <a href={`mailto:${selectedUser.email}`}>
                {selectedUser.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
