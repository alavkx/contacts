import { Link } from "@remix-run/react";

export default function Index() {
  return (
    <main className="relative min-h-screen bg-white sm:flex sm:items-center sm:justify-center">
      <Link
        to="/contacts"
        className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-yellow-700 shadow-sm hover:bg-yellow-50 sm:px-8"
      >
        View Contacts
      </Link>
    </main>
  );
}
