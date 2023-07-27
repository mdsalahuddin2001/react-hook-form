/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { useForm, useFieldArray, FieldErrors } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { clsxm } from "../utils/clsxm";
import { useEffect } from "react";

// Form submission state
// useful for tracking the progress and outcome of form submission
// - isSubmitting
// - isSubmitted
// - isSubmitSuccessful
// - submitCount

type FormValues = {
  username: string;
  email: string;
  channel: string;
  social: {
    facebook: string;
    twitter: string;
  };
  phoneNumbers: string[];
  phNumbers: { number: string }[];
  age: number;
  dob: Date;
};
const YoutubeForm = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      username: "mdsalahuddin",
      email: "mdahmede442@gmail.com",
      channel: "peace in halal",
      social: {
        facebook: "https://www.facebook.com/mdsalahuddin2001",
        twitter: "",
      },
      phoneNumbers: ["", ""],
      phNumbers: [{ number: "" }],
      age: 0,
      dob: new Date(),
    },
    mode: "all",
  });
  const {
    register,
    control,
    handleSubmit,
    formState,
    watch,
    getValues,
    setValue,
    reset,
    trigger,
  } = form;

  const username = watch("username");
  const watchFields = watch(["username", "email"]);
  const watchForm = watch();
  const {
    errors,
    touchedFields,
    dirtyFields,
    isDirty,
    isValid,
    isSubmitting,
    isSubmitted,
    isSubmitSuccessful,
    submitCount,
  } = formState;

  console.log({ isSubmitting });
  console.log({ isSubmitted });
  console.log({ isSubmitSuccessful });
  console.log({ submitCount });

  console.log({ touchedFields, dirtyFields, isDirty, isValid });
  const { fields, append, remove } = useFieldArray({
    name: "phNumbers",
    control,
  });
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
            {...register("username", { required: "Username is required" })}
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
            {...register("email", {
              required: "Email is required",
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<,>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Invalid email",
              },
              //   ******** One Way ******** //

              //   validate: (value) => {
              //     return value.toLowerCase().startsWith("admin")
              //       ? "Admin is use for internal use only"
              //       : true;
              //   },

              //   **** Another Way **** //

              validate: {
                notAdmin: (value) => {
                  return value.toLowerCase().startsWith("admin")
                    ? "Admin is use for internal use only"
                    : true;
                },
                notBlackListed: (value) => {
                  return (
                    !value.endsWith("baddomain.com") ||
                    "This domain is not supported"
                  );
                },
                emailAvailable: async (value) => {
                  const response = await fetch(
                    `https://jsonplaceholder.typicode.com/users?email=${value}`
                  );
                  const data = await response.json();
                  console.log(data);
                  return data.length == 0 || "This email is already taken";
                },
              },
            })}
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
            {...register("channel", { required: "Channel is required" })}
            className={clsxm(
              "border  px-2 py-1.5 rounded-md outline-none",
              errors.channel ? "border-red-400" : "border-violet-600"
            )}
          />
          <p className="text-red-400 text-xs">{errors.channel?.message}</p>
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="channel">Facebook</label>
          <input
            type="text"
            id="channel"
            {...register("social.facebook")}
            className={clsxm(
              "border  px-2 py-1.5 rounded-md outline-none",
              errors.social?.facebook ? "border-red-400" : "border-violet-600"
            )}
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="channel">Twitter</label>
          <input
            type="text"
            id="twitter"
            {...register("social.twitter", {
              disabled: watch("channel") === "",
              required: "Enter twitter profile",
            })}
            className={clsxm(
              "border  px-2 py-1.5 rounded-md outline-none",
              errors.social?.twitter ? "border-red-400" : "border-violet-600"
            )}
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="primary-phone">Primary Phone Number</label>
          <input
            type="text"
            id="primary-phone"
            {...register("phoneNumbers.0")}
            className={clsxm(
              "border border-violet-600  px-2 py-1.5 rounded-md outline-none"
            )}
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="secondary-phone">Secondary Phone Number</label>
          <input
            type="text"
            id="secondary-phone"
            {...register("phoneNumbers.1")}
            className={clsxm(
              "border border-violet-600  px-2 py-1.5 rounded-md outline-none"
            )}
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="secondary-phone">List of phone numbers</label>
          <div>
            {fields.map((field, index) => {
              return (
                <div
                  className="flex  items-center  space-y-4 space-x-2"
                  key={field.id}
                >
                  <input
                    type="text"
                    id="secondary-phone"
                    {...register(`phNumbers.${index}.number`)}
                    className={clsxm(
                      "border border-violet-600 px-2 py-1.5 rounded-md outline-none w-full mt-4"
                    )}
                  />
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        remove(index);
                      }}
                    >
                      x
                    </button>
                  )}
                </div>
              );
            })}
            <div className="flex justify-end mt-4">
              <button
                type="button"
                className="px-6 py-1.5 text-sm font-bold bg-slate-800 rounded-md text-white max-w-[280px]"
                onClick={() => {
                  append({ number: "" });
                }}
              >
                Add More Phone Number
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            {...register("age", {
              valueAsNumber: true,
              required: "Age is required",
            })}
            className={clsxm(
              "border  px-2 py-1.5 rounded-md outline-none",
              errors.channel ? "border-red-400" : "border-violet-600"
            )}
          />
          <p className="text-red-400 text-xs">{errors.age?.message}</p>
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="dob">Date of birth</label>
          <input
            type="date"
            id="dob"
            {...register("dob", {
              valueAsDate: true,
              required: "Date of birth is required",
            })}
            className={clsxm(
              "border  px-2 py-1.5 rounded-md outline-none",
              errors.channel ? "border-red-400" : "border-violet-600"
            )}
          />
          <p className="text-red-400 text-xs">{errors.dob?.message}</p>
        </div>

        <button
          type="submit"
          className="w-full my-4  bg-violet-600 text-white flex items-center justify-center p-2 rounded-md"
          disabled={!isDirty || !isValid || isSubmitting}
        >
          Submit
        </button>

        <button
          type="button"
          className="w-full my-4  bg-violet-600 text-white flex items-center justify-center p-2 rounded-md"
          onClick={() => {
            console.log(getValues(["username", "email"]));
            // getValues() - get all field values as an object
            // getValues('username') - get specific field value by keyname
            // getValues(['username','email']) - get specific field values as an array
          }}
        >
          Get values
        </button>

        <button
          type="button"
          className="w-full my-4  bg-violet-600 text-white flex items-center justify-center p-2 rounded-md"
          onClick={() => {
            setValue("username", "", {
              shouldValidate: true,
              shouldDirty: true,
              shouldTouch: true,
            });
          }}
        >
          Set Value
        </button>
        <button
          type="button"
          className="w-full my-4  bg-violet-600 text-white flex items-center justify-center p-2 rounded-md"
          onClick={() => trigger(["channel", "age"])}
        >
          Validate
        </button>
        {/* <button
          type="button"
          className="w-full my-4  bg-violet-600 text-white flex items-center justify-center p-2 rounded-md"
          onClick={() => reset()}
        >
          Reset Form
        </button> */}
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default YoutubeForm;
