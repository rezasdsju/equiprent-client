
import { Star } from "lucide-react";

export interface ICustomerReview {
  id: string;
  name: string;
  rating: number;
  comment: string;
}

export const customerReviews: ICustomerReview[] = [
  {
    id: "review-001",
    name: "Rahim Ahmed",
    rating: 5,
    comment:
      "Great service! I rented an excavator at an affordable price. The booking process was very easy.",
  },
  {
    id: "review-002",
    name: "Nusrat Jahan",
    rating: 4,
    comment:
      "Found the camera equipment I needed for my photography project. Highly recommended!",
  },
  {
    id: "review-003",
    name: "Tanvir Hasan",
    rating: 5,
    comment:
      "The equipment owner was very helpful and the rental process was smooth. I had a great experience.",
  },
  {
    id: "review-004",
    name: "Sadia Islam",
    rating: 5,
    comment:
      "Secure payment and flexible rental duration made everything convenient. I will definitely use EquipRent again.",
  },
];




const CustomerReviews = () => {
  return (
    <section className="py-16 md:py-20 max-w-7xl mx-auto">
      <div className="container mx-auto px-4">
        {/* Section Heading */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
            Customer Reviews
          </p>

          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            What Our Customers Say
          </h2>

          <p className="mt-4 text-muted-foreground">
            Discover what our customers think about their equipment
            rental experience with EquipRent.
          </p>
        </div>

        {/* Review Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {customerReviews.map((review) => (
            <div
              key={review.id}
              className="rounded-xl border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Rating */}
              <div className="mb-5 flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    size={18}
                    className={
                      index < review.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-muted-foreground/30"
                    }
                  />
                ))}
              </div>

              {/* Review Comment */}
              <p className="mb-6 text-sm leading-7 text-muted-foreground">
                &quot;{review.comment}&quot;
              </p>

              {/* Customer Name */}
              <div className="border-t pt-4">
                <h3 className="font-semibold">{review.name}</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  EquipRent Customer
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
