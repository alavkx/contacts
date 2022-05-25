import { Link } from "@remix-run/react";

export default function ContactIndexPage() {
  return (
    <p>
      No contact selected. Select a contact on the left, or{" "}
      <Link to="new" className="text-blue-500 underline">
        create a new contact you lonely bastard.
      </Link>
    </p>
  );
}
