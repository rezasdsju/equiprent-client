import Banner from "@/components/homepage/Banner"
import CategoriesSection from "@/components/homepage/CategoriesSection"
import CustomerReviews from "@/components/homepage/CustomerReviews"
import FetchFeaturesEquipment from "@/components/homepage/FetchFeaturesEquipment"
import HowItWorks from "@/components/homepage/HowItWorks"
import RecentlyAddedEquipment from "@/components/homepage/RecentlyAddedEquipment"
import WhyChooseUs from "@/components/homepage/WhyChooseUs"


export default function Page() {
  return (
    <div>
      <Banner></Banner>
      <FetchFeaturesEquipment></FetchFeaturesEquipment>
      <CategoriesSection></CategoriesSection>
      <WhyChooseUs></WhyChooseUs>
      <CustomerReviews></CustomerReviews>
      <HowItWorks></HowItWorks>
      <RecentlyAddedEquipment></RecentlyAddedEquipment>
    </div>
  )
}
