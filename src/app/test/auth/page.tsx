"use client";
import { cva, cx } from "class-variance-authority";
import { FormEvent, useState } from "react";

const buttonVariants = cva("px-3 py-1 rounded-md", {
  variants: {
    variant: {
      warn: "bg-yellow-500",
      success: "bg-green-500",
      info: "bg-blue-500 text-white",
    },
  },
});

export default function AuthTest() {
  return (
    // <div className="p-4 flex flex-wrap justify-center items-center gap-6">
    <div className="p-4 grid grid-cols-2 grid-rows-2 place-items-center gap-6 h-screen">
      <RegistrationForm />
      <LoginForm />
      <ConfirmEmailForm />
    </div>
  );
}

function RegistrationForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <legend className="font-bold text-xl mb-6 text-center">
        Registration
      </legend>
      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-3">
          <label htmlFor="reg-email" className="mr-2">
            Email
          </label>
          <input
            id="reg-email"
            type="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-500 focus:border-gray-800 rounded-md col-span-2 p-1"
          />
        </div>
        <div className="grid grid-cols-3">
          <label htmlFor="reg-password" className="mr-2">
            Password
          </label>
          <input
            id="reg-password"
            type="password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-500 focus:border-gray-800 rounded-md col-span-2 p-1"
          />
        </div>
      </div>
      <div className="mt-4">
        <button
          type="reset"
          className={cx(buttonVariants({ variant: "warn" }), "mr-2")}
        >
          Reset
        </button>
        <button
          type="submit"
          className={buttonVariants({ variant: "success" })}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <legend className="font-bold text-xl mb-6 text-center">Log In</legend>
      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-3">
          <label htmlFor="log-email" className="mr-2">
            Email
          </label>
          <input
            id="log-email"
            type="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-500 focus:border-gray-800 rounded-md col-span-2 p-1"
          />
        </div>
        <div className="grid grid-cols-3">
          <label htmlFor="log-password" className="mr-2">
            Password
          </label>
          <input
            id="log-password"
            type="password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-500 focus:border-gray-800 rounded-md col-span-2 p-1"
          />
        </div>
      </div>
      <div className="mt-4">
        <button
          type="reset"
          className={cx(buttonVariants({ variant: "warn" }), "mr-2")}
        >
          Reset
        </button>
        <button
          type="submit"
          className={buttonVariants({ variant: "success" })}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

function ConfirmEmailForm() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    fetch("/api/confirmEmail", {
      method: "POST",
      body: JSON.stringify({ email, code }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const resendConfirmationEmail = () => {
    fetch("/api/resendConfirmationEmail", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <form onSubmit={onSubmit} className="max-w-sm">
      <legend className="font-bold text-xl mb-6 text-center">
        Confirm email
      </legend>
      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-3">
          <label htmlFor="conf-email" className="mr-2">
            Email
          </label>
          <input
            id="conf-email"
            type="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-500 focus:border-gray-800 rounded-md col-span-2 p-1"
          />
        </div>
        <div className="grid grid-cols-3">
          <label htmlFor="conf-code" className="mr-2">
            Code
          </label>
          <input
            id="conf-code"
            type="text"
            name="code"
            required
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="border border-gray-500 focus:border-gray-800 rounded-md col-span-2 p-1"
          />
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-1">
        <button
          type="submit"
          className={cx(buttonVariants({ variant: "info" }), "w-full")}
        >
          Confirm email
        </button>
        <button
          type="button"
          className={cx(buttonVariants({ variant: "info" }), "w-full")}
          onClick={resendConfirmationEmail}
        >
          Resend confirmation code
        </button>
      </div>
    </form>
  );
}
