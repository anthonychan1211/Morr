import { StyledLogInPage, StyledAccountPage } from "../../lib/accountStyles";
import { PT_Sans_Narrow } from "@next/font/google";
import { supabase } from "@/lib/supabaseClient";
import {
  ChangeEvent,
  FormEvent,
  MouseEvent,
  useContext,
  useEffect,
  useState,
} from "react";
import { UserDataType } from "@/lib/types";
import Link from "next/link";
import CountrySelector from "@/components/Body/CountrySelector";
import { Context } from "@/lib/context";
import { handleUpdateUser, handleUserInfoChange } from "@/lib/functions";
const ptSansNarrow = PT_Sans_Narrow({
  weight: ["700"],
  subsets: ["latin"],
});
const Account = ({ userData }: { userData: UserDataType }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [warning, setWarning] = useState(false);
  const [userInfo, setUserInfo] = useState<UserDataType>(userData);
  const [resetPasswordEmail, setResetPasswordEmail] = useState("");
  const [edit, setEdit] = useState(false);
  const { setLoading } = useContext(Context);
  useEffect(() => {
    if (userData.id) {
      setLoggedIn(true);
      setUserInfo(userData);
    }
  }, [userData]);
  const [credential, setCredential] = useState({
    email: "",
    password: "",
  });
  async function handleLogIn(e: { preventDefault: () => void }) {
    e.preventDefault();
    setWarning(false);
    const { data, error } = await supabase.auth.signInWithPassword(credential);
    if (data.user) {
      window.location.reload();
    } else {
      setWarning(true);
      console.log(error);
    }
  }
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  }
  async function handleLogOut() {
    const { error } = await supabase.auth.signOut();
    window.location.reload();
  }
  async function handleResetPassword(e: MouseEvent) {
    e.preventDefault();
    setLoading(true);
    if (resetPasswordEmail !== userData.email) {
      setWarning(true);
      return;
    } else {
      setWarning(false);
      let { data, error } = await supabase.auth.resetPasswordForEmail(
        resetPasswordEmail
      );
      if (error) {
        alert(error);
      }
      if (data) {
        setLoading(false);
        alert(`Email has sent to ${resetPasswordEmail}`);
      }
    }
  }

  return loggedIn ? (
    <StyledAccountPage>
      <div className="welcome-section">
        <p className="welcome">Welcome Back, {userInfo.first_name}.</p>
        <button onClick={handleLogOut} className="log-out">
          Log Out
        </button>
      </div>
      <form
        className="info"
        onSubmit={(e) => {
          setEdit(false);
          handleUpdateUser(e, userInfo, setLoading);
        }}
      >
        <h3>Basic Information</h3>
        <div className="inputs">
          <div className="input-field">
            <label htmlFor="first_name">First Name</label>
            <input
              type="text"
              name="first_name"
              className="firstName"
              defaultValue={userInfo.first_name}
              disabled={!edit}
              onChange={(e) => handleUserInfoChange(e, setUserInfo, userInfo)}
            />
          </div>
          <div className="input-field">
            <label htmlFor="last_name">Last Name</label>
            <input
              type="text"
              name="lastName"
              defaultValue={userInfo.last_name}
              disabled={!edit}
              onChange={(e) => handleUserInfoChange(e, setUserInfo, userInfo)}
            />
          </div>
          <div className="input-field">
            <label htmlFor="address_1">Address 1</label>
            <input
              type="text"
              name="address_1"
              disabled={!edit}
              defaultValue={userInfo.address_1}
              onChange={(e) => handleUserInfoChange(e, setUserInfo, userInfo)}
            />
          </div>
          <div className="input-field">
            <label htmlFor="address_2">Address 2</label>
            <input
              type="text"
              name="address_2"
              disabled={!edit}
              onChange={(e) => handleUserInfoChange(e, setUserInfo, userInfo)}
              defaultValue={userInfo.address_2}
            />
          </div>

          <div className="input-field">
            <label htmlFor="city">City</label>
            <input
              id="city"
              type="text"
              name="city"
              disabled={!edit}
              defaultValue={userInfo.city}
              onChange={(e) => handleUserInfoChange(e, setUserInfo, userInfo)}
            />
          </div>
          <div className="input-field">
            <CountrySelector
              edit={edit}
              setUserInfo={setUserInfo}
              userInfo={userInfo}
            />
          </div>

          <div className="input-field">
            <label htmlFor="postal_code">Postal Code</label>
            <input
              type="text"
              name="postal_code"
              id="postal_code"
              disabled={!edit}
              defaultValue={userInfo.postal_code}
              onChange={(e) => handleUserInfoChange(e, setUserInfo, userInfo)}
            />
          </div>
        </div>
        <div className="default-address">
          <input
            type="checkbox"
            name="is_default_shipping_address"
            id="is_default_shipping_address"
            disabled={!edit}
            checked={userInfo.is_default_shipping_address}
            onChange={(e) => handleUserInfoChange(e, setUserInfo, userInfo)}
          />
          <label htmlFor="is_default_shipping_address">
            Default Shipping Address
          </label>
        </div>
        {edit && <button type="submit">Save</button>}
        <button
          type="button"
          className={edit ? "cancel" : ""}
          onClick={() => setEdit(!edit)}
        >
          {edit ? "Cancel" : "Edit"}
        </button>
      </form>
      <form className="security">
        <h3>Reset Password via Email</h3>
        <label>
          Please eneter your account Email address below and we will send an
          email to reset your password. You may go to the email and click the
          &quot;Reset Password&quot;. (It could end up in spam.)
        </label>
        <input
          type="email"
          name="reset-email"
          onChange={(e) =>
            setResetPasswordEmail((e.target as HTMLInputElement).value)
          }
        />
        {warning && <p className="warning">This is not the account email.</p>}
        <button onClick={(e) => handleResetPassword(e)}>Reset Password</button>
      </form>
    </StyledAccountPage>
  ) : (
    <StyledLogInPage>
      <div className="content">
        <form className="log-in" onSubmit={handleLogIn}>
          <h3 className={ptSansNarrow.className}>MY ACCOUNT</h3>
          <label htmlFor="email">*EMAIL</label>
          <input type="email" name="email" onChange={(e) => handleChange(e)} />
          <label htmlFor="password">*PASSWORD</label>
          <input
            type="password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          {warning && <p className="warning">Incorrect Credentials</p>}
          <button type="submit">LOG IN</button>
        </form>

        <div className="register">
          <h3 className={ptSansNarrow.className}>
            DON&apos;T HAVE AN ACCOUNT?
          </h3>
          <Link className="link" href={"/account/register"}>
            CREATE MY NEW ACCOUNT
          </Link>
        </div>
      </div>
    </StyledLogInPage>
  );
};

export default Account;
