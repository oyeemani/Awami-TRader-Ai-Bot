
export const COMPANY_INFO = {
  name: "Awami Trader",
  website: "https://awamitrader.com/",
  address: "Ground floor, Awami arcade, Iran Rd, near chandani chowk, C Block Block C Satellite Town, Rawalpindi, 46000",
  mapLink: "https://maps.app.goo.gl/rrhzt8h6KothXjK16",
  phone: "+92 333 5597117", 
  admins: ["923335597117"], 
  specialization: "Industrial Machinery (CNC, Laser, Printers, Woodworking, DTF, UV)"
};

export const PRODUCT_PRICES = `
- CNC Router 4040 (16x16"): 700,000 PKR
- CNC Router 4060 (16x24"): 800,000 PKR
- CNC Router AWR-1325 Single Spindle: 1,550,000 PKR
- CNC Router AWR-1325 Double Spindle: 1,750,000 PKR
- Sliding Table Saw MJ-6132: 750,000 PKR
- Portable Sliding Table Saw: 300,000 PKR
- Edge Banding Machine WF-50D: 950,000 PKR
- Automatic Feeding Edge Banding: 510,000 PKR
- CO2 Laser Cutter 3020: 140,000 PKR
- CO2 Laser Cutter 4040: 220,000 PKR
- CO2 Laser Cutter 6040: 380,000 PKR
- CO2 Laser Cutter 6090: 720,000 PKR
- CO2 Laser Cutter 1410: 1,100,000 PKR
- CO2 Laser Cutter 1325: 1,550,000 PKR
- Fiber Laser Marking Machine 20Watt: 325,000 PKR
- Fiber Laser Marking Machine 30Watt: 425,000 PKR
- Fiber Laser Marking Machine 50Watt: 625,000 PKR
- Fiber Laser Marking Machine 70Watt: 825,000 PKR
- UV Laser Marking Machine 5Watt: 950,000 PKR
- Eco Solvent Printer 1.8M (XP600): 950,000 PKR
- Eco Solvent Printer 1.8M (i1600): 1,200,000 PKR
- Eco Solvent Printer 1.8M (i3200): 1,350,000 PKR
- Eco Solvent Printer 3.2M (i3200) 4Heads: 3,800,000 PKR
- DTF Printer - 30CM with Epson i1600 2 Heads: 1,650,000 PKR
- DTF Printer - 60cm Epson i1600 2 Heads & i3200 Head: 2,950,000 PKR
- CO2 Laser cutter / Engraver 1610: 1,350,000 PKR
- CO2 Laser Cutter / Engraver 1318: 1,450,000 PKR
- My Cut MK-630U: 10,000 PKR
- My Cut MC-630: 160,000 PKR
- My Cut MK-1500U: 180,000 PKR
- My Cut Cutting Plotter MC-1500: 280,000 PKR
- Cutting Plotter HK-1400: 120,000 PKR
- Mobile Protector Cutting Machine: 110,000 PKR
- Eyelet Hole Punching Machine: 45,000 PKR
- Manual Lifter: Contact for Price
- Hydraulic Lifter: Contact for Price
- GZM 3204 SG - 25PL (Used): 2,950,000 PKR
- Grando KM512i Printer: 3,600,000 PKR
- Sublimation Printer: Contact for Price
- Thunder Jet AF1800 Printer (Used): 950,000 to 1,500,000 PKR
- Epson XP600 1.8M Printer: 1,050,000 PKR
- UV Roll to Roll Printer: 160,000 PKR
- UV Flatbed Printer 2513: 550,000 PKR
- UV Flatbed Printer 1610: 3,950,000 PKR
- UV Flatbed Printer 6090: 2,950,000 PKR
- UV Flatbed Printer 6040: 140,000 PKR
- UV DTF Printer 60cm: 2,550,000 to 2,950,000 PKR
- UV DTF Printer 30cm: 1,650,000 to 1,850,000 PKR
- DTF Printer 60cm (Epson i1600 x2 & i3200): 2,550,000 to 2,950,000 PKR
- Digital Ribbon Foil Printer AMD320: 80,000 PKR
- Digital Pen Printer: 80,000 PKR
- Full Automatic Hot and Cold Laminator: 400,000 PKR
- Fully Automatic Hot & Cold Laminators: 380,000 PKR
- Promotion Table | China Kiosk: Contact for Price
- Roll Up Stand: Contact for Price
- X Stand: Contact for Price
`;

export const TECHNICAL_SPECS = `
Category: Laser / Non Metal (4040, 6090, 1325, 1410, 1610)
- Uses: Acrylic, Wood, MDF, Fabric engraving/cutting.
- CO2 laser technology, water cooled.

Category: Fiber Laser Marking (20W - 70W)
- Uses: Metal marking, jewelry, steel.
- Models: Raycus source preferred.

Category: Metal Cutting (Fiber Laser)
- Model: RJ-3015. 1500W to 6000W Raycus source.

Category: Digital Printers
- DTF (30cm/60cm): Epson i1600/i3200 heads for t-shirt printing.
- UV Printers: Flatbed (6090, 2513) and Roll to Roll.
- Eco Solvent: 1.8M and 3.2M for vinyl/flex.

Category: Woodworking & Finishing
- CNC Routers: AWR-1325 series.
- Edge Banding: WF-50D and Automatic models.
- Laminators: Hot and Cold full automatic.
`;

export const SYSTEM_INSTRUCTION = `
You are the "Awami Trader Sales AI". 
Official Website: https://awamitrader.com/
Official Contact: +92 333 5597117

STRICTEST RULE: PRICE ACCURACY
1. NEVER use external knowledge for prices.
2. ALWAYS check the internal list provided in the prompt.
3. If a machine is asked, search for its name in the "PRICE_LIST" and state the exact price.
4. If a price is "Contact for Price", ask for their contact details to provide a quote.

STRICTEST RULE: TECHNICAL DETAILS
1. Use the Google Search tool ONLY for technical specifications (dimensions, power, area) by searching "site:awamitrader.com [product name]".
2. DO NOT use Google Search for prices if the price is already in your internal list.

CONVERSATION FLOW:
- Be polite (Assalam-o-Alaikum / Ji bilkul).
- Use Roman Urdu mixed with English.
- When an order or high interest is detected, ask for: Name, Phone Number, and Machine Name.
- Output the ORDER_SUMMARY block only when you have all 3 pieces of information.

ORDER_SUMMARY FORMAT:
ORDER_SUMMARY:
Customer Name: [Name]
Contact Number: [Phone Number]
Selected Product: [Product Name]

Note: Admin number for WhatsApp is 923335597117.
`;
