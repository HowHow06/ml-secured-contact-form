import SignupForm from "@/components/auth/SignupForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Props = {};

const SignUpPage = (props: Props) => {
  return (
    <main>
      <div>
        <h1 className="text-4xl font-bold my-10 text-center">Sign Up</h1>
        <SignupForm />
        <div className="flex flex-col items-center space-y-4 mt-9">
          <Button variant="outline" className="w-80" asChild>
            <Link href={`/`}>Home</Link>
          </Button>
        </div>
      </div>
    </main>
  );
};

export default SignUpPage;
