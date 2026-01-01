import { PhoneCheckerClient } from "./components/phone-checker-client";

export default function PhoneCheckerPage() {
  return (
    <div className="container py-12 md:py-16">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline">Phone Number Risk Checker</h1>
        <p className="text-lg text-muted-foreground mt-4">
          Enter a phone number to check its simulated risk profile. Our AI will analyze it based on fictional data for signs of spam or fraudulent activity.
        </p>
      </div>
      <PhoneCheckerClient />
    </div>
  );
}
