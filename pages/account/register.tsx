import { useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/lib/supabaseClient";
import { StyledRegisterForm } from "../../lib/accountStyles";
import { PT_Sans_Narrow } from "@next/font/google";

const ptSansNarrow = PT_Sans_Narrow({
  weight: ["700"],
  subsets: ["latin"],
});
export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [lengthWarning, setLengthWarning] = useState(false);
  const [characterWarning, setCharacterWarning] = useState(false);
  const [notMatchWarning, setNotMatchWarning] = useState(false);
  const router = useRouter();
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (password.length <= 8) {
      setLengthWarning(true);
      return;
    } else {
      setLengthWarning(false);
    }
    if (
      /\d/.test(password) &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password)
    ) {
      setCharacterWarning(false);
    } else {
      setCharacterWarning(true);
      return;
    }
    if (confirmPassword !== password) {
      setNotMatchWarning(true);
      return;
    }

    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      alert(error.message);
    } else {
      console.log(data.user);
      alert(
        "Registration successful! Please check your email for confirmation."
      );
      router.push("/account");
    }
  };

  return (
    <StyledRegisterForm>
      <form onSubmit={handleSubmit}>
        <h1 className={ptSansNarrow.className}>REGISTER</h1>

        <label>
          *EMAIL
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          *PASSWORD
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <p className={lengthWarning ? "warning" : ""}>
            - At least contain 8 characters
          </p>
          <p className={characterWarning ? "warning" : ""}>
            - Must contain numbers, uppercase, and lowercase characters
          </p>
        </label>
        <label>
          *CONFIRM PASSWORD
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <p
            className={
              notMatchWarning ? "notMatchWarning open" : "notMatchWarning"
            }
          >
            Password doesn&apos;t match
          </p>
        </label>
        <button type="submit">Register</button>
      </form>
    </StyledRegisterForm>
  );
}
