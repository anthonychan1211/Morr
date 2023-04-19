import { useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/lib/supabaseClient";
import { StyledRegisterForm } from "../../lib/accountStyles";
import { PT_Sans_Narrow } from "@next/font/google";
import CountrySelector from "@/components/Body/CountrySelector";
import { UserDataType } from "@/lib/types";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/high-res.css";
const ptSansNarrow = PT_Sans_Narrow({
  weight: ["700"],
  subsets: ["latin"],
});
export default function Register() {
  const [userInfo, setUserInfo] = useState<UserDataType>({
    role: "",
    id: "",
    first_name: "",
    last_name: "",
    email: "",
    address_1: "",
    address_2: "",
    city: "",
    country: "",
    postal_code: "",
    phone_num: "",
    is_default_shipping_address: true,
  });

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

    const { data, error } = await supabase.auth.signUp({
      email: userInfo.email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      const res = await fetch("/api/registerName", {
        method: "POST",
        body: JSON.stringify({
          id: data.user?.id,
          first_name: userInfo.first_name,
          last_name: userInfo.last_name,
          address_1: userInfo.address_1,
          address_2: userInfo.address_2,
          city: userInfo.city,
          country: userInfo.country,
          postal_code: userInfo.postal_code,
          phone_num: userInfo.phone_num,
          is_default_shipping_address: userInfo.is_default_shipping_address,
        }),
      });
      const result = await res.json();
      console.log(result);
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
        <div className="name-section">
          <label>
            *First Name
            <input
              type="text"
              value={userInfo.first_name}
              name="first_name"
              onChange={(e) =>
                setUserInfo({ ...userInfo, [e.target.name]: e.target.value })
              }
              required
            />
          </label>
          <label>
            *Last Name
            <input
              type="text"
              value={userInfo.last_name}
              name="last_name"
              onChange={(e) =>
                setUserInfo({ ...userInfo, [e.target.name]: e.target.value })
              }
              required
            />
          </label>
        </div>
        <label>
          *EMAIL
          <input
            type="email"
            value={userInfo.email}
            name="email"
            onChange={(e) =>
              setUserInfo({ ...userInfo, [e.target.name]: e.target.value })
            }
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

        <h1 className={ptSansNarrow.className}>
          BILLING INFORMATION
          <span
            style={{
              fontSize: "18px",
              fontFamily:
                "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif",
              fontWeight: "200",
            }}
          >
            (Optional)
          </span>
        </h1>

        <label>
          ADDRESS LINE 1
          <input
            type="text"
            value={userInfo.address_1}
            name="address_1"
            onChange={(e) =>
              setUserInfo({ ...userInfo, [e.target.name]: e.target.value })
            }
          />
        </label>
        <label>
          ADDRESS LINE 2
          <input
            type="text"
            value={userInfo.address_2}
            name="address_2"
            onChange={(e) =>
              setUserInfo({ ...userInfo, [e.target.name]: e.target.value })
            }
          />
        </label>
        <label>
          City
          <input
            type="text"
            value={userInfo.city}
            name="city"
            onChange={(e) =>
              setUserInfo({ ...userInfo, [e.target.name]: e.target.value })
            }
          />
        </label>
        <CountrySelector
          edit={true}
          userInfo={userInfo}
          setUserInfo={setUserInfo}
        />
        <label>
          Postal Code
          <input
            type="text"
            value={userInfo.postal_code}
            name="postal_code"
            onChange={(e) =>
              setUserInfo({ ...userInfo, [e.target.name]: e.target.value })
            }
          />
        </label>

        <label>
          Phone Number
          <PhoneInput
            country={"gb"}
            value={userInfo.phone_num}
            inputStyle={{
              fontSize: "16px",
              height: "80%",
              padding: "14px",
              paddingLeft: "60px",
              width: "100%",
              borderColor: "#dddddd",
            }}
            onChange={(value) => setUserInfo({ ...userInfo, phone_num: value })}
          />
        </label>
        <div className="default-address">
          <input
            type="checkbox"
            name="is_default_shipping_address"
            id="is_default_shipping_address"
            checked={userInfo.is_default_shipping_address}
            onChange={(e) =>
              setUserInfo({
                ...userInfo,
                is_default_shipping_address: e.target.checked,
              })
            }
          />
          <label
            htmlFor="is_default_shipping_address"
            className="checkbox-label"
          >
            Default Shipping Address
          </label>
        </div>
        <button type="submit">Register</button>
      </form>
    </StyledRegisterForm>
  );
}
