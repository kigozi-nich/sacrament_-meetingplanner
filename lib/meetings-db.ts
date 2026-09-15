import type { SacramentMeeting } from "./types";

const meetings: SacramentMeeting[] = [
  {
    id: 1,
    date: "2026-09-13",
    meetingType: "regular",
    presiding: "Bishop Daniel Smith",
    conducting: "Brother Marcus Jones",
    announcements: ["Ward temple night is scheduled for September 25.", "Youth activity begins at 6:30 p.m. on Wednesday."],
    openingHymn: { number: 2, title: "The Spirit of God" },
    openingPrayer: "Sister Elena Williams",
    wardBusiness: [{ description: "Sustaining of the new Primary presidency" }],
    stakeBusiness: false,
    sacramentHymn: { number: 169, title: "In Remembrance of Thy Suffering" },
    speakers: [
      { name: "Sister Ana Brown", topic: "Faith in Jesus Christ", type: "speaker" },
      { name: "Cedar Ridge Young Women", topic: "Come Unto Christ", type: "musical-number" },
      { name: "Brother Nathan Lee", topic: "Covenant belonging", type: "speaker" },
    ],
    closingHymn: { number: 31, title: "O God, Our Help in Ages Past" },
    closingPrayer: "Brother David Davis",
  },
  {
    id: 2,
    date: "2026-09-06",
    meetingType: "testimony",
    presiding: "Bishop Daniel Smith",
    conducting: "Sister Maya Green",
    announcements: ["Please welcome new families to the ward."],
    openingHymn: { number: 89, title: "The Lord Is My Light" },
    openingPrayer: "Brother Caleb White",
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: { number: 193, title: "I Stand All Amazed" },
    speakers: [],
    closingHymn: { number: 100, title: "Nearer, My God, to Thee" },
    closingPrayer: "Sister Olivia Carter",
  },
  {
    id: 3,
    date: "2026-08-30",
    meetingType: "regular",
    presiding: "Bishop Daniel Smith",
    conducting: "Brother Marcus Jones",
    openingHymn: { number: 85, title: "How Firm a Foundation" },
    openingPrayer: "Sister Elena Williams",
    wardBusiness: [{ description: "Ward conference preparation" }],
    stakeBusiness: true,
    sacramentHymn: { number: 181, title: "Jesus of Nazareth, Savior and King" },
    speakers: [
      { name: "Brother Samuel Ortiz", topic: "Ministering with patience", type: "speaker" },
      { name: "Sister Grace Kim", topic: "A house of prayer", type: "speaker" },
    ],
    closingHymn: { number: 227, title: "There Is Sunshine in My Soul Today" },
    closingPrayer: "Brother Caleb White",
  },
  {
    id: 4,
    date: "2026-08-23",
    meetingType: "stake",
    presiding: "President Aaron Cole",
    conducting: "President Naomi Reed",
    announcements: ["Stake conference sessions will be held next month."],
    openingHymn: { number: 220, title: "Lord, I Would Follow Thee" },
    openingPrayer: "Sister Rachel Moore",
    wardBusiness: [],
    stakeBusiness: true,
    sacramentHymn: { number: 185, title: "Reverently and Meekly Now" },
    speakers: [
      { name: "Elder Thomas Hale", topic: "The work of salvation", type: "speaker" },
      { name: "Cedar Ridge Choir", topic: "Lead, Kindly Light", type: "musical-number" },
    ],
    closingHymn: { number: 270, title: "I'll Go Where You Want Me to Go" },
    closingPrayer: "President Naomi Reed",
  },
  {
    id: 5,
    date: "2026-08-16",
    meetingType: "general",
    presiding: "President Aaron Cole",
    conducting: "Brother Marcus Jones",
    openingHymn: { number: 219, title: "Because I Have Been Given Much" },
    openingPrayer: "Brother David Davis",
    wardBusiness: [],
    stakeBusiness: true,
    sacramentHymn: { number: 116, title: "Come, Follow Me" },
    speakers: [
      { name: "Sister Miriam Grant", topic: "Gathering Israel", type: "speaker" },
      { name: "Brother Isaac Bell", topic: "Hope through Christ", type: "speaker" },
    ],
    closingHymn: { number: 227, title: "There Is Sunshine in My Soul Today" },
    closingPrayer: "Sister Rachel Moore",
  },
];

export function getMeetings(date?: string | null): SacramentMeeting[] {
  if (date) {
    return meetings.filter((meeting) => meeting.date === date);
  }

  return meetings;
}

export function getMeetingById(id: number): SacramentMeeting | null {
  return meetings.find((meeting) => meeting.id === id) ?? null;
}

export function getMostRecentMeeting(): SacramentMeeting {
  return [...meetings].sort((a, b) => b.date.localeCompare(a.date))[0];
}