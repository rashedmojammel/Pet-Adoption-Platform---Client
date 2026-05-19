"use client";

import { authClient } from "@/lib/auth-client";
import { Envelope } from "@gravity-ui/icons";
import { Button, DateField, Input, Label, Modal, Surface, TextField } from "@heroui/react";
import { useState } from "react";

export function AdoptForm({ petName }) {
  const [pickupDate, setPickupDate] = useState(null);
  const [message, setMessage] = useState("");

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user || null;

  const handleAdopt = async () => {
    const adoptionData = {
      petName: petName,
      userName: user?.name || "Anonymous",
      userEmail: user?.email || "No email",
      pickupDate: pickupDate ? new Date(pickupDate).toISOString() : null,
      message: message,
    };
    console.log(adoptionData);
    const res = await fetch("http://localhost:5000/adoption-requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(adoptionData),
    });

    const data = await res.json();
    console.log(data);
    
    // TODO: send adoptionData to your API
    // await fetch("http://localhost:5000/adoptions", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(adoptionData),
    // });
  };

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

                  {/* Pet Name — Read Only */}
                  <TextField className="w-full" name="petName" type="text" isReadOnly>
                    <Label>Pet Name</Label>
                    <Input
                      value={petName ?? ""}
                      className="opacity-60 cursor-not-allowed bg-gray-50"
                    />
                  </TextField>

                  {/* User Name — Read Only */}
                  <TextField className="w-full" name="userName" type="text" isReadOnly>
                    <Label>Your Name</Label>
                    <Input
                      value={user?.name ?? ""}
                      className="opacity-60 cursor-not-allowed bg-gray-50"
                    />
                  </TextField>

                  {/* User Email — Read Only */}
                  <TextField className="w-full" name="userEmail" type="email" isReadOnly>
                    <Label>Your Email</Label>
                    <Input
                      value={user?.email ?? ""}
                      className="opacity-60 cursor-not-allowed bg-gray-50"
                    />
                  </TextField>

                  {/* Pickup Date */}
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

                  {/* Message */}
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