export type MockTour = {
  id: number;
  title: string;
  type:
    | "Relaxation"
    | "Cultural"
    | "Adventure"
    | "Luxury"
    | "Family"
    | "Nature"
    | "Historical"
    | "Sports";
  location: string;
  price: number;
  duration: number;
  guideAvailable: boolean;
  image: string;
};

type MockTours = MockTour[];

export const mockTours: MockTours = [
  {
    id: 1,
    title: "تور کویر مرنجاب",
    location: "اصفهان",
    price: 700000,
    duration: 2,
    guideAvailable: true,
    type: "Adventure",
    image: "/images/maranjab-desert.jpg",
  },
  {
    id: 2,
    title: "تور تاریخی تخت جمشید",
    location: "شیراز",
    price: 15000000,
    duration: 3,
    guideAvailable: true,
    type: "Historical",
    image: "/images/persepolis.jpg",
  },
  {
    id: 3,
    title: "تور آرامش چالوس",
    location: "مازندران",
    price: 12000000,
    duration: 4,
    guideAvailable: false,
    type: "Relaxation",
    image: "/images/chalus.jpg",
  },
  {
    id: 4,
    title: "تور فرهنگی بازار تبریز",
    location: "تبریز",
    price: 6000000,
    duration: 1,
    guideAvailable: true,
    type: "Cultural",
    image: "/images/tabriz-bazaar.jpg",
  },
  {
    id: 5,
    title: "تور کوه‌نوردی دماوند",
    location: "تهران",
    price: 20000000,
    duration: 5,
    guideAvailable: true,
    type: "Adventure",
    image: "/images/damavand.jpg",
  },
  {
    id: 6,
    title: "تور آرامش جزیره کیش",
    location: "کیش",
    price: 25000000,
    duration: 7,
    guideAvailable: false,
    type: "Relaxation",
    image: "/images/kish-island.jpg",
  },
  {
    id: 7,
    title: "تور طبیعت‌گردی جنگل‌های گیلان",
    location: "گیلان",
    price: 9000000,
    duration: 2,
    guideAvailable: true,
    type: "Adventure",
    image: "/images/gilan-forest.jpg",
  },
  {
    id: 8,
    title: "تور بازدید از ارگ بم",
    location: "کرمان",
    price: 8000000,
    duration: 1,
    guideAvailable: false,
    type: "Historical",
    image: "/images/bam-citadel.jpg",
  },
  {
    id: 9,
    title: "تور لوکس جزیره قشم",
    location: "قشم",
    price: 40000000,
    duration: 10,
    guideAvailable: true,
    type: "Relaxation",
    image: "/images/qeshm-island.jpg",
  },
  {
    id: 10,
    title: "تور عشایری کهگیلویه و بویراحمد",
    location: "کهگیلویه و بویراحمد",
    price: 5000000,
    duration: 2,
    guideAvailable: true,
    type: "Cultural",
    image: "/images/nomad-tour.jpg",
  },
  {
    id: 11,
    title: "تور ماجراجویی غار علیصدر",
    location: "همدان",
    price: 17000000,
    duration: 3,
    guideAvailable: false,
    type: "Adventure",
    image: "/images/alisadr-cave.jpg",
  },
  {
    id: 12,
    title: "تور تاریخی و فرهنگی اصفهان",
    location: "اصفهان",
    price: 12000000,
    duration: 4,
    guideAvailable: true,
    type: "Cultural",
    image: "/images/isfahan-cultural.jpg",
  },
  {
    id: 13,
    title: "تور ارزان سواحل چابهار",
    location: "چابهار",
    price: 3000000,
    duration: 2,
    guideAvailable: false,
    type: "Relaxation",
    image: "/images/chabahar-beach.jpg",
  },
  {
    id: 14,
    title: "تور ترکیبی سی‌وسه پل و پل خواجو",
    location: "اصفهان",
    price: 10000000,
    duration: 1,
    guideAvailable: true,
    type: "Historical",
    image: "/images/si-o-se-pol.jpg",
  },
  {
    id: 15,
    title: "تور آفرود لوت",
    location: "کرمان",
    price: 35000000,
    duration: 7,
    guideAvailable: true,
    type: "Adventure",
    image: "/images/loot-desert.jpg",
  },
  {
    id: 16,
    title: "تور قایق‌سواری در زاینده‌رود",
    location: "اصفهان",
    price: 8000000,
    duration: 1,
    guideAvailable: false,
    type: "Relaxation",
    image: "/images/zayandeh-rud.jpg",
  },
  {
    id: 17,
    title: "تور فرهنگی روستاهای ماسوله",
    location: "گیلان",
    price: 11000000,
    duration: 3,
    guideAvailable: true,
    type: "Cultural",
    image: "/images/masuleh-village.jpg",
  },
  {
    id: 18,
    title: "تور زمستانی اسکی در دیزین",
    location: "البرز",
    price: 30000000,
    duration: 5,
    guideAvailable: false,
    type: "Adventure",
    image: "/images/dizin-ski.jpg",
  },
];
