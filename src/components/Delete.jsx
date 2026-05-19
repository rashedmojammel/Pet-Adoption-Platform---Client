"use client";

import { AlertDialog, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { FaTrash } from "react-icons/fa";

export function DeletePet({ pet }) {
  const { _id, petName } = pet;

  const router = useRouter();

  const handleDelete = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/pets/${_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    console.log(data);

    // Redirect after delete
    router.push("/all-pets");
  };

  return (
    <AlertDialog>
      <Button
        variant="outline"
        className="text-red-500 hover:text-red-600"
      >
        <FaTrash /> Delete
      </Button>

      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />

            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>
                Delete pet permanently?
              </AlertDialog.Heading>
            </AlertDialog.Header>

            <AlertDialog.Body>
              <p>
                This will permanently delete{" "}
                <strong>{petName}</strong> and all of its
                data. This action cannot be undone.
              </p>
            </AlertDialog.Body>

            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>

              <Button
                onClick={handleDelete}
                slot="close"
                variant="danger"
              >
                Delete Pet
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}