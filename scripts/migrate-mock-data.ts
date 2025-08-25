import { PrismaClient } from "@prisma/client"
import { hashPassword } from "../src/utils/bcrypt"

const prisma = new PrismaClient()

// Mock users data
const mockUsers = [
    { name: "علی", username: "ali_user", email: "ali@example.com" },
    { name: "محمد", username: "mohammad_user", email: "mohammad@example.com" },
    { name: "حسین", username: "hosein_user", email: "hosein@example.com" },
    { name: "مهدی", username: "mehdi_user", email: "mehdi@example.com" },
    { name: "رضا", username: "reza_user", email: "reza@example.com" },
    { name: "سعید", username: "saeed_user", email: "saeed@example.com" },
    { name: "امیر", username: "amir_user", email: "amir@example.com" },
    { name: "مجید", username: "majid_user", email: "majid@example.com" },
    { name: "حسن", username: "hasan_user", email: "hasan@example.com" },
    { name: "عباس", username: "abbas_user", email: "abbas@example.com" },
    { name: "یاسر", username: "yaser_user", email: "yaser@example.com" },
    { name: "بهرام", username: "bahram_user", email: "bahram@example.com" },
    { name: "فرزاد", username: "farzad_user", email: "farzad@example.com" },
    { name: "کمال", username: "kamal_user", email: "kamal@example.com" },
    { name: "بهنام", username: "behnam_user", email: "behnam@example.com" },
    { name: "کوروش", username: "kourosh_user", email: "kourosh@example.com" },
    { name: "رامین", username: "ramin_user", email: "ramin@example.com" },
    { name: "سیاوش", username: "siavash_user", email: "siavash@example.com" },
    { name: "سامان", username: "saman_user", email: "saman@example.com" },
    { name: "نوید", username: "navid_user", email: "navid@example.com" },
    { name: "پیمان", username: "peyman_user", email: "peyman@example.com" },
    { name: "آرش", username: "arash_user", email: "arash@example.com" },
    { name: "شهاب", username: "shahab_user", email: "shahab@example.com" },
    { name: "پویا", username: "pouya_user", email: "pouya@example.com" },
    { name: "فرهاد", username: "farhad_user", email: "farhad@example.com" },
    { name: "ایمان", username: "iman_user", email: "iman@example.com" },
    { name: "وحید", username: "vahid_user", email: "vahid@example.com" },
    { name: "کاوه", username: "kaveh_user", email: "kaveh@example.com" },
    { name: "شهرام", username: "shahram_user", email: "shahram@example.com" },
    { name: "هوشنگ", username: "hooshang_user", email: "hooshang@example.com" },
    { name: "شهریار", username: "shahriyar_user", email: "shahriyar@example.com" },
    { name: "نادر", username: "nader_user", email: "nader@example.com" },
    { name: "تهمتن", username: "tahmatn_user", email: "tahmatn@example.com" },
    { name: "فریدون", username: "fereydoun_user", email: "fereydoun@example.com" },
    { name: "داریوش", username: "dariush_user", email: "dariush@example.com" },
    { name: "همایون", username: "homayoun_user", email: "homayoun@example.com" },
    { name: "جمشید", username: "jamshid_user", email: "jamshid@example.com" },
    { name: "فربد", username: "farbod_user", email: "farbod@example.com" },
    { name: "سهیل", username: "soheil_user", email: "soheil@example.com" },
    { name: "امید", username: "omid_user", email: "omid@example.com" },
]

// Mock tours data
const mockTours = [
    {
        title: "تور کویر مرنجاب",
        type: "Adventure",
        typeLabel: "ماجراجویی",
        location: "اصفهان",
        price: 700000,
        duration: 2,
        guideAvailable: true,
        image: "/images/maranjab-desert.jpg",
        description:
            "تجربه‌ای فراموش‌نشدنی در قلب کویر مرنجاب با مشاهده غروب خیره‌کننده و شب‌های پرستاره. این تور شامل کمپ در کویر، غذای محلی و فعالیت‌های هیجان‌انگیز است.",
        highlights: [
            "مشاهده غروب و طلوع آفتاب در کویر",
            "کمپ زدن زیر آسمان پرستاره",
            "سافاری با خودروهای آفرود",
            "تجربه سکوت مطلق کویر",
            "عکاسی از مناظر بکر طبیعی",
        ],
        itinerary: [
            {
                day: 1,
                title: "ورود به کویر و اسکان",
                activities: [
                    "حرکت از اصفهان به سمت کویر مرنجاب",
                    "ورود به کویر با خودروهای آفرود",
                    "برپایی کمپ و آشنایی با محیط",
                    "مشاهده غروب آفتاب",
                    "شام و شب نشینی دور آتش",
                ],
            },
            {
                day: 2,
                title: "اکتشاف کویر و بازگشت",
                activities: [
                    "مشاهده طلوع آفتاب",
                    "صبحانه در کویر",
                    "گشت و بازدید از نقاط دیدنی",
                    "عکاسی از مناظر طبیعی",
                    "بازگشت به اصفهان",
                ],
            },
        ],
        included: [
            "حمل و نقل با خودروی آفرود",
            "راهنمای مجرب کویر",
            "تجهیزات کمپینگ کامل",
            "وعده‌های غذایی (شام و صبحانه)",
            "بیمه مسافرتی",
        ],
        excluded: ["هزینه‌های شخصی", "نوشیدنی‌های سرد", "سوغات و خرید", "هزینه عکاسی حرفه‌ای"],
        requirements: ["داشتن کفش مناسب کوهنوردی", "لباس گرم برای شب", "کرم ضد آفتاب", "آب شخصی کافی"],
        maxCapacity: 12,
        difficulty: "متوسط",
        bestTime: "پاییز و زمستان",
        transportation: "خودروی آفرود",
        accommodation: "کمپ در کویر",
    },
    {
        title: "تور تاریخی تخت جمشید",
        type: "Historical",
        typeLabel: "تاریخی",
        location: "شیراز",
        price: 15000000,
        duration: 3,
        guideAvailable: true,
        image: "/images/persepolis.jpg",
        description:
            "سفری به قلب تاریخ ایران باستان با بازدید از تخت جمشید، نقش رستم و سایر آثار تاریخی شیراز. همراه با راهنمای تاریخ‌شناس و توضیحات کامل.",
        highlights: [
            "بازدید از کاخ‌های تخت جمشید",
            "مشاهده نقوش سنگی باستانی",
            "بازدید از نقش رستم",
            "موزه ملی ایران",
            "باغ ارم و حافظیه",
        ],
        itinerary: [
            {
                day: 1,
                title: "ورود به شیراز و بازدید شهری",
                activities: [
                    "فرود در فرودگاه شیراز",
                    "انتقال به هتل و اسکان",
                    "بازدید از باغ ارم",
                    "حافظیه و سعدیه",
                    "شام در رستوران سنتی",
                ],
            },
            {
                day: 2,
                title: "تخت جمشید و نقش رستم",
                activities: [
                    "صبحانه در هتل",
                    "حرکت به سمت تخت جمشید",
                    "بازدید کامل از کاخ‌های باستانی",
                    "نقش رستم و مقبره‌های شاهان",
                    "بازگشت به شیراز",
                ],
            },
            {
                day: 3,
                title: "بازدیدهای تکمیلی و بازگشت",
                activities: ["موزه پارس", "مسجد نصیرالملک", "بازار وکیل", "خرید سوغات", "انتقال به فرودگاه"],
            },
        ],
        included: [
            "بلیط هواپیما",
            "اقامت در هتل 4 ستاره",
            "راهنمای تاریخ‌شناس",
            "تمام وعده‌های غذایی",
            "حمل و نقل داخل شهر",
            "بلیط ورودی اماکن",
        ],
        excluded: ["هزینه‌های شخصی", "خرید سوغات", "نوشیدنی در رستوران‌ها"],
        requirements: ["کفش راحت پیاده‌روی", "لباس مناسب فصل", "کلاه آفتابی"],
        maxCapacity: 20,
        difficulty: "آسان",
        bestTime: "بهار و پاییز",
        transportation: "اتوبوس VIP",
        accommodation: "هتل 4 ستاره",
    },
    {
        title: "تور آرامش چالوس",
        type: "Relaxation",
        typeLabel: "آرامش",
        location: "مازندران",
        price: 12000000,
        duration: 4,
        guideAvailable: false,
        image: "/images/chalus.jpg",
        description: "فرار از شلوغی شهر به سمت طبیعت بکر چالوس. تجربه آرامش کنار دریا، جنگل‌های سبز و هوای پاک کوهستان.",
        highlights: [
            "اقامت در ویلای لوکس کنار دریا",
            "پیاده‌روی در جنگل‌های سبز",
            "ماهیگیری در دریای کاسپین",
            "ماساژ درمانی و آرامش‌بخشی",
            "غذاهای محلی شمالی",
        ],
        itinerary: [
            {
                day: 1,
                title: "سفر به چالوس و اسکان",
                activities: [
                    "حرکت از تهران",
                    "توقف در جاده چالوس برای عکاسی",
                    "ورود به ویلا و اسکان",
                    "آشنایی با امکانات",
                    "شام کنار دریا",
                ],
            },
            {
                day: 2,
                title: "فعالیت‌های دریایی",
                activities: [
                    "صبحانه با منظره دریا",
                    "شنا در دریای کاسپین",
                    "ماهیگیری",
                    "ناهار ماهی تازه",
                    "استراحت و آفتاب‌گیری",
                ],
            },
            {
                day: 3,
                title: "طبیعت‌گردی جنگلی",
                activities: [
                    "پیاده‌روی در جنگل",
                    "بازدید از آبشار محلی",
                    "پیک‌نیک در طبیعت",
                    "جمع‌آوری قارچ و گیاهان دارویی",
                    "شب نشینی دور آتش",
                ],
            },
            {
                day: 4,
                title: "آرامش و بازگشت",
                activities: ["یوگا صبحگاهی", "ماساژ درمانی", "صبحانه دیرهنگام", "جمع‌آوری وسایل", "بازگشت به تهران"],
            },
        ],
        included: ["اقامت در ویلای لوکس", "تمام وعده‌های غذایی", "امکانات تفریحی ویلا", "ماساژ درمانی", "تجهیزات ماهیگیری"],
        excluded: ["حمل و نقل", "هزینه‌های شخصی", "نوشیدنی‌های الکلی", "فعالیت‌های اضافی"],
        requirements: ["لباس شنا", "کرم ضد آفتاب", "لباس راحت", "کفش پیاده‌روی"],
        maxCapacity: 8,
        difficulty: "آسان",
        bestTime: "تابستان",
        transportation: "شخصی",
        accommodation: "ویلای لوکس",
    },
    {
        title: "تور فرهنگی بازار تبریز",
        type: "Cultural",
        typeLabel: "فرهنگی",
        location: "تبریز",
        price: 6000000,
        duration: 1,
        guideAvailable: true,
        image: "/images/tabriz-bazaar.jpg",
        description:
            "کشف فرهنگ غنی آذربایجان از طریق بازدید از بازار تاریخی تبریز، یکی از بزرگترین بازارهای سرپوشیده جهان.",
        highlights: [
            "بازدید از بازار تاریخی تبریز",
            "آشنایی با صنایع دستی محلی",
            "چشیدن غذاهای آذری",
            "خرید فرش و صنایع دستی",
            "بازدید از مسجد کبود",
        ],
        itinerary: [
            {
                day: 1,
                title: "کاوش در بازار تاریخی",
                activities: [
                    "ورود به بازار تبریز",
                    "بازدید از بخش‌های مختلف بازار",
                    "آشنایی با تاجران محلی",
                    "چشیدن چای آذری",
                    "خرید سوغات و صنایع دستی",
                    "بازدید از مسجد کبود",
                ],
            },
        ],
        included: ["راهنمای محلی", "ناهار سنتی آذری", "چای و شیرینی", "بلیط ورودی اماکن"],
        excluded: ["حمل و نقل", "خرید شخصی", "هزینه‌های اضافی"],
        requirements: ["کفش راحت پیاده‌روی", "لباس محتشم", "کیف پول نقدی"],
        maxCapacity: 15,
        difficulty: "آسان",
        bestTime: "تمام فصول",
        transportation: "پیاده",
        accommodation: "ندارد",
    },
    {
        title: "تور کوه‌نوردی دماوند",
        type: "Adventure",
        typeLabel: "ماجراجویی",
        location: "تهران",
        price: 20000000,
        duration: 5,
        guideAvailable: true,
        image: "/images/damavand.jpg",
        description: "صعود به بلندترین قله ایران و خاورمیانه. تجربه‌ای چالش‌برانگیز برای کوهنوردان با تجربه.",
        highlights: [
            "صعود به قله دماوند (5610 متر)",
            "مشاهده دریاچه لار",
            "کمپ در ارتفاعات",
            "تجربه کوهنوردی حرفه‌ای",
            "مناظر خیره‌کننده البرز",
        ],
        itinerary: [
            {
                day: 1,
                title: "حرکت به پایگاه",
                activities: [
                    "حرکت از تهران",
                    "رسیدن به پلور",
                    "اسکان در کلبه کوهنوردی",
                    "آماده‌سازی تجهیزات",
                    "استراحت و آماده‌سازی",
                ],
            },
            {
                day: 2,
                title: "صعود به کمپ یک",
                activities: ["صبحانه و آماده‌سازی", "شروع صعود", "رسیدن به کمپ یک (4200م)", "برپایی چادر", "استراحت و سازگاری"],
            },
            {
                day: 3,
                title: "صعود به کمپ دو",
                activities: [
                    "ادامه صعود",
                    "رسیدن به کمپ دو (5000م)",
                    "اسکان در پناهگاه",
                    "آماده‌سازی برای قله",
                    "استراحت کوتاه",
                ],
            },
            {
                day: 4,
                title: "صعود به قله",
                activities: ["شروع صعود در نیمه شب", "رسیدن به قله دماوند", "عکاسی و جشن", "فرود به کمپ دو", "استراحت"],
            },
            {
                day: 5,
                title: "فرود و بازگشت",
                activities: ["فرود به پایگاه", "جمع‌آوری تجهیزات", "بازگشت به تهران", "جشن پایان تور"],
            },
        ],
        included: ["راهنمای کوهنوردی مجرب", "تجهیزات کوهنوردی", "اقامت در پناهگاه‌ها", "وعده‌های غذایی", "بیمه کوهنوردی"],
        excluded: ["تجهیزات شخصی", "لباس کوهنوردی", "هزینه‌های درمانی"],
        requirements: ["تجربه کوهنوردی قبلی", "آمادگی جسمانی بالا", "گواهی پزشکی", "تجهیزات شخصی کامل"],
        maxCapacity: 6,
        difficulty: "سخت",
        bestTime: "تابستان",
        transportation: "مینی‌بوس",
        accommodation: "پناهگاه کوهنوردی",
    },
]

// Mock comments data
const mockComments = [
    {
        content: "تجربه فوق‌العاده‌ای بود! برنامه‌ریزی دقیق و حرفه‌ای.",
        userIndex: 2,
        tourIndex: 4,
    },
    {
        content: "همه چیز عالی بود، مخصوصاً راهنمای سفر بسیار کاربلد بود.",
        userIndex: 6,
        tourIndex: 1,
    },
    {
        content: "سفر خیلی خوبی بود، اما کاش زمان بیشتری برای بازدیدها داشتیم.",
        userIndex: 7,
        tourIndex: 2,
    },
    {
        content: "کیفیت خدمات عالی و قیمت منصفانه بود. پیشنهاد می‌کنم!",
        userIndex: 8,
        tourIndex: 0,
    },
    {
        content: "اقامتگاه‌ها بسیار راحت و تمیز بودند. واقعاً راضی بودم.",
        userIndex: 4,
        tourIndex: 3,
    },
    {
        content: "تور بسیار خوبی بود، اما برنامه زمانی کمی فشرده بود.",
        userIndex: 1,
        tourIndex: 1,
    },
    {
        content: "مسیرهای انتخاب‌شده بسیار جذاب و دیدنی بودند.",
        userIndex: 5,
        tourIndex: 0,
    },
    {
        content: "خدمات‌دهی عالی و پرسنل بسیار مودب و حرفه‌ای بودند.",
        userIndex: 9,
        tourIndex: 2,
    },
    {
        content: "طبیعت بی‌نظیر و هماهنگی تیم اجرایی مثال‌زدنی بود.",
        userIndex: 11,
        tourIndex: 3,
    },
    {
        content: "مناظر بسیار زیبا و تجربه‌ای خاطره‌انگیز.",
        userIndex: 13,
        tourIndex: 4,
    },
    {
        content: "هماهنگی‌ها دقیق انجام شده بود و مشکلی پیش نیامد.",
        userIndex: 0,
        tourIndex: 1,
    },
    {
        content: "غذاها خوشمزه و با کیفیت بودند. بسیار لذت بردم.",
        userIndex: 3,
        tourIndex: 2,
    },
    {
        content: "فضای آرامش‌بخش و امکانات رفاهی بسیار خوب.",
        userIndex: 10,
        tourIndex: 0,
    },
    {
        content: "راهنمای تور خیلی خوش‌برخورد بود و اطلاعات خوبی ارائه داد.",
        userIndex: 14,
        tourIndex: 3,
    },
    {
        content: "سفر خوبی بود، اما کاش برنامه‌ها منعطف‌تر بودند.",
        userIndex: 8,
        tourIndex: 4,
    },
    {
        content: "گروه همسفرها خیلی خوب بودند و تجربه‌ی جالبی داشتیم.",
        userIndex: 12,
        tourIndex: 1,
    },
    {
        content: "حمل و نقل بسیار راحت و به‌موقع بود.",
        userIndex: 15,
        tourIndex: 2,
    },
    {
        content: "تنوع برنامه‌ها عالی بود و برای همه‌ی سنین مناسب بود.",
        userIndex: 7,
        tourIndex: 0,
    },
    {
        content: "سفر به‌یادماندنی بود. واقعاً از انتخاب این تور راضی هستم.",
        userIndex: 17,
        tourIndex: 3,
    },
    {
        content: "برنامه‌ریزی تور به‌خوبی انجام شده بود. پیشنهاد می‌کنم!",
        userIndex: 16,
        tourIndex: 4,
    },
]

async function main() {
    console.log("🌱 Starting database migration...")

    try {
        // Clear existing data
        console.log("🧹 Clearing existing data...")
        await prisma.comment.deleteMany()
        await prisma.tour.deleteMany()
        await prisma.user.deleteMany()

        // Create users
        console.log("👥 Creating users...")
        const createdUsers = []
        for (const userData of mockUsers) {
            const hashedPassword = await hashPassword("123456") // Default password for all users
            const user = await prisma.user.create({
                data: {
                    ...userData,
                    password: hashedPassword,
                },
            })
            createdUsers.push(user)
        }
        console.log(`✅ Created ${createdUsers.length} users`)

        // Create tours
        console.log("🗺️ Creating tours...")
        const createdTours = []
        for (const tourData of mockTours) {
            const tour = await prisma.tour.create({
                data: tourData,
            })
            createdTours.push(tour)
        }
        console.log(`✅ Created ${createdTours.length} tours`)

        // Create comments
        console.log("💬 Creating comments...")
        let createdCommentsCount = 0
        for (const commentData of mockComments) {
            if (commentData.userIndex < createdUsers.length && commentData.tourIndex < createdTours.length) {
                await prisma.comment.create({
                    data: {
                        content: commentData.content,
                        userId: createdUsers[commentData.userIndex].id,
                        tourId: createdTours[commentData.tourIndex].id,
                    },
                })
                createdCommentsCount++
            }
        }
        console.log(`✅ Created ${createdCommentsCount} comments`)

        console.log("🎉 Database migration completed successfully!")
        console.log(`📊 Summary:`)
        console.log(`   - Users: ${createdUsers.length}`)
        console.log(`   - Tours: ${createdTours.length}`)
        console.log(`   - Comments: ${createdCommentsCount}`)
    } catch (error) {
        console.error("❌ Migration failed:", error)
        throw error
    } finally {
        await prisma.$disconnect()
    }
}

main().catch((e) => {
    console.error(e)
    process.exit(1)
})
