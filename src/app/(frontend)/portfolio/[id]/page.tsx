/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

interface Project {
  id: number;
  title: string;
  desc: string;
  img: string;
}

export default function ProjectDetailPage() {
  const { id } = useParams(); // ambil id dari URL
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchProject = async () => {
      try {
        const res = await fetch(`/dummyapi/data/${id}`);
        if (!res.ok) throw new Error("Failed to fetch project");
        const data: Project = await res.json();
        setProject(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) return <p className="text-center text-gray-400">Loading...</p>;
  if (!project) return <p className="text-center text-red-400">Project not found</p>;

  return (
    <div className="bg-black text-white min-h-screen py-16 px-6 md:px-12 lg:px-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-bold mb-6 text-yellow-300">
          {project.title}
        </h1>
        <div className="relative w-full h-[400px] md:h-[600px] mb-8 rounded-xl overflow-hidden">
          <Image
            src={project.img}
            alt={project.title}
            fill
            className="object-cover"
          />
        </div>
        <p className="text-lg text-gray-300 leading-relaxed">{project.desc}</p>
      </div>
    </div>
  );
}
