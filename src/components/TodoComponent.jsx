import { useNavigate, useParams } from 'react-router-dom';
import {
  createTodoApi,
  readTodoApi,
  updateTodoApi,
} from '../api/TodoApiService';
import { useAuth } from '../security/AuthContext';
import { useEffect, useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';

function TodoComponent() {
  const { id } = useParams();
  const authContext = useAuth();
  const navigate = useNavigate();
  const username = authContext.username;
  const [description, setDescription] = useState('');
  const [targetDate, setTargetDate] = useState('');

  useEffect(() => retrieveTodo(), [id]);

  function retrieveTodo() {
    if (id != -1) {
      readTodoApi(username, id)
        .then(response => {
          setDescription(response.data.description);
          setTargetDate(response.data.targetDate);
        })
        .catch(error => console.log(error));
    } else {
      setDescription('');
      setTargetDate('');
    }
  }

  function onSubmit(values) {
    const todo = {
      id: id,
      username: username,
      description: values.description,
      targetDate: values.targetDate,
      isDone: false,
    };
    if (id != -1) {
      updateTodoApi(todo)
        .then(response => {
          navigate('/todos');
        })
        .catch(error => {
          console.log(error);
          alert('An error occurred while updating the todo');
        });
    } else {
      createTodoApi(todo)
        .then(response => {
          setDescription('');
          setTargetDate('');
          navigate('/todos');
        })
        .catch(error => {
          console.log(error);
          alert('An error occurred while adding the todo');
        });
    }
  }

  function validate(values) {
    let errors = {};
    if (!values.description) {
      errors.description = 'Enter a description';
    } else if (values.description.length < 5) {
      errors.description = 'Enter at least 5 characters in description';
    }

    if (values.targetDate == '') {
      errors.targetDate = 'Enter a target date';
    }
    console.log(`{\n  targetDate:  ${targetDate} \n  description: ${description}\n}`);
    return errors;
  }

  return (
    <div className="TodoComponent">
      <div className="container">
        <header>
          <h1 className="display-6">Enter Todo Details</h1>
        </header>
      </div>
      <div className="w-50 mx-auto container">
        <Formik
          initialValues={{ description, targetDate }}
          enableReinitialize={true}
          onSubmit={onSubmit}
          validate={validate}
          validateOnBlur={false}
          validateOnChange={false}
        >
          {props => (
            <Form>
              <fieldset className="mb-4">
                <label className="form-label">Description</label>
                <Field
                  type="text"
                  className="form-control"
                  name="description"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="invalid-feedback d-block"
                />
              </fieldset>
              <fieldset className="mb-4">
                <label className="form-label">Target Date</label>
                <Field type="date" className="form-control" name="targetDate" />
                <ErrorMessage
                  name="targetDate"
                  component="div"
                  className="invalid-feedback d-block"
                />
              </fieldset>

              <div className="text-center">
                <button className="btn btn-success m-5" type="submit">
                  Save
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default TodoComponent;
