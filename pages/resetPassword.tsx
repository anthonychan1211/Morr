import { supabase } from "@/lib/supabaseClient";
import { UserDataType } from "@/lib/types";
import { useRouter } from "next/router";
import React, { useState } from "react";
import styled from "styled-components";

const StyledForm = styled.div`
  flex: 1;
  background-color: white;
  form {
    width: 50%;
    margin: 50px auto;
    label {
      margin-top: 20px;
    }
    button {
      margin-top: 20px;
    }
    p {
      font-size: var(--tiny-text);
    }
    .warning {
      color: red;
    }
  }
`;
const ResetPassword = ({ userData }: { userData: UserDataType }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [warning, setWarning] = useState(false);
  const [lengthWarning, setLengthWarning] = useState(false);
  const [characterWarning, setCharacterWarning] = useState(false);
  const router = useRouter();
  async function handleChangePassword(e: React.FormEvent<HTMLFormElement>) {
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
    if (password !== confirmPassword) {
      setWarning(true);
      return;
    } else {
      const { data, error } = await supabase.auth.updateUser({
        email: "new@email.com",
        password,
      });
      if (error) {
        alert(error);
      }
      if (data) {
        alert("Password is updated!");
        router.push("/");
      }
    }
  }
  return (
    <StyledForm>
      <form onSubmit={(e) => handleChangePassword(e)}>
        <label htmlFor="password">Create New Password</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className={lengthWarning ? "warning" : ""}>
          - At least contain 8 characters
        </p>
        <p className={characterWarning ? "warning" : ""}>
          - Must contain numbers, uppercase, and lowercase characters
        </p>
        <label htmlFor="confirm-password">Confirm New Password</label>
        <input
          type="password"
          name="confirm-password"
          id="confirm-password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {warning && (
          <p className="warning">The confirm password doesn&apos;t match.</p>
        )}
        <button type="submit">Confirm New Password</button>
      </form>
    </StyledForm>
  );
};

export default ResetPassword;
