import { StyledLogInPage, StyledAccountPage } from "../../lib/accountStyles";
import { PT_Sans_Narrow } from "@next/font/google";
import { supabase } from "@/lib/supabaseClient";
import {
  ChangeEvent,
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
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/high-res.css";
import { Montserrat } from "@next/font/google";
const montserratThin = Montserrat({
  subsets: ["latin"],
  weight: ["300"],
});
const ptSansNarrow = PT_Sans_Narrow({
  weight: ["700"],
  subsets: ["latin"],
});
const Account = ({ userData }: { userData: UserDataType }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [logInWarning, setLogInWarning] = useState(false);
  const [resetPasswordWarning, setResetPasswordWarning] = useState(false);
  const [newPassword, setNewPassword] = useState<{
    new: string;
    confirmNew: string;
  }>({
    new: "",
    confirmNew: "",
  });
  const [userInfo, setUserInfo] = useState<UserDataType>(userData);
  const [resetPasswordEmail, setResetPasswordEmail] = useState("");
  const [edit, setEdit] = useState(false);
  const { setLoading } = useContext(Context);
  const [notMatchWarning, setNotMatchWarning] = useState(false);
  const [showForgetPassword, setShowForgetPassword] = useState(false);
  useEffect(() => {
    setLoading(true);
    if (userData.id) {
      setLoggedIn(true);
      setUserInfo(userData);
    }
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);
  const [credential, setCredential] = useState({
    email: "",
    password: "",
  });
  async function handleLogIn(e: { preventDefault: () => void }) {
    e.preventDefault();
    setLogInWarning(false);
    const { data, error } = await supabase.auth.signInWithPassword(credential);
    if (data.user) {
      window.location.reload();
    } else {
      setLogInWarning(true);
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
    console.log(resetPasswordEmail);
    if (userData.email !== "" && resetPasswordEmail !== userData.email) {
      setResetPasswordWarning(true);
      return;
    } else {
      setResetPasswordWarning(false);
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
  async function handleChangePassword(e: { preventDefault: () => void }) {
    e.preventDefault();
    if (newPassword.new !== newPassword.confirmNew) {
      setNotMatchWarning(true);
      return;
    } else {
      const { data, error } = await supabase.auth.updateUser({
        email: userData.email,
        password: newPassword.new,
      });
      if (error) {
        alert(error);
      } else if (data) {
        alert("password has been updated");
        window.location.reload();
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
            <label htmlFor="country">Country</label>
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

          <div className="input-field">
            <label htmlFor="postal_code">Phone Number</label>
            <PhoneInput
              country={"us"}
              disabled={!edit}
              value={userInfo.phone_num}
              inputStyle={{
                fontSize: "16px",
                height: "80%",
                padding: "14px",
                paddingLeft: "60px",
                width: "100%",
                borderColor: "#dddddd",
              }}
              onChange={(value) =>
                setUserInfo({ ...userInfo, phone_num: value })
              }
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
        <h3>Change Your Password</h3>
        <label>New Password*</label>
        <input
          type="password"
          name="password"
          onChange={(e) =>
            setNewPassword({
              ...newPassword,
              new: (e.target as HTMLInputElement).value,
            })
          }
        />
        <label>Confirm New Password*</label>
        <input
          type="password"
          name="confirm-password"
          onChange={(e) =>
            setNewPassword({
              ...newPassword,
              confirmNew: (e.target as HTMLInputElement).value,
            })
          }
        />
        <p
          className={
            notMatchWarning ? "notMatchWarning open" : "notMatchWarning"
          }
        >
          Password doesn&apos;t match
        </p>
        <button onClick={(e) => handleChangePassword(e)}>
          Change Password
        </button>
      </form>
    </StyledAccountPage>
  ) : (
    <StyledLogInPage>
      <div className="content">
        <div className="log-in">
          <form onSubmit={handleLogIn}>
            <h3 className={ptSansNarrow.className}>MY ACCOUNT</h3>
            <label htmlFor="email" className={montserratThin.className}>
              *EMAIL
            </label>
            <input
              type="email"
              name="email"
              onChange={(e) => handleChange(e)}
            />
            <label htmlFor="password" className={montserratThin.className}>
              *PASSWORD
            </label>
            <input
              type="password"
              name="password"
              onChange={(e) => handleChange(e)}
            />
            {logInWarning && <p className="warning">Incorrect Credentials</p>}
            <button type="submit" className={montserratThin.className}>
              LOG IN
            </button>
          </form>
          <button
            className="forget-password"
            onClick={() => setShowForgetPassword(!showForgetPassword)}
          >
            Forget Password?
          </button>
          {showForgetPassword && (
            <form className="security">
              <h3>Reset Password via Email</h3>
              <label>
                Please eneter your account Email address below and we will send
                an email to reset your password. You may go to the email and
                click the &quot;Reset Password&quot;. (It could end up in spam.)
              </label>
              <input
                type="email"
                name="reset-email"
                onChange={(e) =>
                  setResetPasswordEmail((e.target as HTMLInputElement).value)
                }
              />

              <button type="button" onClick={(e) => handleResetPassword(e)}>
                Reset Password
              </button>
              {resetPasswordWarning && (
                <p className="warning">This email is not registered.</p>
              )}
            </form>
          )}
        </div>
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
