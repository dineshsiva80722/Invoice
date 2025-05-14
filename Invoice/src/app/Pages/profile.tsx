"use client";
import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { FiEdit2, FiSave, FiX, FiUpload } from 'react-icons/fi';
import { useUser } from '@/app/Pages/context/UserContext'; // Assuming the useUser hook is in this file

// Define form schema with validation
const profileSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  company: z.string().optional(),
  position: z.string().optional(),
  bio: z.string().max(500, 'Bio cannot exceed 500 characters').optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

const Profile = () => {

  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const { user, updateUser } = useUser();
  
  // Local form state
  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    company: user.company || '',
    position: user.position || '',
    bio: user.bio || '',
  });

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      ...formData
    }
  });

  const onSubmit: SubmitHandler<ProfileFormData> = (data) => {
    // Update user context with the new data
    updateUser({
      ...data,
      company: data.company || '',
      position: data.position || '',
      bio: data.bio || '',
    });

    console.log('Profile updated:', data);
    setIsEditing(false);
  };

  // Update form data when user context changes
  useEffect(() => {
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      company: user.company || '',
      position: user.position || '',
      bio: user.bio || '',
    });
    reset(formData);
  }, [user, reset]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        setProfileImage(imageUrl);
        updateUser({ profileImage: imageUrl });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditClick = () => {
    reset(formData);
    setIsEditing(true);
  };



  return (
    <div className="min-h-screen bg-neutral-800 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className=" shadow rounded-lg overflow-hidden">
          {/* Header */}
          <div className="px-6 py-5 flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-white">Profile</h2>
            {isEditing ? (
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    reset();
                    setIsEditing(false);
                  }}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-white   bg-black hover:bg-gray-50"
                >
                  <FiX className="mr-2 h-4 w-4" />
                  Cancel
                </button>
                <button
                  type="submit"
                  form="profile-form"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  <FiSave className="mr-2 h-4 w-4" />
                  Save Changes
                </button>
              </div>
            ) : (
              <button
                onClick={handleEditClick}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
              >
                <FiEdit2 className="mr-2 h-4 w-4" />
                Edit Profile
              </button>
            )}
          </div>


          {/* Profile Form */}
          <form id="profile-form" onSubmit={handleSubmit(onSubmit)} className="p-6">
            <div className="space-y-6">
              {/* Profile Picture */}
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <div className="h-24 w-24 rounded-full overflow-hidden bg-gray-200">
                    {profileImage ? (
                      <img
                        src={profileImage}
                        alt="Profile"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-gray-400">
                        <span className="text-2xl">{user.firstName.charAt(0)}{user.lastName.charAt(0)}</span>
                      </div>
                    )}
                  </div>
                  {isEditing && (
                    <label className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow-md cursor-pointer">
                      <FiUpload className="h-5 w-5 text-indigo-600" />
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </label>
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">Profile Photo</h3>
                  <p className="text-sm text-white">JPG, GIF or PNG. Max size of 2MB</p>
                </div>
              </div>

              {/* Name Fields */}
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label htmlFor="firstName" className="block text-md font-bold text-white">
                    First name
                  </label>
                  {isEditing ? (
                    <div className="mt-1">
                      <input
                        type="text"
                        id="firstName"
                        {...register('firstName')}
                        className={`block w-full border py-2 shadow-sm sm:text-sm text-white ${errors.firstName ? 'border-red-300  focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'}`}
                      />
                      {errors.firstName && (
                        <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
                      )}
                    </div>
                  ) : (
                    <p className="mt-1 text-sm text-white">{user.firstName}</p>
                  )}
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="lastName" className="block text-md font-bold text-white">
                    Last name
                  </label>
                  {isEditing ? (
                    <div className="mt-1">
                      <input
                        type="text"
                        id="lastName"
                        {...register('lastName')}
                        className={`block w-full border py-2  shadow-sm sm:text-sm text-white ${errors.lastName ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'}`}
                      />
                      {errors.lastName && (
                        <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
                      )}
                    </div>
                  ) : (
                    <p className="mt-1 text-sm text-white">{user.lastName}</p>
                  )}
                </div>
              </div>

              {/* Email and Phone */}
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label htmlFor="email" className="block text-md font-bold text-white">
                    Email address
                  </label>
                  {isEditing ? (
                    <div className="mt-1">
                      <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        {...register('email')}
                        className={`block w-full border py-2  shadow-sm sm:text-sm text-white ${errors.email ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'}`}
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                      )}
                    </div>
                  ) : (
                    <p className="mt-1 text-sm text-white">{user.email}</p>
                  )}
                </div>

                <div className="sm:col-span-4">
                  <label htmlFor="phone" className="block text-md font-bold text-white">
                    Phone number
                  </label>
                  {isEditing ? (
                    <div className="mt-1">
                      <input
                        type="text"
                        id="phone"
                        autoComplete="tel"
                        {...register('phone')}
                        className={`block w-full border py-2  shadow-sm sm:text-sm text-white ${errors.phone ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'}`}
                      />
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                      )}
                    </div>
                  ) : (
                    <p className="mt-1 text-sm text-white">{user.phone}</p>
                  )}
                </div>
              </div>

              {/* Company and Position */}
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label htmlFor="company" className="block text-md font-bold text-white">
                    Company
                  </label>
                  {isEditing ? (
                    <div className="mt-1">
                      <input
                        type="text"
                        id="company"
                        {...register('company')}
                        className="block w-full border py-2  text-white border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  ) : (
                    <p className="mt-1 text-sm text-white">{user.company}</p>
                  )}
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="position" className="block text-md font-bold text-white">
                    Position
                  </label>
                  {isEditing ? (
                    <div className="mt-1">
                      <input
                        type="text"
                        id="position"
                        {...register('position')}
                        className="block w-full py-2 border border-gray-300 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  ) : (
                    <p className="mt-1 text-sm text-white">{user.position}</p>
                  )}
                </div>
              </div>

              {/* Bio */}
              <div>
                <label htmlFor="bio" className="block text-md font-bold text-white">
                  Bio
                </label>
                {isEditing ? (
                  <div className="mt-1">
                    <textarea
                      id="bio"
                      rows={3}
                      {...register('bio')}
                      className="block w-full rounded-md border-gray-300 shadow-sm text-white focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    <p className="mt-2 text-sm text-gray-500">Write a few sentences about yourself.</p>
                  </div>
                ) : (
                  <p className="mt-1 text-sm text-white">{user.bio}</p>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;