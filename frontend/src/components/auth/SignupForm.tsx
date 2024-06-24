"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import authApi from "@/lib/api/authApi";
import { extractValidationError } from "@/lib/validationErrorHelper";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "../ui/use-toast";

type Props = {};

const formSchema = z
  .object({
    email: z
      .string()
      .trim()
      .min(1, { message: "Email is required" })
      .email({ message: "Invalid email format" }),
    password: z
      .string()
      .trim()
      .min(1, { message: "Password is required" })
      .max(200, { message: "Password must not exceed 200 characters" })
      .min(8, { message: "Password is too short - should be 8 chars minimum." })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter.",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter.",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number." })
      .regex(/[!@#$%^&*]/, {
        message: "Password must contain at least one special character.",
      }),
    rePassword: z.string().trim(),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords must match",
    path: ["rePassword"],
  });

const SignupForm = (props: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rePassword: "",
    },
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { email, password } = values;
    setIsSubmitting(true);
    try {
      const res = await authApi.signup({
        email: email,
        password: password,
      });

      if (res.ok) {
        toast({
          title: "Account Signed Up!",
          description: "Redirecting to login page in few seconds...",
        });
        setTimeout(() => {
          router.push("/login");
        }, 5000);
        return;
      }

      const data = await res.json();

      if (data.errors) {
        const emailError = extractValidationError(data.errors, "email");
        const passwordError = extractValidationError(data.errors, "password");

        if (emailError) {
          form.setError("email", {
            type: "custom",
            message: "Email is invalid, please check your input.",
          });
        }

        if (passwordError) {
          form.setError("password", {
            type: "custom",
            message: "Password is invalid, please check your input.",
          });
        }
      }

      if (data.message) {
        toast({
          title: `Sign Up Failed`,
          description: `${data.message}`,
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
                <Input type="email" placeholder="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="password here" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="rePassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Re-enter Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="re-enter password here"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-center">
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            Sign Up
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SignupForm;
