require("dotenv").config();
require("./config/connection");

const Product = require("./models/Product");

const products = [
  {
    name: "Summit Trailbreaker 29",
    description: "A lightweight 29er mountain bike built for fast cross-country climbs and stable descents on technical trails.",
    price: "2199",
    category: "mountain-bike",
    pictures: [
      { url: "https://cdn.pixabay.com/photo/2016/07/21/18/38/cycling-1533268_1280.jpg" },
      { url: "https://cdn.pixabay.com/photo/2020/05/20/05/25/mountain-bike-5194716_640.png" },
      { url: "https://cdn.pixabay.com/photo/2017/08/03/11/16/mountain-2575658_640.jpg" }
    ]
  },
  {
    name: "Rock Ridge Enduro",
    description: "A rugged enduro mountain bike with 150mm travel and powerful hydraulic disc brakes for aggressive downhilling.",
    price: "2799",
    category: "mountain-bike",
    pictures: [
      { url: "https://cdn.pixabay.com/photo/2016/11/19/13/14/action-1839225_640.jpg" },
      { url: "https://cdn.pixabay.com/photo/2020/04/10/20/19/bike-5027692_640.jpg" },
      { url: "https://cdn.pixabay.com/photo/2018/11/09/04/31/biker-3803739_640.jpg" }
    ]
  },
  {
    name: "Peak Slayer Carbon",
    description: "Premium carbon frame and race-ready geometry make this bike ideal for steep climbs and fast trail sections.",
    price: "3199",
    category: "mountain-bike",
    pictures: [
      { url: "https://cdn.pixabay.com/photo/2016/07/31/05/29/bike-1558508_640.jpg" },
      { url: "https://cdn.pixabay.com/photo/2017/08/18/17/52/cycling-2655825_640.jpg" },
      { url: "https://cdn.pixabay.com/photo/2020/09/28/10/42/bikes-5609382_640.jpg" }
    ]
  },
  {
    name: "Terra Storm 650B",
    description: "Responsive 650B wheels, full suspension, and tough tires for technical rock gardens and dirt trails.",
    price: "2499",
    category: "mountain-bike",
    pictures: [
      { url: "https://cdn.pixabay.com/photo/2024/04/13/13/26/cycling-8693890_640.jpg" },
      { url: "https://cdn.pixabay.com/photo/2020/05/20/05/25/mountain-bike-5194716_640.png" },
      { url: "https://cdn.pixabay.com/photo/2017/08/03/11/16/mountain-2575658_640.jpg" }
    ]
  },
  {
    name: "TrailHunter Alloy",
    description: "A value-packed trail bike with dependable components, progressive geometry, and confident handling.",
    price: "1899",
    category: "mountain-bike",
    pictures: [
      { url: "https://cdn.pixabay.com/photo/2016/11/19/13/14/action-1839225_640.jpg" },
      { url: "https://cdn.pixabay.com/photo/2020/04/10/20/19/bike-5027692_640.jpg" },
      { url: "https://cdn.pixabay.com/photo/2016/07/21/18/38/cycling-1533268_1280.jpg" }
    ]
  },
  {
    name: "Gravel Crusher",
    description: "A versatile mountain bike designed for gravel and hardpack trails with confidence and speed.",
    price: "1999",
    category: "mountain-bike",
    pictures: [
      { url: "https://cdn.pixabay.com/photo/2018/11/09/04/31/biker-3803739_640.jpg" },
      { url: "https://cdn.pixabay.com/photo/2016/07/31/05/29/bike-1558508_640.jpg" },
      { url: "https://cdn.pixabay.com/photo/2017/08/18/17/52/cycling-2655825_640.jpg" }
    ]
  },
  {
    name: "Apex Ridge 27.5",
    description: 'A nimble 27.5" mountain bike engineered for jump lines, flow trails, and agile cornering.',
    price: "1799",
    category: "mountain-bike",
    pictures: [
      { url: "https://cdn.pixabay.com/photo/2020/09/28/10/42/bikes-5609382_640.jpg" },
      { url: "https://cdn.pixabay.com/photo/2024/04/13/13/26/cycling-8693890_640.jpg" },
      { url: "https://cdn.pixabay.com/photo/2020/05/20/05/25/mountain-bike-5194716_640.png" }
    ]
  },
  {
    name: "Summit Pro 4",
    description: "Endurance-oriented mountain bike with premium suspension and precise shifting for all-day trail rides.",
    price: "2299",
    category: "mountain-bike",
    pictures: [
      { url: "https://cdn.pixabay.com/photo/2017/08/03/11/16/mountain-2575658_640.jpg" },
      { url: "https://cdn.pixabay.com/photo/2016/11/19/13/14/action-1839225_640.jpg" },
      { url: "https://cdn.pixabay.com/photo/2020/04/10/20/19/bike-5027692_640.jpg" }
    ]
  },
  {
    name: "CloudRider 29",
    description: "Fast-rolling 29er with a balanced frame and stable handling for long trail days.",
    price: "2099",
    category: "mountain-bike",
    pictures: [
      { url: "https://cdn.pixabay.com/photo/2016/07/31/05/29/bike-1558508_640.jpg" },
      { url: "https://cdn.pixabay.com/photo/2016/07/21/18/38/cycling-1533268_1280.jpg" },
      { url: "https://cdn.pixabay.com/photo/2024/04/13/13/26/cycling-8693890_640.jpg" }
    ]
  },
  {
    name: "Ridge Sprint 1",
    description: "A fast trail bike with a lightweight alloy frame and crisp handling for sharp climbs.",
    price: "1699",
    category: "mountain-bike",
    pictures: [
      { url: "https://cdn.pixabay.com/photo/2020/05/20/05/25/mountain-bike-5194716_640.png" },
      { url: "https://cdn.pixabay.com/photo/2020/09/28/10/42/bikes-5609382_640.jpg" },
      { url: "https://cdn.pixabay.com/photo/2018/11/09/04/31/biker-3803739_640.jpg" }
    ]
  },
  {
    name: "Titan Trail Comp",
    description: "A tough mountain companion with advanced frame reinforcement and dependable drivetrain performance.",
    price: "2399",
    category: "mountain-bike",
    pictures: [
      { url: "https://cdn.pixabay.com/photo/2017/08/18/17/52/cycling-2655825_640.jpg" },
      { url: "https://cdn.pixabay.com/photo/2020/04/10/20/19/bike-5027692_640.jpg" },
      { url: "https://cdn.pixabay.com/photo/2016/07/21/18/38/cycling-1533268_1280.jpg" }
    ]
  },
  {
    name: "StonePath Expert",
    description: "A premium trail machine with progressive geometry, durable tires, and exceptional control on technical terrain.",
    price: "2899",
    category: "mountain-bike",
    pictures: [
      { url: "https://cdn.pixabay.com/photo/2024/04/13/13/26/cycling-8693890_640.jpg" },
      { url: "https://cdn.pixabay.com/photo/2017/08/03/11/16/mountain-2575658_640.jpg" },
      { url: "https://cdn.pixabay.com/photo/2016/11/19/13/14/action-1839225_640.jpg" }
    ]
  },
  {
    name: "Velocity Aero S",
    description: "Lightweight road bike built to cut through wind with an aero frame and efficient 20-speed drivetrain.",
    price: "2599",
    category: "road-bike",
    pictures: [
      { url: "https://cdn.pixabay.com/photo/2021/07/17/20/02/road-6473967_640.jpg" },
      { url: "https://cdn.pixabay.com/photo/2014/07/30/23/00/bicycles-405779_640.jpg" },
      { url: "https://cdn.pixabay.com/photo/2015/09/05/08/14/bike-924153_640.jpg" }
    ]
  },
  {
    name: "RoadGlide Elite",
    description: "A fast endurance road bike for long rides, featuring stable geometry and carbon fiber performance.",
    price: "2899",
    category: "road-bike",
    pictures: [
      { url: "https://cdn.pixabay.com/photo/2015/06/27/03/06/road-823199_640.jpg" },
      { url: "https://cdn.pixabay.com/photo/2014/06/04/16/44/bicycle-362171_640.jpg" },
      { url: "https://cdn.pixabay.com/photo/2018/01/25/04/25/bike-3105384_640.jpg" }
    ]
  },
  {
    name: "Sprintline RC",
    description: "Race-ready road machine with a stiff frame, speedy wheelset, and crisp shifting for fast group rides.",
    price: "3299",
    category: "road-bike",
    pictures: [
      { url: "https://cdn.pixabay.com/photo/2017/04/06/20/14/girl-2209228_640.jpg" },
      { url: "https://cdn.pixabay.com/photo/2021/07/17/20/02/road-6473967_640.jpg" },
      { url: "https://cdn.pixabay.com/photo/2014/07/30/23/00/bicycles-405779_640.jpg" }
    ]
  },
  {
    name: "CityCruiser 105",
    description: "Comfort-oriented road bike with relaxed geometry, perfect for weekend rides and social cycling.",
    price: "1599",
    category: "road-bike",
    pictures: [
      { url: "https://cdn.pixabay.com/photo/2015/09/05/08/14/bike-924153_640.jpg" },
      { url: "https://cdn.pixabay.com/photo/2015/06/27/03/06/road-823199_640.jpg" },
      { url: "https://cdn.pixabay.com/photo/2014/06/04/16/44/bicycle-362171_640.jpg" }
    ]
  },
  {
    name: "TourX Endurance",
    description: "Designed for long-distance comfort and smooth handling, this road bike takes on epic rides with ease.",
    price: "1999",
    category: "road-bike",
    pictures: [
      { url: "https://cdn.pixabay.com/photo/2018/01/25/04/25/bike-3105384_640.jpg" },
      { url: "https://cdn.pixabay.com/photo/2021/07/17/20/02/road-6473967_640.jpg" },
      { url: "https://cdn.pixabay.com/photo/2017/04/06/20/14/girl-2209228_640.jpg" }
    ]
  },
  {
    name: "Racer Velo Pro",
    description: "Aggressive geometry and lightweight components for riders chasing fast road sprints and club victories.",
    price: "2699",
    category: "road-bike",
    pictures: [
      { url: "https://cdn.pixabay.com/photo/2014/07/30/23/00/bicycles-405779_640.jpg" },
      { url: "https://cdn.pixabay.com/photo/2015/09/05/08/14/bike-924153_640.jpg" },
      { url: "https://cdn.pixabay.com/photo/2015/06/27/03/06/road-823199_640.jpg" }
    ]
  },
  {
    name: "CarbonSwift SL",
    description: "Smooth carbon frame and endurance geometry for a responsive road ride that stays comfortable all day.",
    price: "2999",
    category: "road-bike",
    pictures: [
      { url: "https://cdn.pixabay.com/photo/2014/06/04/16/44/bicycle-362171_640.jpg" },
      { url: "https://cdn.pixabay.com/photo/2018/01/25/04/25/bike-3105384_640.jpg" },
      { url: "https://cdn.pixabay.com/photo/2021/07/17/20/02/road-6473967_640.jpg" }
    ]
  },
  {
    name: "PaceMaster 56",
    description: "A smooth-climbing road bike built to maintain fast pace on rolling terrain and long rides.",
    price: "2399",
    category: "road-bike",
    pictures: [
      { url: "https://cdn.pixabay.com/photo/2017/04/06/20/14/girl-2209228_640.jpg" },
      { url: "https://cdn.pixabay.com/photo/2014/07/30/23/00/bicycles-405779_640.jpg" },
      { url: "https://cdn.pixabay.com/photo/2015/09/05/08/14/bike-924153_640.jpg" }
    ]
  },
  {
    name: "UrbanLight RS",
    description: "Sleek and fast, this lightweight road bike is ideal for quick commutes and weekend fitness rides.",
    price: "1799",
    category: "road-bike",
    pictures: [
      { url: "https://cdn.pixabay.com/photo/2015/09/05/08/14/bike-924153_640.jpg" },
      { url: "https://cdn.pixabay.com/photo/2021/07/17/20/02/road-6473967_640.jpg" },
      { url: "https://cdn.pixabay.com/photo/2014/07/30/23/00/bicycles-405779_640.jpg" }
    ]
  },
  {
    name: "WindRider Alloy",
    description: "An alloy road bike that offers a smooth ride and precision handling at an accessible price.",
    price: "1499",
    category: "road-bike",
    pictures: [
      { url: "https://cdn.pixabay.com/photo/2014/06/04/16/44/bicycle-362171_640.jpg" },
      { url: "https://cdn.pixabay.com/photo/2018/01/25/04/25/bike-3105384_640.jpg" },
      { url: "https://cdn.pixabay.com/photo/2015/06/27/03/06/road-823199_640.jpg" }
    ]
  },
  {
    name: "Strada Sport",
    description: "Sporty road geometry with a strong frame and responsive handling for riders who crave speed.",
    price: "2199",
    category: "road-bike",
    pictures: [
      { url: "https://cdn.pixabay.com/photo/2017/04/06/20/14/girl-2209228_640.jpg" },
      { url: "https://cdn.pixabay.com/photo/2014/07/30/23/00/bicycles-405779_640.jpg" },
      { url: "https://cdn.pixabay.com/photo/2015/09/05/08/14/bike-924153_640.jpg" }
    ]
  },
  {
    name: "RoadPilot 8",
    description: "Engineered for confident road riding, this model delivers smooth power transfer and a stable chassis.",
    price: "1899",
    category: "road-bike",
    pictures: [
      { url: "https://cdn.pixabay.com/photo/2018/01/25/04/25/bike-3105384_640.jpg" },
      { url: "https://cdn.pixabay.com/photo/2021/07/17/20/02/road-6473967_640.jpg" },
      { url: "https://cdn.pixabay.com/photo/2014/06/04/16/44/bicycle-362171_640.jpg" }
    ]
  },
  {
    name: "ComfyCruise Classic",
    description: "A relaxed ride-bike with an upright posture, cushioned seat, and easy shifting for everyday comfort.",
    price: "999",
    category: "ride-bike",
    pictures: [
      { url: "https://cdn.pixabay.com/photo/2015/03/21/14/34/silhouette-683751_1280.jpg" },
      { url: "https://cdn.pixabay.com/photo/2023/11/06/04/53/woman-8368830_640.jpg" },
      { url: "https://cdn.pixabay.com/photo/2020/10/24/03/09/biking-5680458_640.jpg" }
    ]
  },
  {
    name: "EasyPath Comfort",
    description: "Designed for relaxed rides and errands, this bike has a smooth frame, step-through access, and wide tires.",
    price: "1099",
    category: "ride-bike",
    pictures: [
      { url: "https://cdn.pixabay.com/photo/2018/03/06/03/56/cyclist-3202481_640.jpg" },
      { url: "https://cdn.pixabay.com/photo/2016/11/29/07/42/bicycle-1868162_640.jpg" },
      { url: "https://cdn.pixabay.com/photo/2016/11/29/03/25/bicycles-1867046_640.jpg" }
    ]
  },
  {
    name: "Sunset Glide",
    description: "Perfect for afternoon cruises, this ride-bike is built for stability, comfort, and scenic enjoyment.",
    price: "899",
    category: "ride-bike",
    pictures: [
      { url: "https://cdn.pixabay.com/photo/2021/09/02/18/34/child-6594126_640.jpg" },
      { url: "https://cdn.pixabay.com/photo/2023/10/06/07/14/architecture-8297605_640.jpg" },
      { url: "https://cdn.pixabay.com/photo/2016/07/22/14/12/bike-1534902_640.jpg" }
    ]
  },
  {
    name: "Happy Trails Hybrid",
    description: "A hybrid ride-bike that blends city comfort with light off-road capability for flexible weekend adventures.",
    price: "1299",
    category: "ride-bike",
    pictures: [
      { url: "https://cdn.pixabay.com/photo/2022/08/06/19/20/woman-7369219_640.jpg" },
      { url: "https://cdn.pixabay.com/photo/2023/10/24/02/49/bike-8337261_640.jpg" },
      { url: "https://cdn.pixabay.com/photo/2023/05/30/19/15/bicycle-8029570_640.jpg" }
    ]
  },
  {
    name: "Everyday Explorer",
    description: "Built for city streets and park paths, this ride-bike keeps your posture upright and your ride smooth.",
    price: "1049",
    category: "ride-bike",
    pictures: [
      { url: "https://cdn.pixabay.com/photo/2021/11/17/16/40/bike-ride-6804105_640.jpg" },
      { url: "https://cdn.pixabay.com/photo/2015/03/21/14/34/silhouette-683751_1280.jpg" },
      { url: "https://cdn.pixabay.com/photo/2023/11/06/04/53/woman-8368830_640.jpg" }
    ]
  },
  {
    name: "CityStroll 7",
    description: "A light and agile ride-bike with seven speeds, ideal for commuting and scenic city exploration.",
    price: "949",
    category: "ride-bike",
    pictures: [
      { url: "https://cdn.pixabay.com/photo/2020/10/24/03/09/biking-5680458_640.jpg" },
      { url: "https://cdn.pixabay.com/photo/2018/03/06/03/56/cyclist-3202481_640.jpg" },
      { url: "https://cdn.pixabay.com/photo/2016/11/29/07/42/bicycle-1868162_640.jpg" }
    ]
  },
  {
    name: "LeisureLine 20",
    description: "Casual leisure bike with a soft seat, wide handlebars, and relaxed gearing for simple, enjoyable rides.",
    price: "899",
    category: "ride-bike",
    pictures: [
      { url: "https://cdn.pixabay.com/photo/2016/11/29/03/25/bicycles-1867046_640.jpg" },
      { url: "https://cdn.pixabay.com/photo/2021/09/02/18/34/child-6594126_640.jpg" },
      { url: "https://cdn.pixabay.com/photo/2023/10/06/07/14/architecture-8297605_640.jpg" }
    ]
  },
  {
    name: "UrbanJoy Comfort",
    description: "A stylish city ride-bike with elegant lines, comfortable grips, and a low-step frame.",
    price: "1199",
    category: "ride-bike",
    pictures: [
      { url: "https://cdn.pixabay.com/photo/2016/07/22/14/12/bike-1534902_640.jpg" },
      { url: "https://cdn.pixabay.com/photo/2022/08/06/19/20/woman-7369219_640.jpg" },
      { url: "https://cdn.pixabay.com/photo/2023/10/24/02/49/bike-8337261_640.jpg" }
    ]
  },
  {
    name: "RiverRide 3",
    description: "A calm and steady ride-bike for leisure outings beside rivers, parks, and boardwalks.",
    price: "1049",
    category: "ride-bike",
    pictures: [
      { url: "https://cdn.pixabay.com/photo/2023/05/30/19/15/bicycle-8029570_640.jpg" },
      { url: "https://cdn.pixabay.com/photo/2021/11/17/16/40/bike-ride-6804105_640.jpg" },
      { url: "https://cdn.pixabay.com/photo/2015/03/21/14/34/silhouette-683751_1280.jpg" }
    ]
  },
  {
    name: "SmoothRide Hybrid",
    description: "Stable ride-bike with hybrid tires, built to handle paved streets and light countryside paths.",
    price: "1149",
    category: "ride-bike",
    pictures: [
      { url: "https://cdn.pixabay.com/photo/2023/11/06/04/53/woman-8368830_640.jpg" },
      { url: "https://cdn.pixabay.com/photo/2020/10/24/03/09/biking-5680458_640.jpg" },
      { url: "https://cdn.pixabay.com/photo/2018/03/06/03/56/cyclist-3202481_640.jpg" }
    ]
  },
  {
    name: "Weekend Wanderer",
    description: "Designed for casual explorers, this bike offers a comfortable frame and steady handling for weekend rides.",
    price: "999",
    category: "ride-bike",
    pictures: [
      { url: "https://cdn.pixabay.com/photo/2016/11/29/07/42/bicycle-1868162_640.jpg" },
      { url: "https://cdn.pixabay.com/photo/2016/11/29/03/25/bicycles-1867046_640.jpg" },
      { url: "https://cdn.pixabay.com/photo/2021/09/02/18/34/child-6594126_640.jpg" }
    ]
  },
  {
    name: "BreezeWay 8",
    description: "A lightweight cruiser with simple shifting, ideal for relaxed rides around town and weekend escapes.",
    price: "949",
    category: "ride-bike",
    pictures: [
      { url: "https://cdn.pixabay.com/photo/2023/10/06/07/14/architecture-8297605_640.jpg" },
      { url: "https://cdn.pixabay.com/photo/2016/07/22/14/12/bike-1534902_640.jpg" },
      { url: "https://cdn.pixabay.com/photo/2022/08/06/19/20/woman-7369219_640.jpg" }
    ]
  }
];

async function seedProducts() {
  try {
    await Product.deleteMany({});
    const created = await Product.insertMany(products);
    console.log(`Successfully inserted ${created.length} products.`);
    process.exit(0);
  } catch (error) {
    console.error("Error seeding products:", error.message || error);
    process.exit(1);
  }
}

seedProducts();
