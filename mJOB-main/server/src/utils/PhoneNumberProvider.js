const getPhoneNumberProvider = (value) => {
  // Vinaphone: 091, 094, 088, 083, 084, 085, 081, 082
  // Viettel: 086, 096, 097, 098, 032, 033, 034, 035, 036, 037, 038, 039
  // Mobilephone: 089, 090, 093, 070, 079, 077, 076, 078
  // iTel: 087
  // Vietnamobile: 092, 052, 056, 058
  // Wintel: 055
  // VNSKY: 077
  // Local: 089
  const provider = {
    "032": "Viettel",
    "033": "Viettel",
    "034": "Viettel",
    "035": "Viettel",
    "036": "Viettel",
    "037": "Viettel",
    "038": "Viettel",
    "039": "Viettel",
    "052": "Vietnamobile",
    "055": "Wintel",
    "056": "Vietnamobile",
    "058": "Vietnamobile",
    "070": "Mobilephone",
    "076": "Mobilephone",
    "077": "VNSKY",
    "078": "Mobilephone",
    "079": "Mobilephone",
    "081": "Vinaphone",
    "082": "Vinaphone",
    "083": "Vinaphone",
    "084": "Vinaphone",
    "085": "Vinaphone",
    "086": "Viettel",
    "087": "iTel",
    "088": "Vinaphone",
    "089": "Local",
    "090": "Mobilephone",
    "091": "Vinaphone",
    "092": "Vietnamobile",
    "093": "Mobilephone",
    "094": "Vinaphone",
    "096": "Viettel",
    "097": "Viettel",
    "098": "Viettel",
  };
  const prefix = value.substring(0, 3);
  // if exist, return provider, else return Unknown
  return provider[prefix] ? provider[prefix] : "Unknown";
};

export { getPhoneNumberProvider };
