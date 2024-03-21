import '../App.css';
import { Link, useParams } from 'react-router-dom';

function WelcomeComponent() {
  const { username } = useParams();

  return (
    <div className="WelcomeComponent">
      <h1>ToDo Management Application</h1>
      <h2>Welcome {username}</h2>
      <div>
        Manage your todos:{' '}
        <Link to={'/todo'}>
          <button>Click here</button>
        </Link>
      </div>
    </div>
  );
}

export default WelcomeComponent;
