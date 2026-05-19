export const treeselectCountries = {
  // obtained via https://gist.github.com/depperm/9cf8fc6f06ec1c8f9c87457ca64d94ba
  computed: {
    treeselectCountries() {
      const countries = [
        {
          label: "Afghanistan",
          id: "AF"
        },
        {
          label: "Åland Islands",
          id: "AX"
        },
        {
          label: "Albania",
          id: "AL"
        },
        {
          label: "Algeria",
          id: "DZ"
        },
        {
          label: "American Samoa",
          id: "AS"
        },
        {
          label: "Andorra",
          id: "AD"
        },
        {
          label: "Angola",
          id: "AO"
        },
        {
          label: "Anguilla",
          id: "AI"
        },
        {
          label: "Antarctica",
          id: "AQ"
        },
        {
          label: "Antigua and Barbuda",
          id: "AG"
        },
        {
          label: "Argentina",
          id: "AR"
        },
        {
          label: "Armenia",
          id: "AM"
        },
        {
          label: "Aruba",
          id: "AW"
        },
        {
          label: "Australia",
          id: "AU"
        },
        {
          label: "Austria",
          id: "AT"
        },
        {
          label: "Azerbaijan",
          id: "AZ"
        },
        {
          label: "Bahamas (The)",
          id: "BS"
        },
        {
          label: "Bahrain",
          id: "BH"
        },
        {
          label: "Bangladesh",
          id: "BD"
        },
        {
          label: "Barbados",
          id: "BB"
        },
        {
          label: "Belarus",
          id: "BY"
        },
        {
          label: "Belgium",
          id: "BE"
        },
        {
          label: "Belize",
          id: "BZ"
        },
        {
          label: "Benin",
          id: "BJ"
        },
        {
          label: "Bermuda",
          id: "BM"
        },
        {
          label: "Bhutan",
          id: "BT"
        },
        {
          label: "Bolivia (Plurinational State of)",
          id: "BO"
        },
        {
          label: "Bonaire, Sint Eustatius and Saba",
          id: "BQ"
        },
        {
          label: "Bosnia and Herzegovina",
          id: "BA"
        },
        {
          label: "Botswana",
          id: "BW"
        },
        {
          label: "Bouvet Island",
          id: "BV"
        },
        {
          label: "Brazil",
          id: "BR"
        },
        {
          label: "British Indian Ocean Territory (the)",
          id: "IO"
        },
        {
          label: "Brunei Darussalam",
          id: "BN"
        },
        {
          label: "Bulgaria",
          id: "BG"
        },
        {
          label: "Burkina Faso",
          id: "BF"
        },
        {
          label: "Burundi",
          id: "BI"
        },
        {
          label: "Cabo Verde",
          id: "CV"
        },
        {
          label: "Cambodia",
          id: "KH"
        },
        {
          label: "Cameroon",
          id: "CM"
        },
        {
          label: "Canada",
          id: "CA"
        },
        {
          label: "Cayman Islands (the)",
          id: "KY"
        },
        {
          label: "Central African Republic (the)",
          id: "CF"
        },
        {
          label: "Chad",
          id: "TD"
        },
        {
          label: "Chile",
          id: "CL"
        },
        {
          label: "China",
          id: "CN"
        },
        {
          label: "Christmas Island",
          id: "CX"
        },
        {
          label: "Cocos (Keeling) Islands (the)",
          id: "CC"
        },
        {
          label: "Colombia",
          id: "CO"
        },
        {
          label: "Comoros (the)",
          id: "KM"
        },
        {
          label: "Congo (the Democratic Republic of the)",
          id: "CD"
        },
        {
          label: "Congo (the)",
          id: "CG"
        },
        {
          label: "Cook Islands (the)",
          id: "CK"
        },
        {
          label: "Costa Rica",
          id: "CR"
        },
        {
          label: "Croatia",
          id: "HR"
        },
        {
          label: "Cuba",
          id: "CU"
        },
        {
          label: "Curaçao",
          id: "CW"
        },
        {
          label: "Cyprus",
          id: "CY"
        },
        {
          label: "Czechia",
          id: "CZ"
        },
        {
          label: "Côte d'Ivoire",
          id: "CI"
        },
        {
          label: "Denmark",
          id: "DK"
        },
        {
          label: "Djibouti",
          id: "DJ"
        },
        {
          label: "Dominica",
          id: "DM"
        },
        {
          label: "Dominican Republic (the)",
          id: "DO"
        },
        {
          label: "Ecuador",
          id: "EC"
        },
        {
          label: "Egypt",
          id: "EG"
        },
        {
          label: "El Salvador",
          id: "SV"
        },
        {
          label: "Equatorial Guinea",
          id: "GQ"
        },
        {
          label: "Eritrea",
          id: "ER"
        },
        {
          label: "Estonia",
          id: "EE"
        },
        {
          label: "Eswatini",
          id: "SZ"
        },
        {
          label: "Ethiopia",
          id: "ET"
        },
        {
          label: "Falkland Islands (the) [Malvinas]",
          id: "FK"
        },
        {
          label: "Faroe Islands (the)",
          id: "FO"
        },
        {
          label: "Fiji",
          id: "FJ"
        },
        {
          label: "Finland",
          id: "FI"
        },
        {
          label: "France",
          id: "FR"
        },
        {
          label: "French Guiana",
          id: "GF"
        },
        {
          label: "French Polynesia",
          id: "PF"
        },
        {
          label: "French Southern Territories (the)",
          id: "TF"
        },
        {
          label: "Gabon",
          id: "GA"
        },
        {
          label: "Gambia (the)",
          id: "GM"
        },
        {
          label: "Georgia",
          id: "GE"
        },
        {
          label: "Germany",
          id: "DE"
        },
        {
          label: "Ghana",
          id: "GH"
        },
        {
          label: "Gibraltar",
          id: "GI"
        },
        {
          label: "Greece",
          id: "GR"
        },
        {
          label: "Greenland",
          id: "GL"
        },
        {
          label: "Grenada",
          id: "GD"
        },
        {
          label: "Guadeloupe",
          id: "GP"
        },
        {
          label: "Guam",
          id: "GU"
        },
        {
          label: "Guatemala",
          id: "GT"
        },
        {
          label: "Guernsey",
          id: "GG"
        },
        {
          label: "Guinea",
          id: "GN"
        },
        {
          label: "Guinea-Bissau",
          id: "GW"
        },
        {
          label: "Guyana",
          id: "GY"
        },
        {
          label: "Haiti",
          id: "HT"
        },
        {
          label: "Heard Island and McDonald Islands",
          id: "HM"
        },
        {
          label: "Holy See (the)",
          id: "VA"
        },
        {
          label: "Honduras",
          id: "HN"
        },
        {
          label: "Hong Kong",
          id: "HK"
        },
        {
          label: "Hungary",
          id: "HU"
        },
        {
          label: "Iceland",
          id: "IS"
        },
        {
          label: "India",
          id: "IN"
        },
        {
          label: "Indonesia",
          id: "ID"
        },
        {
          label: "Iran (Islamic Republic of)",
          id: "IR"
        },
        {
          label: "Iraq",
          id: "IQ"
        },
        {
          label: "Ireland",
          id: "IE"
        },
        {
          label: "Isle of Man",
          id: "IM"
        },
        {
          label: "Israel",
          id: "IL"
        },
        {
          label: "Italy",
          id: "IT"
        },
        {
          label: "Jamaica",
          id: "JM"
        },
        {
          label: "Japan",
          id: "JP"
        },
        {
          label: "Jersey",
          id: "JE"
        },
        {
          label: "Jordan",
          id: "JO"
        },
        {
          label: "Kazakhstan",
          id: "KZ"
        },
        {
          label: "Kenya",
          id: "KE"
        },
        {
          label: "Kiribati",
          id: "KI"
        },
        {
          label: "Korea (the Democratic People's Republic of)",
          id: "KP"
        },
        {
          label: "Korea (the Republic of)",
          id: "KR"
        },
        {
          label: "Kuwait",
          id: "KW"
        },
        {
          label: "Kyrgyzstan",
          id: "KG"
        },
        {
          label: "Lao People's Democratic Republic (the)",
          id: "LA"
        },
        {
          label: "Latvia",
          id: "LV"
        },
        {
          label: "Lebanon",
          id: "LB"
        },
        {
          label: "Lesotho",
          id: "LS"
        },
        {
          label: "Liberia",
          id: "LR"
        },
        {
          label: "Libya",
          id: "LY"
        },
        {
          label: "Liechtenstein",
          id: "LI"
        },
        {
          label: "Lithuania",
          id: "LT"
        },
        {
          label: "Luxembourg",
          id: "LU"
        },
        {
          label: "Macao",
          id: "MO"
        },
        {
          label: "Madagascar",
          id: "MG"
        },
        {
          label: "Malawi",
          id: "MW"
        },
        {
          label: "Malaysia",
          id: "MY"
        },
        {
          label: "Maldives",
          id: "MV"
        },
        {
          label: "Mali",
          id: "ML"
        },
        {
          label: "Malta",
          id: "MT"
        },
        {
          label: "Marshall Islands (the)",
          id: "MH"
        },
        {
          label: "Martinique",
          id: "MQ"
        },
        {
          label: "Mauritania",
          id: "MR"
        },
        {
          label: "Mauritius",
          id: "MU"
        },
        {
          label: "Mayotte",
          id: "YT"
        },
        {
          label: "Mexico",
          id: "MX"
        },
        {
          label: "Micronesia (Federated States of)",
          id: "FM"
        },
        {
          label: "Moldova (the Republic of)",
          id: "MD"
        },
        {
          label: "Monaco",
          id: "MC"
        },
        {
          label: "Mongolia",
          id: "MN"
        },
        {
          label: "Montenegro",
          id: "ME"
        },
        {
          label: "Montserrat",
          id: "MS"
        },
        {
          label: "Morocco",
          id: "MA"
        },
        {
          label: "Mozambique",
          id: "MZ"
        },
        {
          label: "Myanmar",
          id: "MM"
        },
        {
          label: "Namibia",
          id: "NA"
        },
        {
          label: "Nauru",
          id: "NR"
        },
        {
          label: "Nepal",
          id: "NP"
        },
        {
          label: "Netherlands",
          id: "NL"
        },
        {
          label: "New Caledonia",
          id: "NC"
        },
        {
          label: "New Zealand",
          id: "NZ"
        },
        {
          label: "Nicaragua",
          id: "NI"
        },
        {
          label: "Niger (the)",
          id: "NE"
        },
        {
          label: "Nigeria",
          id: "NG"
        },
        {
          label: "Niue",
          id: "NU"
        },
        {
          label: "Norfolk Island",
          id: "NF"
        },
        {
          label: "North Macedonia",
          id: "MK"
        },
        {
          label: "Northern Mariana Islands (the)",
          id: "MP"
        },
        {
          label: "Norway",
          id: "NO"
        },
        {
          label: "Oman",
          id: "OM"
        },
        {
          label: "Pakistan",
          id: "PK"
        },
        {
          label: "Palau",
          id: "PW"
        },
        {
          label: "Palestine, State of",
          id: "PS"
        },
        {
          label: "Panama",
          id: "PA"
        },
        {
          label: "Papua New Guinea",
          id: "PG"
        },
        {
          label: "Paraguay",
          id: "PY"
        },
        {
          label: "Peru",
          id: "PE"
        },
        {
          label: "Philippines (the)",
          id: "PH"
        },
        {
          label: "Pitcairn",
          id: "PN"
        },
        {
          label: "Poland",
          id: "PL"
        },
        {
          label: "Portugal",
          id: "PT"
        },
        {
          label: "Puerto Rico",
          id: "PR"
        },
        {
          label: "Qatar",
          id: "QA"
        },
        {
          label: "Romania",
          id: "RO"
        },
        {
          label: "Russian Federation (the)",
          id: "RU"
        },
        {
          label: "Rwanda",
          id: "RW"
        },
        {
          label: "Réunion",
          id: "RE"
        },
        {
          label: "Saint Barthélemy",
          id: "BL"
        },
        {
          label: "Saint Helena, Ascension and Tristan da Cunha",
          id: "SH"
        },
        {
          label: "Saint Kitts and Nevis",
          id: "KN"
        },
        {
          label: "Saint Lucia",
          id: "LC"
        },
        {
          label: "Saint Martin (French part)",
          id: "MF"
        },
        {
          label: "Saint Pierre and Miquelon",
          id: "PM"
        },
        {
          label: "Saint Vincent and the Grenadines",
          id: "VC"
        },
        {
          label: "Samoa",
          id: "WS"
        },
        {
          label: "San Marino",
          id: "SM"
        },
        {
          label: "Sao Tome and Principe",
          id: "ST"
        },
        {
          label: "Saudi Arabia",
          id: "SA"
        },
        {
          label: "Senegal",
          id: "SN"
        },
        {
          label: "Serbia",
          id: "RS"
        },
        {
          label: "Seychelles",
          id: "SC"
        },
        {
          label: "Sierra Leone",
          id: "SL"
        },
        {
          label: "Singapore",
          id: "SG"
        },
        {
          label: "Sint Maarten (Dutch part)",
          id: "SX"
        },
        {
          label: "Slovakia",
          id: "SK"
        },
        {
          label: "Slovenia",
          id: "SI"
        },
        {
          label: "Solomon Islands",
          id: "SB"
        },
        {
          label: "Somalia",
          id: "SO"
        },
        {
          label: "South Africa",
          id: "ZA"
        },
        {
          label: "South Georgia and the South Sandwich Islands",
          id: "GS"
        },
        {
          label: "South Sudan",
          id: "SS"
        },
        {
          label: "Spain",
          id: "ES"
        },
        {
          label: "Sri Lanka",
          id: "LK"
        },
        {
          label: "Sudan (the)",
          id: "SD"
        },
        {
          label: "Suriname",
          id: "SR"
        },
        {
          label: "Svalbard and Jan Mayen",
          id: "SJ"
        },
        {
          label: "Sweden",
          id: "SE"
        },
        {
          label: "Switzerland",
          id: "CH"
        },
        {
          label: "Syrian Arab Republic (the)",
          id: "SY"
        },
        {
          label: "Taiwan (Province of China)",
          id: "TW"
        },
        {
          label: "Tajikistan",
          id: "TJ"
        },
        {
          label: "Tanzania, the United Republic of",
          id: "TZ"
        },
        {
          label: "Thailand",
          id: "TH"
        },
        {
          label: "Timor-Leste",
          id: "TL"
        },
        {
          label: "Togo",
          id: "TG"
        },
        {
          label: "Tokelau",
          id: "TK"
        },
        {
          label: "Tonga",
          id: "TO"
        },
        {
          label: "Trinidad and Tobago",
          id: "TT"
        },
        {
          label: "Tunisia",
          id: "TN"
        },
        {
          label: "Turkmenistan",
          id: "TM"
        },
        {
          label: "Turks and Caicos Islands (the)",
          id: "TC"
        },
        {
          label: "Tuvalu",
          id: "TV"
        },
        {
          label: "Türkiye",
          id: "TR"
        },
        {
          label: "Uganda",
          id: "UG"
        },
        {
          label: "Ukraine",
          id: "UA"
        },
        {
          label: "United Arab Emirates (the)",
          id: "AE"
        },
        {
          label: "United Kingdom of Great Britain and Northern Ireland (the)",
          id: "GB"
        },
        {
          label: "United States Minor Outlying Islands (the)",
          id: "UM"
        },
        {
          label: "United States of America (the)",
          id: "US"
        },
        {
          label: "Uruguay",
          id: "UY"
        },
        {
          label: "Uzbekistan",
          id: "UZ"
        },
        {
          label: "Vanuatu",
          id: "VU"
        },
        {
          label: "Venezuela (Bolivarian Republic of)",
          id: "VE"
        },
        {
          label: "Viet Nam",
          id: "VN"
        },
        {
          label: "Virgin Islands (British)",
          id: "VG"
        },
        {
          label: "Virgin Islands (U.S.)",
          id: "VI"
        },
        {
          label: "Wallis and Futuna",
          id: "WF"
        },
        {
          label: "Western Sahara*",
          id: "EH"
        },
        {
          label: "Yemen",
          id: "YE"
        },
        {
          label: "Zambia",
          id: "ZM"
        },
        {
          label: "Zimbabwe",
          id: "ZW"
        }
      ];
      return countries;
    }
  }
};
