/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { useForm, FieldErrors } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { clsxm } from "../utils/clsxm";
import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Form submission state
// useful for tracking the progress and outcome of form submission
// - isSubmitting
// - isSubmitted
// - isSubmitSuccessful
// - submitCount

const schema = yup.object({
  username: yup.string().required("Username is required"),
  email: yup
    .string()
    .email("Please input a valid email")
    .required("Email is required"),
  channel: yup.string().required("Channel is required"),
});
type FormValues = {
  username: string;
  email: string;
  channel: string;
};
const YupForm = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      username: "",
      email: "",
      channel: "",
    },
    mode: "all",
    resolver: yupResolver(schema),
  });
  const { register, control, handleSubmit, formState, watch, reset } = form;

  const username = watch("username");
  const watchFields = watch(["username", "email"]);
  const watchForm = watch();
  const {
    errors,

    isSubmitSuccessful,
  } = formState;

  const onSubmit = (data: FormValues) => {
    console.log("form submitted", data);
  };
  const onError = (errors: FieldErrors<FormValues>) => {
    console.log(errors);
  };
  // watch callback
  useEffect(() => {
    const subscription = watch((value) => {
      console.log(value);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  // reset form when submit success
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);
  return (
    <div className="min-h-screen w-full grid place-content-center">
      <h1 className="text-4xl">{username}</h1>
      <h1 className="text-4xl">{watchFields}</h1>
      <h1>{JSON.stringify(watchForm)}</h1>
      <form
        className="w-full max-w-[450px] bg-white shadow-lg px-4  py-8 md:min-w-[450px] space-y-4"
        onSubmit={handleSubmit(onSubmit, onError)}
        noValidate
      >
        <div className="flex flex-col space-y-2">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            {...register("username")}
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            className={clsxm(
              "border  px-2 py-1.5 rounded-md outline-none",
              errors.username ? "border-red-400" : "border-violet-600"
            )}
          />
          <p className="text-red-400 text-xs">{errors.username?.message}</p>
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            {...register("email")}
            className={clsxm(
              "border  px-2 py-1.5 rounded-md outline-none",
              errors.email ? "border-red-400" : "border-violet-600"
            )}
          />
          <p className="text-red-400 text-xs">{errors.email?.message}</p>
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="channel">Channel</label>
          <input
            type="text"
            id="channel"
            {...register("channel")}
            className={clsxm(
              "border  px-2 py-1.5 rounded-md outline-none",
              errors.channel ? "border-red-400" : "border-violet-600"
            )}
          />
          <p className="text-red-400 text-xs">{errors.channel?.message}</p>
        </div>

        <button
          type="submit"
          className="w-full my-4  bg-violet-600 text-white flex items-center justify-center p-2 rounded-md"
          //   disabled={!isDirty || !isValid || isSubmitting}
        >
          Submit
        </button>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default YupForm;
