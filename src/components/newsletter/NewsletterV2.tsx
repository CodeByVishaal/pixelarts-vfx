import { toast } from "react-toastify";

interface FormEventHandler {
  // eslint-disable-next-line no-unused-vars
  (event: React.FormEvent<HTMLFormElement>): void;
}

const NewsletterV2 = () => {
  //@ts-ignore
  const handleForm: FormEventHandler = (event) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    form.reset();
    toast.success("Thanks For Your Email!");
  };

  return <></>;
};

export default NewsletterV2;
