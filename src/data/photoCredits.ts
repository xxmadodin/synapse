// Photos are from Wikimedia Commons and used under their Creative Commons licenses.
// Attribution is required, so these are rendered in the footer.
export const PHOTO_CREDITS = [
  { subject: "Honda Activa 6G", author: "Alka", license: "CC BY-SA 4.0", file: "Honda_Activa_6G.jpg" },
  { subject: "Bajaj Chetak Electric", author: "Gpkp", license: "CC BY-SA 4.0", file: "Bajaj_Chetak_electric_scooters_(2026)_02.jpg" },
  { subject: "TVS Jupiter", author: "SnapMeUp", license: "CC BY 4.0", file: "TVS_Jupiter_Scooter.jpg" },
  { subject: "Royal Enfield Hunter 350", author: "Pintu dasaundhi", license: "CC BY-SA 4.0", file: "Hunter_350_side_view_India_Model.png" },
  { subject: "Royal Enfield Classic 350", author: "Samihasib", license: "CC BY-SA 4.0", file: "Royal_Enfield_Classic_350_(2017_Model_Year).jpg" },
  { subject: "Yamaha MT-15", author: "Ganesh Mohan T", license: "CC BY-SA 4.0", file: "Yamaha_MT_15_Green_version.jpg" },
  { subject: "Maruti Suzuki Swift", author: "Alexander-93", license: "CC BY-SA 4.0", file: "2020_Suzuki_Swift_Facelift_IMG_1880.jpg" },
  { subject: "Maruti Suzuki Baleno", author: "Milind Kwatra", license: "CC BY 3.0", file: "2022_Maruti_Suzuki_Baleno_Alpha_(India)_front_view.jpg" },
  { subject: "Mahindra Thar", author: "DjDavid1998", license: "CC BY-SA 4.0", file: "Mahindra_Thar_Photoshoot_at_Perupalem_Beach_(West_Godavari_District,_AP,_India)_Djdavid.jpg" },
  { subject: "Riding in Ladakh", author: "Gopal Vijayaraghavan", license: "CC BY 3.0", file: "Royalenfield_Himalaya.jpg" },
  { subject: "Rider in Ladakh", author: "PulkitPithvaWiki", license: "CC BY-SA 4.0", file: "Bike_riding_In_Ladakh,_India.jpg" },
];

export const commonsUrl = (file: string) =>
  `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(file)}`;
