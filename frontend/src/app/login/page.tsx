import LoginForm from "@/components/auth/LoginForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Props = {};

const LoginPage = (props: Props) => {
  return (
    <main>
      <div>
        <h1 className="text-4xl font-bold my-10 text-center">Login</h1>
        <LoginForm />
        <div className="flex flex-col items-center space-y-4 mt-9">
          <Button variant="outline" className="w-80" asChild>
            <Link href={`/`}>Home</Link>
          </Button>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
