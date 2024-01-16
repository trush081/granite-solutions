import Login from "../../components/login/Login";
import useToken from "../../hooks/UseToken";


const Account = () => {
  const { token, setToken } = useToken();

  if(!token) {
    return <Login setToken={setToken} />
  }

  return (
    <div>
      <h1>
        you are logged in
      </h1>
    </div>
  )

};

export default Account;