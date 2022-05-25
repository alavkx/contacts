import type { ActionFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import * as React from "react";
import { Address, createContact } from "~/models/contact.server";

type ActionData = {
  errors?: {
    name?: string;
    email?: string;
    street?: string;
    city?: string;
    state?: string;
  };
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const name = formData.get("name");
  const email = formData.get("email");
  const street = formData.get("street");
  const city = formData.get("city");
  const state = formData.get("state");
  const hasAddress = Boolean(
    street?.toString().length ||
      city?.toString().length ||
      state?.toString().length
  );
  if (typeof name !== "string" || name.length === 0) {
    return json<ActionData>(
      { errors: { name: "Name is required" } },
      { status: 400 }
    );
  }
  if (typeof email !== "string" || email.length === 0) {
    return json<ActionData>(
      { errors: { email: "Email is required" } },
      { status: 400 }
    );
  }
  if (hasAddress && (typeof street !== "string" || street.length === 0)) {
    return json<ActionData>(
      { errors: { street: "Street is required when including an Address" } },
      { status: 400 }
    );
  }
  if (hasAddress && (typeof city !== "string" || city.length === 0)) {
    return json<ActionData>(
      { errors: { city: "Email is required when including an Address" } },
      { status: 400 }
    );
  }
  if (hasAddress && (typeof state !== "string" || state.length === 0)) {
    return json<ActionData>(
      { errors: { state: "Email is required when including an Address" } },
      { status: 400 }
    );
  }
  const contact = await createContact({
    name,
    email,
    address: hasAddress ? ({ street, city, state } as Address) : undefined,
  });
  return redirect(`/contacts/${contact.id}`);
};

export default function NewContactPage() {
  const actionData = useActionData() as ActionData;
  const nameRef = React.useRef<HTMLInputElement>(null);
  const emailRef = React.useRef<HTMLInputElement>(null);
  const streetRef = React.useRef<HTMLInputElement>(null);
  const cityRef = React.useRef<HTMLInputElement>(null);
  const stateRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (actionData?.errors?.name) {
      nameRef.current?.focus();
    } else if (actionData?.errors?.email) {
      emailRef.current?.focus();
    } else if (actionData?.errors?.street) {
      streetRef.current?.focus();
    } else if (actionData?.errors?.city) {
      cityRef.current?.focus();
    } else if (actionData?.errors?.state) {
      stateRef.current?.focus();
    }
  }, [actionData]);

  return (
    <Form
      method="post"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        width: "100%",
      }}
    >
      <div>
        <label className="flex w-full flex-col gap-1">
          <span>Name </span>
          <input
            ref={nameRef}
            name="name"
            className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
            aria-invalid={actionData?.errors?.name ? true : undefined}
            aria-errormessage={
              actionData?.errors?.name ? "name-error" : undefined
            }
          />
        </label>
        {actionData?.errors?.name ? (
          <div className="pt-1 text-red-700" id="name-error">
            {actionData.errors.name}
          </div>
        ) : null}
      </div>

      <div>
        <label className="flex w-full flex-col gap-1">
          <span>Email </span>
          <input
            ref={emailRef}
            name="email"
            className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
            aria-invalid={actionData?.errors?.email ? true : undefined}
            aria-errormessage={
              actionData?.errors?.email ? "email-error" : undefined
            }
          />
        </label>
        {actionData?.errors?.email ? (
          <div className="pt-1 text-red-700" id="email-error">
            {actionData.errors.email}
          </div>
        ) : null}
      </div>

      <fieldset className="rounded-md border-2 border-gray-300 p-5">
        <legend className="p-2 text-sm">Address</legend>

        <div>
          <label className="flex w-full flex-col gap-1">
            <span>Street </span>
            <input
              ref={streetRef}
              name="street"
              className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
              aria-invalid={actionData?.errors?.street ? true : undefined}
              aria-errormessage={
                actionData?.errors?.street ? "street-error" : undefined
              }
            />
          </label>
          {actionData?.errors?.street ? (
            <div className="pt-1 text-red-700" id="street-error">
              {actionData.errors.street}
            </div>
          ) : null}
        </div>

        <div>
          <label className="flex w-full flex-col gap-1">
            <span>City </span>
            <input
              ref={cityRef}
              name="city"
              className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
              aria-invalid={actionData?.errors?.city ? true : undefined}
              aria-errormessage={
                actionData?.errors?.city ? "city-error" : undefined
              }
            />
          </label>
          {actionData?.errors?.city ? (
            <div className="pt-1 text-red-700" id="city-error">
              {actionData.errors.city}
            </div>
          ) : null}
        </div>

        <div>
          <label className="flex w-full flex-col gap-1">
            <span>State </span>
            <input
              ref={stateRef}
              name="state"
              className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
              aria-invalid={actionData?.errors?.state ? true : undefined}
              aria-errormessage={
                actionData?.errors?.state ? "state-error" : undefined
              }
            />
          </label>
          {actionData?.errors?.state ? (
            <div className="pt-1 text-red-700" id="state-error">
              {actionData.errors.state}
            </div>
          ) : null}
        </div>
      </fieldset>

      <div className="text-right">
        <button
          type="submit"
          className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
        >
          Save
        </button>
      </div>
    </Form>
  );
}
