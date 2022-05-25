import { Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";
import { LoaderFunction, json } from "@remix-run/server-runtime";
import { getContactListItems } from "~/models/contact.server";
import randomEmoji from "~/randomEmoji";

type LoaderData = {
  contactListItems: Awaited<ReturnType<typeof getContactListItems>>;
};

export const loader: LoaderFunction = async () => {
  const contactListItems = await getContactListItems();
  return json<LoaderData>({ contactListItems });
};

export default function Contacts() {
  const data = useLoaderData() as LoaderData;
  return (
    <div className="flex h-full min-h-screen flex-col">
      <header className="flex items-center justify-between bg-slate-800 p-4 text-white">
        <h1 className="text-3xl font-bold">
          <Link to=".">Contacts</Link>
        </h1>
      </header>
      <main className="flex h-full bg-white">
        <div className="h-full w-80 border-r bg-gray-50">
          <Link to="new" className="block p-4 text-xl text-blue-500">
            + New Contact
          </Link>
          <hr />
          {data.contactListItems.length === 0 ? (
            <p className="p-4">Absolutely zero friends lmao 🤣</p>
          ) : (
            <ol>
              {data.contactListItems.map((c) => (
                <li key={c.id}>
                  <NavLink
                    className={({ isActive }) =>
                      `block border-b p-4 text-xl ${isActive ? "bg-white" : ""}`
                    }
                    to={c.id}
                  >
                    {randomEmoji()} {c.name}
                  </NavLink>
                </li>
              ))}
            </ol>
          )}
        </div>
        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
