import { Campaign } from '../types';

export const INITIAL_CAMPAIGNS: Campaign[] = [
  {
    id: 'campaign-1',
    title: 'Emergency Surgery & Recovery for Bella the Golden Retriever',
    category: 'Animals & Pets',
    description: 'Bella suffered a severe spinal injury and urgently needs specialized neurosurgery and physical rehab in Seattle.',
    fullStory: `Bella is our spirited 4-year-old rescue golden retriever who has been an emotional anchor for our family and children. Last Tuesday, she suffered a sudden acute disc herniation resulting in hind leg paralysis. 

Veterinarians at the Seattle Emergency Specialty Hospital have scheduled her for decompressive hemilaminectomy surgery. The surgical procedure, intensive post-operative care, and two months of hydrotherapy total 28.5 SOL. 

We have set up this SolFund so animal lovers around the world can help Bella walk and run again. Every small fraction of SOL brings Bella closer to her healing journey!`,
    imageUrl: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=1200&q=80',
    targetSol: 28.5,
    raisedSol: 19.4,
    donorCount: 42,
    organizerName: 'Sarah & Marcus Lindqvist',
    organizerEmail: 'sarah.lindqvist@solhelp.example.com',
    confidentialSolWallet: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
    createdAt: '2026-09-08',
    verified: true,
    featured: true,
  },
  {
    id: 'campaign-2',
    title: 'Clean Solar Water Well for the Kajiado Community School',
    category: 'Community',
    description: 'Installing a high-capacity solar-powered borehole well providing potable drinking water to 640 children and surrounding elders.',
    fullStory: `In the semi-arid region of Kajiado, hundreds of students walk upwards of 6 kilometers every morning carrying heavy plastic jerricans of turbid water before attending classes. 

Our community initiative has partnered with local hydrologists and clean-tech engineers to drill a 180-meter borehole powered completely by off-grid solar panels and a gravity-fed filtration depot. 

With 45 SOL, we can purchase the borehole submersible pump, high-efficiency solar inverters, stainless steel pipe fittings, and high-volume antimicrobial water tanks. Clean water transforms health, school attendance, and community resilience.`,
    imageUrl: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1200&q=80',
    targetSol: 45.0,
    raisedSol: 38.2,
    donorCount: 89,
    organizerName: 'Elder Joseph Ole Ndung’u',
    organizerEmail: 'kajiado.cleanwater@solhelp.example.com',
    confidentialSolWallet: '9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM',
    createdAt: '2026-08-25',
    verified: true,
    featured: true,
  },
  {
    id: 'campaign-3',
    title: 'Medical Recovery & Prosthetic Care for Elena Vasquez',
    category: 'Medical',
    description: 'Supporting Elena’s advanced myoelectric prosthetic fitting and intensive rehabilitation after surviving an industrial transport accident.',
    fullStory: `Elena is an architectural technician and single mother who survived a severe highway collision on her morning commute earlier this spring. While she miraculously pulled through, she required an above-elbow amputation of her dominant arm.

Modern bionic prosthetics now offer high-dexterity intuitive motor control, giving Elena the chance to return to drafting, cooking with her daughter Maya, and living an independent life. 

The prosthetic device and 6-month occupational neuro-muscular training plan requires 34 SOL. Thank you for reading Elena’s journey and joining our circle of support!`,
    imageUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80',
    targetSol: 34.0,
    raisedSol: 22.8,
    donorCount: 56,
    organizerName: 'Mateo Vasquez (Brother)',
    organizerEmail: 'mateo.vasquez@solhelp.example.com',
    confidentialSolWallet: '4uQeVj5tqViQh7yWWGStvfEG1Zmhx6uasJtWCJziofM',
    createdAt: '2026-09-02',
    verified: true,
    featured: false,
  },
  {
    id: 'campaign-4',
    title: 'Coastal Storm Rebuilding Fund for the Fishermen’s Cooperative',
    category: 'Emergency',
    description: 'Replacing destroyed skiffs, nets, and refrigeration stations for 18 artisanal fishing families following Cyclone Mariposa.',
    fullStory: `Category 4 Cyclone Mariposa made landfall directly over our coastal village, tearing away wooden docks and shattering the small cooperative fleet that 18 indigenous artisanal fishing families rely upon for daily food and livelihood.

We are coming together to collectively purchase timber, sustainable fiberglass repair kits, marine safety GPS beacons, and deep-freeze solar ice units to revive daily operations.

Total emergency rebuild fund: 50 SOL. Community members are contributing all labor voluntarily. With your Solana contributions, these families will safely return to the sea within weeks.`,
    imageUrl: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&w=1200&q=80',
    targetSol: 50.0,
    raisedSol: 15.6,
    donorCount: 31,
    organizerName: 'Captain Raul Menendez',
    organizerEmail: 'coop.mariposa@solhelp.example.com',
    confidentialSolWallet: '8FrK4FpS8xXf3d9GkLmN5pQw7z2Y1vR6tC4bA8sD9eE2',
    createdAt: '2026-09-11',
    verified: true,
    featured: false,
  },
  {
    id: 'campaign-5',
    title: 'Open Source Coding Lab & Hardware for Rural High Schoolers',
    category: 'Education',
    description: 'Equipping 45 eager high school students with refurbished Raspberry Pi workstations and offline educational libraries.',
    fullStory: `Our rural academy serves brilliant students who have a burning passion for science and programming, yet our current computer lab consists of five broken machines from 2008 that cannot compile modern code.

We are creating a solar-assisted micro computing lab featuring 45 Raspberry Pi 5 desktop kits, mechanical keyboards, durable monitors, and localized offline Wikipedia/Khan Academy mirrors.

12 SOL buys all 45 stations, wiring, and basic solar backup storage. Inspiring the next generation of engineers begins with simple, reliable access to computing tools.`,
    imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80',
    targetSol: 12.0,
    raisedSol: 11.2,
    donorCount: 64,
    organizerName: 'Claire Thornton, Computer Science Teacher',
    organizerEmail: 'claire.thornton@solhelp.example.com',
    confidentialSolWallet: '2bNh8FjL9qP5wT3zX6vR1kM8sC7dA4eE9gH2jK5mN8pQ',
    createdAt: '2026-08-30',
    verified: true,
    featured: false,
  },
  {
    id: 'campaign-6',
    title: 'Mobile Wildlife Veterinary Clinic for Threatened Pangolins & Owls',
    category: 'Animals & Pets',
    description: 'Equipping a rapid-response mobile vehicle with field diagnostic equipment and incubator units for rescued exotic wildlife.',
    fullStory: `Our rescue foundation operates across 400 square miles of protected wildlife corridor. Often, injured animals such as pangolins, barn owls, and tortoises cannot survive lengthy transports back to the metropolitan sanctuary.

We are retrofitting a 4WD vehicle with a field ultrasound, sterile mobile surgery setup, oxygen concentrator, and temperature-regulated transport incubators. 

Your support powers 100% field preparedness. 18 SOL covers the medical retrofit and first 6 months of veterinary pharmaceuticals.`,
    imageUrl: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80',
    targetSol: 18.0,
    raisedSol: 7.9,
    donorCount: 22,
    organizerName: 'Dr. Aaron Vance, DVM',
    organizerEmail: 'wildlife.rescue@solhelp.example.com',
    confidentialSolWallet: '5hK8mN2pQ4rT6vX8zB1dF3jL5nS7uW9yA2cE4gH6jK8m',
    createdAt: '2026-09-05',
    verified: true,
    featured: false,
  },
];
