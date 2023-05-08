import React from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

let renderCount = 0;
type FormValues = {
  username: string;
  email: string;
  channel: string;
  social: {
    facebook: string;
    twitter: string;
  };
};
const YouTubeForm = () => {
  const form = useForm<FormValues>({
    defaultValues: async ()=>{
      // const res = await fetch("https://jsonplaceholder.typicode.com/users/1");
      // const data = await res.json();
      return {
        username: "",
        email: "",
        channel: "",
        social: {
          facebook: "",
          twitter: "",
        },
      };
    },
  });
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = form;
  const onSubmit = (data: FormValues) => {
    console.log("form submitted", data);
  };

  renderCount++;
  return (
    <div>
      <h1>Youtube Form ({renderCount / 2})</h1>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          {...register("username", {
            required: "Username is required",
          })}
        />
        {errors.username?.message && (
          <p style={{ color: "red" }}>{errors.username?.message}</p>
        )}

        <label htmlFor="email">E-mail</label>
        <input
          type="text"
          id="email"
          {...register("email", {
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email format",
            },
            required: "E-mail is required",

            validate: {
              notAdmin: (value) => {
                return (
                  value !== "admin@example.com" || "Enter another email  please"
                );
              },
              blackListed: (value) => {
                return !value.endsWith("bad.com") || "Email is blacklisted";
              },
            },
          })}
        />

        {errors.email?.message && (
          <p style={{ color: "red" }}>{errors.email?.message}</p>
        )}

        <label htmlFor="channel">Channel</label>
        <input
          type="text"
          id="channel"
          {...register("channel", {
            required: "Channel is required",
          })}
        />
        {errors.channel?.message && (
          <p style={{ color: "red" }}>{errors.channel?.message}</p>
        )}


<label htmlFor="twitter">Twitter</label>
        <input
          type="text"
          id="twitter"
          {...register("social.twitter")}
        />

<label htmlFor="facebook">Facebook</label>
        <input
          type="text"
          id="facebook"
          {...register("social.facebook")}
        />
      

        <button>Submit</button>
      </form>

      <DevTool control={control} />
    </div>
  );
};

export default YouTubeForm;
