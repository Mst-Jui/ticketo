'use client'
import DashboardHeading from '@/components/DashboardHeading';
import { addOrganization } from '@/lib/api/organizations/action';
import { useSession } from '@/lib/auth-client';
import { uploadImage } from '@/utils/uploadImage';
import { Button, Card, CardHeader, Form, Input, TextArea } from '@heroui/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaImage } from 'react-icons/fa';

const OrganizationPage = () => {
  const { data: session } = useSession()
  const { register, handleSubmit, formState: { errors } } = useForm()


  const onSubmit = async (data) => {

    const imageFile = data.logo[0];
    const imageUrl = await uploadImage(imageFile)
    // console.log(imageUrl);
    const orgData = {
      organizationName: data.organizationName,
      logo: imageUrl,
      website: data.website,
      description: data.description,
      organizerEmail: session?.user?.email,
    }
    // console.log(orgData);
    const resData = await addOrganization(orgData);
    if (resData.insertedId) {
      toast.success("Org Profile added")
    }

  }
  return (
    <div>
      <DashboardHeading title={"My Organization Profile"} description={"Update organization logo, profile, website, description"} />
      <div className="mt-6 space-y-6 max-w-3xl">
        <Card className="border border-white/5 bg-slate-900/40 backdrop-blur-xl shadow-2xl rounded-2xl" radius="lg">
          <CardHeader className="flex flex-col gap-1 pb-4 border-b border-white/5 p-6">
            <h3 className="text-xl font-bold text-white">Organization Details</h3>
            <p className="text-slate-400 text-xs">Review and edit your organization credentials.</p>
          </CardHeader>
          <div className="p-6">
            <Form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 w-full">
              <Input
                {...register("organizationName", { required: "Organization Name is Required" })}
                id="organizationName" label="Organization Name" labelPlacement="outside" placeholder="TechEvents Corp" required className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500" />

              {
                errors.organizationName && <p className="text-red-500">{errors.organizationName.message}</p>
              }


              <Input
                {...register("logo", { required: "Logo is Required" })}
                type="file"
                accept="image/*"
                // onChange={handleImageUpload}
                id="logo"
                placeholder="https://example.com/avatar.jpg"
                labelPlacement="outside"
                startContent={<FaImage className="text-slate-400 text-sm" />}
                className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500"
              />
              {
                errors.logo && <p className="text-red-500">{errors.logo.message}</p>
              }
              <Input
                {...register("website", { required: "Organization Website is Required" })}
                id="website" label="Organization Website" labelPlacement="outside" placeholder="techevents.corp" required className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500" />

              {
                errors.website && <p className="text-red-500">{errors.website.message}</p>
              }

              <TextArea
                {...register("description", { required: "Description is Required" })}
                id="description" label="Description" labelPlacement="outside" placeholder="Hosting global developer conferences and software hacking marathons." required className="w-full bg-slate-900/50 border border-white/10 rounded-xl focus:outline-none min-h-[100px] text-white text-sm" />

              {
                errors.description && <p className="text-red-500">{errors.description.message}</p>
              }

              <div className="flex gap-4">
                <Button type="submit" className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold h-11 px-6 shadow-lg" radius="lg">Save Changes</Button>
              </div>
            </Form>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default OrganizationPage;