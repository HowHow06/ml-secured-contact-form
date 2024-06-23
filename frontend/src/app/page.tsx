import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div>
        <h1 className="text-4xl font-bold my-10 text-center">
          Security Engineer Assessment
        </h1>
        <div className="flex flex-col items-center space-y-4">
          <Button variant="outline" className="w-80" asChild>
            <Link href={`/login`}>Login</Link>
          </Button>
          <Button variant="outline" className="w-80" asChild>
            <Link href={`/signup`}>Sign Up</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
