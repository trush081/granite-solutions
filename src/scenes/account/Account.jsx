import Login from "../../components/login/Login";
import useToken from "../../hooks/UseToken";


const Account = () => {
  const { token, setToken } = useToken();

  const Logout = () => {
    setToken(null)
    return <Login setToken={setToken} />
  }

  if(!token) {
    return <Login setToken={setToken} />
  }

  return (
    <div>
      <h1>
        you are logged in
      </h1>
      <button onClick={() => Logout()}>Log Out</button>
    </div>
  )

};

export default Account;