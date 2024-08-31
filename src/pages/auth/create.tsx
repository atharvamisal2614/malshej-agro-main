import { BASE_URL } from "@/utils/config";
import axios from "axios";
import React, { useState, type FormEvent } from "react";
import { toast } from "react-toastify";

const SignUp = (): JSX.Element => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    if (email.length === 0) return;
    if (password.length === 0) return;

    try {
      const url = `${BASE_URL}/api/auth/signup`;
      const data = {
        name,
        email,
        password,
      };
      const res = await axios.post(url, data);
      toast.success(res.data.message as string);
    } catch (error) {
      console.log(error);
      toast.error("Unknown Error Occured");
    }
  };

  return (
    <>
      <div className="m-auto my-10 max-w-lg rounded border p-5 shadow">
        <h2>Sign Up</h2>
        <form
          onSubmit={(e) => {
            void handleSignUp(e);
          }}
        >
          <p className="mt-5 font-semibold">Name</p>
          <input
            type="name"
            placeholder="Pranit Patil"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            className="w-full rounded border px-2 py-1 outline-none"
          />
          <p className="mt-5 font-semibold">Email</p>
          <input
            type="email"
            placeholder="psp@gmail.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="w-full rounded border px-2 py-1 outline-none"
          />
          <p className="mt-5 font-semibold">Password</p>
          <input
            type="password"
            placeholder="**********"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="w-full rounded border px-2 py-1 outline-none"
          />

          <button type="submit" className="my-5 w-full rounded bg-primary">
            Sign Up
          </button>
        </form>
      </div>
    </>
  );
};

export default SignUp;
