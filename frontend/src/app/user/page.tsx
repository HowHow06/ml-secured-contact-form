import LogoutButton from "@/components/auth/LogoutButton";
import { Button } from "@/components/ui/button";
import UserName from "@/components/user/UserName";
import Link from "next/link";

type Props = {};

const UserPage = (props: Props) => {
  return (
    <main>
      <div>
        <h1 className="text-4xl font-bold my-10 text-center">
          Hi <UserName />{" "}
        </h1>

        <div className="flex flex-col items-center space-y-4 mt-9">
          <Button variant="outline" className="w-80" asChild>
            <Link href={`/user/contact-form`}>Contact Form</Link>
          </Button>
          <LogoutButton className="w-80" />
        </div>
      </div>
    </main>
  );
};

export default UserPage;
