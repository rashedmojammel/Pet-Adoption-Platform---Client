"use client";

import { authClient } from "@/lib/auth-client";
import { Envelope } from "@gravity-ui/icons";
import { Button, DateField, Input, Label, Modal, Surface, TextField } from "@heroui/react";
import { useState } from "react";
import { toast } from "react-toastify";

export function AdoptForm({ petName, petId, ownerEmail }) {
  const [pickupDate, setPickupDate] = useState(null);
  const [message, setMessage] = useState("");

  const { data: session } = authClient.useSession();
  const user = session?.user || null;

  const handleAdopt = async () => {
    // Block owner from adopting their own pet
    if (user?.email === ownerEmail) {
      toast.error("You cannot adopt your own pet!");
      return;
    }

    const adoptionData = {
      userId: user?.id || null,
      petId: petId,
      petName: petName,
      userName: user?.name || "Anonymous",
      userEmail: user?.email || "No email",
      pickupDate: pickupDate ? new Date(pickupDate).toISOString() : null,
      message: message,
    };

    const { data: tokenData } = await authClient.Token();

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/adoption-requests`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${tokenData?.token}`,
      },
      body: JSON.stringify(adoptionData),
    });

    const data = await res.json();

    if (res.status === 403) {
      toast.error(data.error);
      return;
    }
    if (res.status === 400) {
      toast.error(data.error);
      return;
    }

    toast.success("Adoption request submitted successfully!");
  };

  // Hide adopt button entirely if user is the owner
  if (user?.email === ownerEmail) {
    return (
      <div className="px-4 py-2 bg-gray-100 text-gray-500 text-sm rounded-2xl">
        You listed this pet
      </div>
    );
  }

  return (
    <Modal>
      <Button variant="secondary">Adopt Pet</Button>
      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-md">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                <Envelope className="size-5" />
              </Modal.Icon>
              <Modal.Heading>Adopt a Pet</Modal.Heading>
              <p className="mt-1.5 text-sm leading-5 text-muted">
                Review your details and choose a pickup date to complete your adoption request.
              </p>
            </Modal.Header>

            <Modal.Body className="p-6">
              <Surface variant="default">
                <div className="flex flex-col gap-4">

                  <TextField className="w-full" name="petName" type="text" readonly>
                    <Label>Pet Name</Label>
                    <Input
                      value={petName ?? ""}
                      className="opacity-60 cursor-not-allowed bg-gray-50"
                    />
                  </TextField>

                  <TextField className="w-full" name="userName" type="text" readonly>
                    <Label>Your Name</Label>
                    <Input
                      value={user?.name ?? ""}
                      className="opacity-60 cursor-not-allowed bg-gray-50"
                    />
                  </TextField>

                  <TextField className="w-full" name="userEmail" type="email" readonly>
                    <Label>Your Email</Label>
                    <Input
                      value={user?.email ?? ""}
                      className="opacity-60 cursor-not-allowed bg-gray-50"
                    />
                  </TextField>

                  <DateField
                    className="w-full"
                    name="pickupDate"
                    onChange={setPickupDate}
                  >
                    <Label>Pickup Date</Label>
                    <DateField.Group>
                      <DateField.Input>
                        {(segment) => <DateField.Segment segment={segment} />}
                      </DateField.Input>
                    </DateField.Group>
                  </DateField>

                  <TextField className="w-full" name="message">
                    <Label>Message</Label>
                    <Input
                      placeholder="Any notes for the shelter?"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </TextField>

                </div>
              </Surface>
            </Modal.Body>

            <Modal.Footer>
              <Button slot="close" variant="secondary">
                Cancel
              </Button>
              <Button onClick={handleAdopt} slot="close">
                Adopt
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}