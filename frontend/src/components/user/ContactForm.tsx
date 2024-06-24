"use client";
import { useAuthContext } from "@/components/contexts/authContext";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import userApi from "@/lib/api/userApi";
import { validateNRICDate } from "@/lib/utils";
import { extractValidationError } from "@/lib/validationErrorHelper";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import NRICInput from "./NRICInput";

type Props = {};

const nricContinuousSchema = z
  .string()
  .length(12, "Invalid NRIC.")
  .refine((data) => validateNRICDate(data.substring(0, 6)), {
    message: "First 6 digits must represent a valid date in YYMMDD format",
  });

// Schema for format dddddd-dd-dddd (6 digits, hyphen, 2 digits, hyphen, 4 digits)
const nricHyphenatedSchema = z
  .string()
  .regex(/^\d{6}-\d{2}-\d{4}$/, {
    message: "Invalid NRIC.",
  })
  .refine((data) => validateNRICDate(data.substring(0, 6)), {
    message: "First 6 digits must represent a valid date in YYMMDD format",
  });

const formSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email format" }),
  fullname: z
    .string()
    .trim()
    .min(1, { message: "Fullname is required" })
    .max(100),
  dob: z.string({ message: "Date of Birth is required" }).date(),
  nric: z.union([nricHyphenatedSchema, nricContinuousSchema]),
});

const ContactForm = (props: Props) => {
  const { refreshAuthContext, user } = useAuthContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      fullname: "",
      dob: undefined,
      nric: "",
    },
  });
  const { toast } = useToast();

  useEffect(() => {
    if (user === undefined || user === null) {
      return;
    }

    form.reset({
      email: user.email,
      fullname: user.fullname || "",
      dob: user.dob
        ? new Date(user.dob).toISOString().split("T")[0]
        : undefined,
      nric: user.nric || "",
    });
    console.log("useEffect");
  }, [user, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { fullname, dob, nric } = values;
    setIsSubmitting(true);
    try {
      const res = await userApi.submitContactForm({
        fullname,
        dob,
        nric: nric.replaceAll("-", ""),
      });

      if (res.ok) {
        await refreshAuthContext();
        toast({
          title: "User details updated.",
        });
        setIsSubmitting(false);
        return;
      }

      const data = await res.json();

      if (data.errors) {
        const fields = ["fullname", "dob", "nric"] as const;
        fields.forEach((fieldName) => {
          const error = extractValidationError(data.errors, fieldName);
          if (error) {
            form.setError(fieldName, {
              type: "custom",
              message: `${fieldName} is invalid, please check your input.`,
            });
          }
        });
      }

      if (data.message) {
        toast({
          title: "Submit failed",
          description: data.message,
        });
      }

      setIsSubmitting(false);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-80">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="email"
                  readOnly
                  disabled
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fullname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fullname</FormLabel>
              <FormControl>
                <Input placeholder="fullname here" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dob"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date of Birth</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="nric"
          render={({ field }) => (
            <FormItem>
              <FormLabel>NRIC</FormLabel>
              <FormControl>
                <NRICInput
                  onValueChange={(val) => form.setValue("nric", val)}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-center">
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ContactForm;
