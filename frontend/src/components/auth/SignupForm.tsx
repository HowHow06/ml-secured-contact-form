"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
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
        message:
          "Password must contain at least one special character (!@#$%^&*).",
      }),
    rePassword: z.string().trim(),
    consent: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and conditions.",
    }),
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
      consent: false,
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
      toast({
        title: "Sign Up failed",
        description: "Unexcepted error, please try again later.",
      });
    }
  }

  return (
    <Dialog>
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
                  <Input
                    type="password"
                    placeholder="password here"
                    {...field}
                  />
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
          <FormField
            control={form.control}
            name="consent"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormControl>
                  <FormLabel className="flex items-center space-x-2">
                    <Input
                      type="checkbox"
                      className="accent-blue-500 h-4 w-4"
                      {...field}
                      value={undefined}
                      checked={field.value}
                    />
                    <span>
                      I agree to the{" "}
                      <DialogTrigger className="underline">
                        terms and conditions
                      </DialogTrigger>
                    </span>
                  </FormLabel>
                </FormControl>
                {fieldState.error && (
                  <FormMessage>{fieldState.error.message}</FormMessage>
                )}
              </FormItem>
            )}
          />
          <div className="flex justify-center">
            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting || form.getValues().consent === false}
            >
              Sign Up
            </Button>
          </div>
        </form>
      </Form>
      <DialogContent className="max-w-3xl px-8">
        <div className="max-h-[85vh] overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4">
            Consent to Process Personal Data
          </h2>
          <p className="mb-4">
            Thank you for choosing to sign up with us. Before you complete your
            registration, we need your consent to collect and use your personal
            information. Please read the following details carefully and give
            your consent by checking the box given.
          </p>

          <h3 className="font-semibold">Data Collection</h3>
          <p className="mb-4">
            During the signup and use of our services, we will collect the
            following personal data from you:
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>Full Name</li>
            <li>Email Address</li>
            <li>NRIC Number</li>
          </ul>

          <h3 className="font-semibold">Purpose of Data Processing</h3>
          <p className="mb-4">
            Your personal data is collected for the following purposes:
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>To establish and maintain your account.</li>
            <li>
              To provide customer support and ensure the security of your
              account.
            </li>
            <li>To communicate important account and service information.</li>
            <li>To comply with legal obligations.</li>
          </ul>

          <h3 className="font-semibold">Data Sharing and Disclosure</h3>
          <p className="mb-4">
            Your personal data will be treated with confidentiality and will not
            be shared with third parties except:
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>
              To service providers who assist us in our operations and under
              strict confidentiality agreements.
            </li>
            <li>
              When required by law or to protect the rights, property, or safety
              of our party, our users, or others.
            </li>
          </ul>

          <h3 className="font-semibold">Data Security</h3>
          <p className="mb-4">
            We implement appropriate technical and organizational measures to
            protect your personal data against unauthorized or unlawful
            processing, accidental loss, destruction, or damage.
          </p>

          <h3 className="font-semibold">Your Rights</h3>
          <p className="mb-4">You have the right to:</p>
          <ul className="list-disc list-inside mb-4">
            <li>Access the personal data we hold about you.</li>
            <li>Request the correction of incorrect or incomplete data.</li>
            <li>
              Lodge a complaint with a supervisory authority if you believe our
              processing of your personal data does not comply with legal
              requirements.
            </li>
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SignupForm;
