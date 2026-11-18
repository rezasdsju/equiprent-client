
import {
  Search,
  CalendarDays,
  CreditCard,
  PackageCheck,
} from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Browse Equipment",
    description:
      "Explore different equipment categories and find the right equipment for your needs.",
    icon: Search,
  },
  {
    id: 2,
    title: "Choose Rental Period",
    description:
      "Select your preferred rental dates based on your project requirements.",
    icon: CalendarDays,
  },
  {
    id: 3,
    title: "Book & Pay Securely",
    description:
      "Confirm your booking and complete the payment through a secure process.",
    icon: CreditCard,
  },
  {
    id: 4,
    title: "Get Your Equipment",
    description:
      "Receive your rented equipment and get started with your project.",
    icon: PackageCheck,
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-muted/40 py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
            Simple Process
          </p>

          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            How EquipRent Works
          </h2>

          <p className="mt-4 text-muted-foreground">
            Renting equipment is easy. Follow these four simple steps
            to get the equipment you need.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.id}
                className="relative flex flex-col items-center text-center"
              >
                <div className="relative mb-5 flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon size={30} />

                  <span className="absolute -right-2 -top-2 flex size-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {step.id}
                  </span>
                </div>

                <h3 className="mb-3 text-lg font-semibold">
                  {step.title}
                </h3>

                <p className="max-w-xs text-sm leading-6 text-muted-foreground">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
