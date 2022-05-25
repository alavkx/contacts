import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useCatch, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { deleteContact } from "~/models/contact.server";
import { getContact } from "~/models/contact.server";

type LoaderData = {
  contact: Awaited<ReturnType<typeof getContact>>;
};

export const loader: LoaderFunction = async ({ request, params }) => {
  invariant(params.contactId, "contactId not found");
  const contact = await getContact({ id: params.contactId });
  if (!contact) {
    throw new Response("Not Found", { status: 404 });
  }
  return json<LoaderData>({ contact });
};

export const action: ActionFunction = async ({ request, params }) => {
  invariant(params.contactId, "contactId not found");
  await deleteContact({ id: params.contactId });
  return redirect("/contacts");
};

export default function ContactDetailsPage() {
  const data = useLoaderData() as LoaderData;
  return data.contact ? (
    <div>
      <h3 className="text-2xl font-bold">{data.contact.name}</h3>
      <p className="py-6">{data.contact.email}</p>
      {data.contact.address ? (
        <div className="py-4">
          <p className="py-2">{data.contact.address.street}</p>
          <p className="py-2">{data.contact.address.city}</p>
          <p className="py-2">{data.contact.address.state}</p>
        </div>
      ) : null}
      <hr className="my-4" />
      <Form method="post">
        <button
          type="submit"
          className="rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
        >
          Delete
        </button>
      </Form>
    </div>
  ) : null;
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);
  return <div>An unexpected error occurred: {error.message}</div>;
}

export function CatchBoundary() {
  const caught = useCatch();
  if (caught.status === 404) {
    return <div>Contact not found</div>;
  }
  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}
