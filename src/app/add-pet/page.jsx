'use client';
import { FieldError, Input, Label, TextField, Select, ListBox, Button, TextArea } from '@heroui/react';
import React from 'react';
import {
  FaPaw,
  FaDog,
  FaHeartbeat,
  FaImage,
  FaMapMarkerAlt,
  FaSyringe,
  FaMoneyBillWave,
  FaVenusMars,
  FaFeatherAlt,
  FaAlignLeft,
} from 'react-icons/fa';

const SectionHeading = ({ icon, label }) => (
  <div className="flex items-center gap-2 mb-5">
    <span className="text-cyan-500 text-sm">{icon}</span>
    <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-600">{label}</h2>
    <div className="flex-1 border-t border-gray-100 ml-2" />
  </div>
);

const FieldLabel = ({ icon, children }) => (
  <Label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1.5">
    <span className="text-gray-400 text-xs">{icon}</span>
    {children}
  </Label>
);

const AddPet = () => {
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const petdata = Object.fromEntries(formData.entries());
    console.log(petdata);
    const res = await fetch("http://localhost:5000/pets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(petdata),
    });
    const data = await res.json();
    console.log(data);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
        
          <h1 className="text-3xl font-bold text-gray-800"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
            Add a New Pet
          </h1>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="h-1.5 bg-gradient-to-r from-green-400 via-cyan-400 to-teal-400" />

          <form onSubmit={onSubmit} className="p-8 md:p-10 space-y-8">

            {/* Section: Basic Info */}
            <div>
              <SectionHeading icon={<FaDog />} label="Basic Information" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                <div className="md:col-span-2">
                  <TextField name="petName" isRequired>
                    <FieldLabel icon={<FaPaw />}>Pet Name</FieldLabel>
                    <Input placeholder="e.g. Buddy" className="rounded-xl border-gray-200" />
                    <FieldError />
                  </TextField>
                </div>

                <Select name="species" isRequired className="w-full" placeholder="Select species">
                  <FieldLabel icon={<FaFeatherAlt />}>Species</FieldLabel>
                  <Select.Trigger className="rounded-xl border-gray-200">
                    <Select.Value />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover>
                    <ListBox>
                      {["Dog", "Cat", "Bird", "Rabbit", "Fish", "Other"].map((s) => (
                        <ListBox.Item key={s} id={s} textValue={s}>
                          {s}<ListBox.ItemIndicator />
                        </ListBox.Item>
                      ))}
                    </ListBox>
                  </Select.Popover>
                </Select>

                <TextField name="breed" isRequired>
                  <FieldLabel icon={<FaDog />}>Breed</FieldLabel>
                  <Input placeholder="e.g. Golden Retriever" className="rounded-xl border-gray-200" />
                  <FieldError />
                </TextField>

                <TextField name="age" type="number" isRequired>
                  <FieldLabel icon={<FaHeartbeat />}>Age (years)</FieldLabel>
                  <Input type="number" placeholder="e.g. 2" className="rounded-xl border-gray-200" />
                  <FieldError />
                </TextField>

                <Select name="gender" isRequired className="w-full" placeholder="Select gender">
                  <FieldLabel icon={<FaVenusMars />}>Gender</FieldLabel>
                  <Select.Trigger className="rounded-xl border-gray-200">
                    <Select.Value />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover>
                    <ListBox>
                      {["Male", "Female"].map((g) => (
                        <ListBox.Item key={g} id={g} textValue={g}>
                          {g}<ListBox.ItemIndicator />
                        </ListBox.Item>
                      ))}
                    </ListBox>
                  </Select.Popover>
                </Select>

              </div>
            </div>

            <div className="border-t border-gray-100" />

            {/* Section: Health & Location */}
            <div>
              <SectionHeading icon={<FaHeartbeat />} label="Health & Location" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                <TextField name="healthStatus" isRequired>
                  <FieldLabel icon={<FaHeartbeat />}>Health Status</FieldLabel>
                  <Input placeholder="e.g. Healthy" className="rounded-xl border-gray-200" />
                  <FieldError />
                </TextField>

                <TextField name="vaccinationStatus" isRequired>
                  <FieldLabel icon={<FaSyringe />}>Vaccination Status</FieldLabel>
                  <Input placeholder="e.g. Fully vaccinated" className="rounded-xl border-gray-200" />
                  <FieldError />
                </TextField>

                <TextField name="location" isRequired>
                  <FieldLabel icon={<FaMapMarkerAlt />}>Location</FieldLabel>
                  <Input placeholder="e.g. Dhaka, Bangladesh" className="rounded-xl border-gray-200" />
                  <FieldError />
                </TextField>

                <TextField name="adoptionFee" type="number" isRequired>
                  <FieldLabel icon={<FaMoneyBillWave />}>Adoption Fee (৳)</FieldLabel>
                  <Input type="number" placeholder="e.g. 150" className="rounded-xl border-gray-200" />
                  <FieldError />
                </TextField>

              </div>
            </div>

            <div className="border-t border-gray-100" />

            {/* Section: Media & Description */}
            <div>
              <SectionHeading icon={<FaImage />} label="Media & Description" />
              <div className="space-y-5">

                <TextField name="imageUrl" isRequired>
                  <FieldLabel icon={<FaImage />}>Image URL</FieldLabel>
                  <Input type="url" placeholder="https://i.ibb.co/example/pet.jpg" className="rounded-xl border-gray-200" />
                  <FieldError />
                </TextField>

                <TextField name="description" isRequired>
                  <FieldLabel icon={<FaAlignLeft />}>Description</FieldLabel>
                  <TextArea
                    placeholder="Tell us about this pet — personality, habits, what kind of home they need..."
                    className="rounded-xl border-gray-200 min-h-[120px]"
                  />
                  <FieldError />
                </TextField>

              </div>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white font-semibold py-3 rounded-2xl transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <FaPaw />
              Add Pet for Adoption
            </Button>

          </form>
        </div>

      </div>
    </div>
  );
};

export default AddPet;