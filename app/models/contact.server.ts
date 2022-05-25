import type { Address, Contact } from "@prisma/client";
import { prisma } from "~/db.server";
export type { Contact, Address } from "@prisma/client";

export function getContact({ id }: Pick<Contact, "id">) {
  return prisma.contact.findFirst({
    where: { id },
    include: { address: true },
  });
}
export function getContactListItems() {
  return prisma.contact.findMany({
    orderBy: { updatedAt: "desc" },
  });
}
export function createContact({
  name,
  email,
  address,
}: {
  name: Contact["name"];
  email: Contact["email"];
  address?: Omit<Address, "id">;
}) {
  return prisma.contact.create({
    data: address
      ? { email, name, address: { create: address } }
      : { email, name },
  });
}
export function deleteContact({ id }: Pick<Contact, "id">) {
  return prisma.contact.delete({
    where: { id },
  });
}
