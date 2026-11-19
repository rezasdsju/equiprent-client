
import {
    Wallet,
    BadgeCheck,
    CalendarClock,
    ShieldCheck,
} from "lucide-react";

const benefits = [
    {
        id: 1,
        title: "Affordable Rental Prices",
        description:
            "Get the equipment you need at competitive prices without the high cost of ownership.",
        icon: Wallet,
    },
    {
        id: 2,
        title: "Verified Equipment Owners",
        description:
            "Rent with confidence from verified equipment owners and trusted providers.",
        icon: BadgeCheck,
    },
    {
        id: 3,
        title: "Flexible Rental Periods",
        description:
            "Choose rental durations that fit your project, whether you need equipment for a day or longer.",
        icon: CalendarClock,
    },
    {
        id: 4,
        title: "Secure Payments",
        description:
            "Enjoy a safe and reliable payment experience when booking your equipment.",
        icon: ShieldCheck,
    },
];

const WhyChooseUs = () => {
    return (
        <section className="bg-muted/40 py-16 md:py-20 max-w-7xl mx-auto">
            <div className="container mx-auto px-4">

                <div className="mx-auto mb-12 max-w-2xl text-center">
                    <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
                        Why Choose EquipRent
                    </p>

                    <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                        Equipment Rental Made Simple
                    </h2>

                    <p className="mt-4 text-muted-foreground">
                        We make equipment rental easier with affordable prices,
                        trusted owners, flexible booking options, and secure payments.
                    </p>
                </div>


                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {benefits.map((benefit) => {
                        const Icon = benefit.icon;

                        return (
                            <div
                                key={benefit.id}
                                className="group rounded-xl border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                            >
                                <div className="mb-5 flex size-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                                    <Icon size={28} />
                                </div>

                                <h3 className="mb-3 text-lg font-semibold">
                                    {benefit.title}
                                </h3>

                                <p className="text-sm leading-6 text-muted-foreground">
                                    {benefit.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
