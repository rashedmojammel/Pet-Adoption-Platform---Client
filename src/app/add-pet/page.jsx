'use client';
import { FieldError, Input, Label, TextField,Select, ListBox, Button, TextArea } from '@heroui/react';
import React from 'react';

const addPet = () => {

    const onSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);
  const petdata = Object.fromEntries(formData.entries());

  console.log(petdata);

  const res = await fetch("http://localhost:5000/pets", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(petdata),
  });

  const data = await res.json();

  console.log(data);
};
    return (
        <div>
           <form 
           onSubmit={onSubmit}
           className="p-10 space-y-8">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    
    {/* Pet Name */}
    <div className="md:col-span-2">
      <TextField name="petName" isRequired>
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
            <ListBox.Item id="Dog" textValue="Dog">
              Dog
              <ListBox.ItemIndicator />
            </ListBox.Item>

            <ListBox.Item id="Cat" textValue="Cat">
              Cat
              <ListBox.ItemIndicator />
            </ListBox.Item>

            <ListBox.Item id="Bird" textValue="Bird">
              Bird
              <ListBox.ItemIndicator />
            </ListBox.Item>

            <ListBox.Item id="Rabbit" textValue="Rabbit">
              Rabbit
              <ListBox.ItemIndicator />
            </ListBox.Item>

            <ListBox.Item id="Fish" textValue="Fish">
              Fish
              <ListBox.ItemIndicator />
            </ListBox.Item>

            <ListBox.Item id="Other" textValue="Other">
              Other
              <ListBox.ItemIndicator />
            </ListBox.Item>
          </ListBox>
        </Select.Popover>
      </Select>
    </div>

    {/* Breed */}
    <TextField name="breed" isRequired>
      <Label>Breed</Label>
      <Input
        placeholder="Golden Retriever"
        className="rounded-2xl"
      />
      <FieldError />
    </TextField>

    {/* Age */}
    <TextField name="age" type="number" isRequired>
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
            <ListBox.Item id="Male" textValue="Male">
              Male
              <ListBox.ItemIndicator />
            </ListBox.Item>

            <ListBox.Item id="Female" textValue="Female">
              Female
              <ListBox.ItemIndicator />
            </ListBox.Item>
          </ListBox>
        </Select.Popover>
      </Select>
    </div>

    {/* Image URL */}
    <div className="md:col-span-2">
      <TextField name="imageUrl" isRequired>
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
    <TextField name="healthStatus" isRequired>
      <Label>Health Status</Label>
      <Input
        placeholder="Healthy"
        className="rounded-2xl"
      />
      <FieldError />
    </TextField>

    {/* Vaccination Status */}
    <TextField name="vaccinationStatus" isRequired>
      <Label>Vaccination Status</Label>
      <Input
        placeholder="Vaccinated"
        className="rounded-2xl"
      />
      <FieldError />
    </TextField>

    {/* Location */}
    <TextField name="location" isRequired>
      <Label>Location</Label>
      <Input
        placeholder="Dhaka, Bangladesh"
        className="rounded-2xl"
      />
      <FieldError />
    </TextField>

    {/* Adoption Fee */}
    <TextField name="adoptionFee" type="number" isRequired>
      <Label>Adoption Fee</Label>
      <Input
        type="number"
        placeholder="150"
        className="rounded-2xl"
      />
      <FieldError />
    </TextField>

    {/* Owner Email */}
    {/* <div className="md:col-span-2">
      <TextField name="ownerEmail">
        <Label>Owner Email</Label>
        <Input
          value={user?.email}
          isReadOnly
          className="rounded-2xl bg-gray-100"
        />
      </TextField>
    </div> */}

    {/* Description */}
    <div className="md:col-span-2">
      <TextField name="description" isRequired>
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
    // isLoading={isPending}
    className="rounded-none w-full bg-cyan-500 text-white"
  >

    Add pet{/* {isPending ? "Adding Pet..." : "Add Pet"} */}
  </Button>
</form>
        </div>
    );
};

export default addPet;