import { Button } from "@/components/ui/button";
import ContactForm from "@/components/user/ContactForm";
import Link from "next/link";

type Props = {};

const ContactFormPage = (props: Props) => {
  return (
    <main>
      <div>
        <h1 className="text-4xl font-bold my-10 text-center">Contact Form</h1>
        <ContactForm />

        <div className="flex flex-col items-center space-y-4 mt-9">
          <Button variant="outline" className="w-80" asChild>
            <Link href={`/user`}>Back to Dashboard</Link>
          </Button>
        </div>
      </div>
    </main>
  );
};

export default ContactFormPage;
