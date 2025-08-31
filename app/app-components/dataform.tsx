"use client";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { insertNewNode, updateNode } from "@/lib/neo4j/utils";

const formSchema = z.object({
  person_name: z.string().min(3).max(40),
  person_surname: z.string().min(3).max(40),
  person_dob: z
    .string()
    .regex(
      /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
      "Invalid date format, expected dd/mm/yyyy"
    ),
  person_birth_place: z.string().min(2).max(40),
  person_modified_name: z.string().min(2).max(40),
  person_gender: z.enum(["M", "F"]),
  person_marrige_status: z.enum(["MRD", "URD"]),
  person_D_A_status: z.enum(["D", "A"]),
  person_sasuraal: z.string().min(2).max(40),
  person_mayka: z.string().min(2).max(40),
});

type DataFormProps = {
  onCancel?: () => void;
  isUpdateForm?: boolean;
  personObj?: any;
};

export default function DataForm({
  onCancel,
  isUpdateForm,
  personObj,
}: DataFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: isUpdateForm
      ? {
          person_name: "demo",
          person_surname: "name",
          person_dob: "",
          person_birth_place: "",
          person_modified_name: "",
          person_gender: "M",
          person_marrige_status: "URD",
          person_D_A_status: "A",
          person_sasuraal: "",
          person_mayka: "",
        }
      : {
          person_name: "",
          person_surname: "",
          person_dob: "",
          person_birth_place: "",
          person_modified_name: "",
          person_gender: "M",
          person_marrige_status: "URD",
          person_D_A_status: "A",
          person_sasuraal: "",
          person_mayka: "",
        },
  });

  // Function to generate a 16-character alphanumeric ID
  function generatePersonId() {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let id = "";
    for (let i = 0; i < 16; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true);
      const person_id = generatePersonId();
      const dataWithId = { ...values, person_id };

      // Add your API call here
      console.log(dataWithId); // You need to implement this function
      if (isUpdateForm) {
        updateNode(dataWithId);
      } else {
        insertNewNode(dataWithId);
      }

      form.reset(); // Reset form after successful submission
      onCancel?.(); // Close form if needed
      // Add success toast here
    } catch (error) {
      console.error("Form submission error:", error);
      // Add error toast here
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="person_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter name"
                  {...field}
                  className="bg-gray-800 text-white placeholder-gray-400 border-gray-700 focus:border-amber-400"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="person_surname"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Surname</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter surname"
                  {...field}
                  className="bg-gray-800 text-white placeholder-gray-400 border-gray-700 focus:border-amber-400"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="person_dob"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Date of Birth</FormLabel>
              <FormControl>
                <Input
                  placeholder="dd/mm/yyyy"
                  {...field}
                  className="bg-gray-800 text-white placeholder-gray-400 border-gray-700 focus:border-amber-400"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="person_birth_place"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Birth Place</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter birth place"
                  {...field}
                  className="bg-gray-800 text-white placeholder-gray-400 border-gray-700 focus:border-amber-400"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="person_modified_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Modified Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter modified name"
                  {...field}
                  className="bg-gray-800 text-white placeholder-gray-400 border-gray-700 focus:border-amber-400"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="person_gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Gender</FormLabel>
              <FormControl>
                <select
                  {...field}
                  className="input bg-gray-800 text-white border-gray-700 focus:border-amber-400"
                >
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="person_marrige_status"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Marriage Status</FormLabel>
              <FormControl>
                <select
                  {...field}
                  className="input bg-gray-800 text-white border-gray-700 focus:border-amber-400"
                >
                  <option value="MRD">Married</option>
                  <option value="URD">Unmarried</option>
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="person_D_A_status"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">D/A Status</FormLabel>
              <FormControl>
                <select
                  {...field}
                  className="input bg-gray-800 text-white border-gray-700 focus:border-amber-400"
                >
                  <option value="D">D</option>
                  <option value="A">A</option>
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="person_sasuraal"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Sasuraal</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter sasuraal"
                  {...field}
                  className="bg-gray-800 text-white placeholder-gray-400 border-gray-700 focus:border-amber-400"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="person_mayka"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Mayka</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter mayka"
                  {...field}
                  className="bg-gray-800 text-white placeholder-gray-400 border-gray-700 focus:border-amber-400"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
