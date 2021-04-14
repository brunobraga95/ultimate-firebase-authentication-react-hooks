import './App.css';
import Firebase, { UNAUTHENTICATED, AUTHENTICATED_ANONYMOUSLY }  from './firebase';
import AuthStateProvider from './AuthStateContext';
import { useAuthStateContext } from './AuthStateContext';

const LoginExample = ({}) => {
  const { authState,  signInWithFacebook, signInWithGoogle, signOut } = useAuthStateContext();
  const userIsLoggedIn = authState.status !== UNAUTHENTICATED && authState.status !== AUTHENTICATED_ANONYMOUSLY;
  return (
    <div>
      {!userIsLoggedIn ? <div>
        <button onClick={signInWithGoogle}>
          Log in with Google
        </button>
        <button onClick={signInWithFacebook} style={{margin: "20px"}}>
          Log in with Facebook
        </button>
      </div>
      : <button onClick={signOut}>
        Log out {authState?.user?.displayName}
      </button> }
  </div>)
}
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <AuthStateProvider Firebase={new Firebase({ 
          API_KEY: "****************pkw4iUcXk",
          AUTH_DOMAIN: "***********.firebaseapp.com",
          DATABASE_URL: "*******.firebaseio.com",
          PROJECT_ID: "*****",
          STORA_BUCKET: "*********",
          MESSASING_SENDER_ID: "********",
          APP_ID: "****************",
          MEASUREMENT_ID: "********",
        })}>
          <LoginExample />
        </AuthStateProvider>
      </header>
    </div>
  );
}

export default App;
