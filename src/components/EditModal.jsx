"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Envelope } from "@gravity-ui/icons";

import {
  Button,
  FieldError,
  Input,
  Label,
  ListBox,
  Modal,
  Surface,
  TextArea,
  TextField,
  Select,
} from "@heroui/react";

import { FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

export function Editpet({ pet }) {

  const router = useRouter();

  const [open, setOpen] = useState(false);

  const {
    _id,
    petName,
    species,
    age,
    breed,
    gender,
    location,
    description,
    imageUrl,
    healthStatus,
    vaccinationStatus,
    adoptionFee,
  } = pet;

  const onSubmit = async (e) => {

    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const petdata = Object.fromEntries(formData.entries());

    try {

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/pets/${_id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(petdata),
        }
      );

      const data = await res.json();

      if (data.modifiedCount > 0) {

        toast.success("Pet updated successfully!");

        setOpen(false);

        router.refresh(); // instantly refresh UI
      } else {

        toast.info("No changes made");
      }

    } catch (error) {

      console.log(error);

      toast.error("Failed to update pet");
    }
  };

  return (
    <Modal open={open} onOpenChange={setOpen}>

      {/* Open Modal Button */}
      <Button
        variant="outline"
        onPress={() => setOpen(true)}
      >
        <FaEdit /> Edit
      </Button>

      <Modal.Backdrop>

        <Modal.Container placement="auto">

          <Modal.Dialog className="sm:max-w-4xl">

            <Modal.CloseTrigger />

            {/* Header */}
            <Modal.Header>

              <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                <Envelope className="size-5" />
              </Modal.Icon>

              <Modal.Heading>
                Edit Pet
              </Modal.Heading>

            </Modal.Header>

            {/* Body */}
            <Modal.Body className="p-6">

              <Surface variant="default">

                <form
                  onSubmit={onSubmit}
                  className="p-10 space-y-8"
                >

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* Pet Name */}
                    <div className="md:col-span-2">

                      <TextField
                        defaultValue={petName}
                        name="petName"
                        isRequired
                      >

                        <Label>Pet Name</Label>

                        <Input
                          placeholder="Buddy"
                          className="rounded-2xl"
                        />

                        <FieldError />

                      </TextField>

                    </div>

                    {/* Species */}
                    <div>

                      <Select
                        defaultSelectedKeys={[species]}
                        name="species"
                        isRequired
                        className="w-full"
                        placeholder="Select species"
                      >

                        <Label>Species</Label>

                        <Select.Trigger className="rounded-2xl">

                          <Select.Value />
                          <Select.Indicator />

                        </Select.Trigger>

                        <Select.Popover>

                          <ListBox>

                            <ListBox.Item id="Dog">
                              Dog
                            </ListBox.Item>

                            <ListBox.Item id="Cat">
                              Cat
                            </ListBox.Item>

                            <ListBox.Item id="Bird">
                              Bird
                            </ListBox.Item>

                            <ListBox.Item id="Rabbit">
                              Rabbit
                            </ListBox.Item>

                            <ListBox.Item id="Fish">
                              Fish
                            </ListBox.Item>

                            <ListBox.Item id="Other">
                              Other
                            </ListBox.Item>

                          </ListBox>

                        </Select.Popover>

                      </Select>

                    </div>

                    {/* Breed */}
                    <TextField
                      defaultValue={breed}
                      name="breed"
                      isRequired
                    >

                      <Label>Breed</Label>

                      <Input
                        placeholder="Golden Retriever"
                        className="rounded-2xl"
                      />

                      <FieldError />

                    </TextField>

                    {/* Age */}
                    <TextField
                      defaultValue={age}
                      name="age"
                      type="number"
                      isRequired
                    >

                      <Label>Age</Label>

                      <Input
                        type="number"
                        placeholder="2"
                        className="rounded-2xl"
                      />

                      <FieldError />

                    </TextField>

                    {/* Gender */}
                    <div>

                      <Select
                        defaultSelectedKeys={[gender]}
                        name="gender"
                        isRequired
                        className="w-full"
                        placeholder="Select gender"
                      >

                        <Label>Gender</Label>

                        <Select.Trigger className="rounded-2xl">

                          <Select.Value />
                          <Select.Indicator />

                        </Select.Trigger>

                        <Select.Popover>

                          <ListBox>

                            <ListBox.Item id="Male">
                              Male
                            </ListBox.Item>

                            <ListBox.Item id="Female">
                              Female
                            </ListBox.Item>

                          </ListBox>

                        </Select.Popover>

                      </Select>

                    </div>

                    {/* Image URL */}
                    <div className="md:col-span-2">

                      <TextField
                        defaultValue={imageUrl}
                        name="imageUrl"
                        isRequired
                      >

                        <Label>Image URL</Label>

                        <Input
                          type="url"
                          placeholder="https://i.ibb.co/example/pet.jpg"
                          className="rounded-2xl"
                        />

                        <FieldError />

                      </TextField>

                    </div>

                    {/* Health Status */}
                    <TextField
                      defaultValue={healthStatus}
                      name="healthStatus"
                      isRequired
                    >

                      <Label>Health Status</Label>

                      <Input
                        placeholder="Healthy"
                        className="rounded-2xl"
                      />

                      <FieldError />

                    </TextField>

                    {/* Vaccination Status */}
                    <TextField
                      defaultValue={vaccinationStatus}
                      name="vaccinationStatus"
                      isRequired
                    >

                      <Label>Vaccination Status</Label>

                      <Input
                        placeholder="Vaccinated"
                        className="rounded-2xl"
                      />

                      <FieldError />

                    </TextField>

                    {/* Location */}
                    <TextField
                      defaultValue={location}
                      name="location"
                      isRequired
                    >

                      <Label>Location</Label>

                      <Input
                        placeholder="Dhaka, Bangladesh"
                        className="rounded-2xl"
                      />

                      <FieldError />

                    </TextField>

                    {/* Adoption Fee */}
                    <TextField
                      defaultValue={adoptionFee}
                      name="adoptionFee"
                      type="number"
                      isRequired
                    >

                      <Label>Adoption Fee</Label>

                      <Input
                        type="number"
                        placeholder="150"
                        className="rounded-2xl"
                      />

                      <FieldError />

                    </TextField>

                    {/* Description */}
                    <div className="md:col-span-2">

                      <TextField
                        defaultValue={description}
                        name="description"
                        isRequired
                      >

                        <Label>Description</Label>

                        <TextArea
                          placeholder="Write details about the pet..."
                          className="rounded-3xl"
                        />

                        <FieldError />

                      </TextField>

                    </div>

                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    variant="outline"
                    className="rounded-none w-full bg-cyan-500 text-white"
                  >
                    Edit Pet
                  </Button>

                </form>

              </Surface>

            </Modal.Body>

          </Modal.Dialog>

        </Modal.Container>

      </Modal.Backdrop>

    </Modal>
  );
}