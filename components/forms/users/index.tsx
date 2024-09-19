import * as Yup from 'yup';

import { Button, Input, Select } from '@/components/core';
import { IUser, IUserInput } from '@/interfaces/users';

import React from 'react'
import { cn } from '@/lib/utils';
import { useFormik } from 'formik';

interface Props {
  data?: IUser | null;
  onCancel: any
}
const UserForm: React.FC<Props> = ({ data, onCancel }) => {
  const [user, setUser] = React.useState<IUserInput>({
    name: data?.name ?? "",
    email: data?.email || "",
    phone: data?.phone || "",
    role: data?.role || "organizer",
    status: data?.status || "active",

  })
  const { handleSubmit, ...form } = useFormik({
    initialValues: user,
    validationSchema: Yup.object({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      phone: Yup.string().required(),
      role: Yup.string().oneOf(["admin", "organizer"]).required(),
      status: Yup.string().oneOf(["active", "inactive"]).required(),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  /* use effect:
  In implmentation, only the user id is passed to the form component.
  The form component will use the id to fetch the user data from the server
  and populate the form fields with the data.

  if id is not provided, the form will be empty and the user can fill in the details
  **/

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4 w-full p-2">
        <Input
          id="name"
          label="Full Name"
          type="text"
          placeholder="Full Name"
          required
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          validation={form}
        />
        <Input
          id="phone"
          label="Phone Number"
          type="text"
          placeholder="Phone Number"
          required
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          validation={form}
        />

        <Input
          id="email"
          label="Email"
          type="email"
          placeholder="Email"
          required
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          validation={form}
        />


        <div className={cn(
          "flex w-full items-center justify-between gap-x-4",
        )}>
          <div className={cn('flex-col w-1/2', !data && "w-full")}>
            <Select
              value={form.values.status}
              id="status"
              label="Status"
              placeholder="Select user Status"
              required
              options={[
                { value: "active", label: "Active" },
                { value: "inactive", label: "Inactive" },
              ]}

              onValueChange={(value) => {
                form.setFieldValue("status", value);
              }}
            />
          </div>
          <div className={cn('flex-col w-1/2', !data && "w-full")}>
            <Select
              value={form.values.role}
              id="role"
              label="Sys. Role"
              placeholder="Select user role"
              required
              options={[
                { value: "organizer", label: "Event Organizer" },
                { value: "admin", label: "Administrator" },
              ]}

              onValueChange={(value) => {
                form.setFieldValue("role", value);
              }}
            />
          </div>
        </div>
      </div>

      <div className="flex gap-10 p-5 w-full item-center justify-center" >
        <Button onClick={onCancel} variant="outline" text="Cancel" type='button' />
        <Button variant="primary" text={data ? "Save" : "Add User"} type="submit" className="min-w-[150px]" />
      </div>
    </form>
  );
}

export default UserForm; 
