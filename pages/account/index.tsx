import { StyledLogInPage, StyledAccountPage } from "./styles";
import { PT_Sans_Narrow } from "@next/font/google";
import { useRouter } from "next/router";
import { supabase } from "@/lib/supabaseClient";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { SingleObject } from "@/lib/types";
const ptSansNarrow = PT_Sans_Narrow({
  weight: ["700"],
  subsets: ["latin"],
});
const Account = ({ userData }: { userData: SingleObject }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    if (userData.id) {
      setLoggedIn(true);
    }
  }, [userData]);
  const [credential, setCredential] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  async function handleLogIn(e: { preventDefault: () => void }) {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signInWithPassword(
        credential
      );
      if (data.user) window.location.reload();
    } catch (error) {
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

  return loggedIn ? (
    <StyledAccountPage>
      <p>Login as {userData.role}</p>
      <button onClick={handleLogOut}>Log Out</button>
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
          <button type="submit">LOG IN</button>
        </form>

        <div className="register">
          <h3 className={ptSansNarrow.className}>
            DON&apos;T HAVE AN ACCOUNT?
          </h3>
          <button onClick={() => router.push("/account/register")}>
            CREATE MY NEW ACCOUNT
          </button>
        </div>
      </div>
    </StyledLogInPage>
  );
};

export default Account;
