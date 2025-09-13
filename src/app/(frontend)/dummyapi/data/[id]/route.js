import { NextResponse } from "next/server";

const projects = [
    {
      id: 1,
      title: "Villa Atlas",
      desc: "Villa mewah dengan arsitektur modern dan detail artistik, menghadirkan suasana elegan sekaligus nyaman.",
      img: "/images/portfolio/pt1.webp",
    },
    {
      id: 2,
      title: "Villa Axel",
      desc: "Hunian eksklusif dengan desain kontemporer, dilengkapi pencahayaan alami dan tata ruang yang luas.",
      img: "/images/portfolio/pt2.webp",
    },
    {
      id: 3,
      title: "Villa Kaca",
      desc: "Konsep villa berlapis kaca penuh untuk menikmati panorama alam secara maksimal, cocok untuk liburan keluarga.",
      img: "/images/portfolio/pt2.webp",
    },
    {
      id: 4,
      title: "Sketch Villa Tropis",
      desc: "Sketsa rancangan villa tropis dengan ventilasi alami, nuansa kayu, dan keterhubungan dengan alam sekitar.",
      img: "/images/portfolio/pt3.webp",
    },
    {
      id: 5,
      title: "Sketch Villa Minimalis",
      desc: "Desain awal villa minimalis yang menonjolkan garis bersih, tata ruang efisien, dan konsep terbuka.",
      img: "/images/portfolio/pt4.webp",
    },
    {
      id: 6,
      title: "Sketch Villa Resort",
      desc: "Konsep sketsa villa resort dengan area terbuka luas, kolam renang, dan sentuhan arsitektur modern.",
      img: "/images/portfolio/pt5.webp",
    },
        {
      id: 7,
      title: "Villa Atlas",
      desc: "Villa mewah dengan arsitektur modern dan detail artistik, menghadirkan suasana elegan sekaligus nyaman.",
      img: "/images/portfolio/pt6.webp",
    },
    {
      id: 8,
      title: "Villa Axel",
      desc: "Hunian eksklusif dengan desain kontemporer, dilengkapi pencahayaan alami dan tata ruang yang luas.",
      img: "/images/portfolio/pt1.webp",
    },
    {
      id: 9,
      title: "Villa Kaca",
      desc: "Konsep villa berlapis kaca penuh untuk menikmati panorama alam secara maksimal, cocok untuk liburan keluarga.",
      img: "/images/portfolio/pt2.webp",
    },
    {
      id: 10,
      title: "Sketch Villa Tropis",
      desc: "Sketsa rancangan villa tropis dengan ventilasi alami, nuansa kayu, dan keterhubungan dengan alam sekitar.",
      img: "/images/portfolio/pt3.webp",
    },
    {
      id: 11,
      title: "Sketch Villa Minimalis",
      desc: "Desain awal villa minimalis yang menonjolkan garis bersih, tata ruang efisien, dan konsep terbuka.",
      img: "/images/portfolio/pt4.webp",
    },
    {
      id: 12,
      title: "Sketch Villa Resort",
      desc: "Konsep sketsa villa resort dengan area terbuka luas, kolam renang, dan sentuhan arsitektur modern.",
      img: "/images/portfolio/pt5.webp",
    },
  ];

export async function GET(req, context) {
  const { id } = context.params; // ambil param dari route
  const project = projects.find((p) => p.id === Number(id));

  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  return NextResponse.json(project);
}