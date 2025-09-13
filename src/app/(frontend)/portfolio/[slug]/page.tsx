/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

interface Project {
  id: number;
  slug: string;
  name: string;
  description: string;
  image: string;
  created_at: string;
}

export default function ProjectSlugPage() {
  const { slug } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const fetchProject = async () => {
      try {
        // URL API kamu, contoh pakai endpoint Next.js atau Supabase API
        const res = await fetch(`/api/portofolio/${slug}`);
        if (!res.ok) throw new Error("Failed to fetch project");

        const data: Project = await res.json();
        setProject(data);
      } catch (err) {
        console.error("Error fetch project:", err);
        setProject(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [slug]);

  if (loading) return <p className="text-center text-gray-400">Loading...</p>;
  if (!project) return <p className="text-center text-red-400">Project not found</p>;

  return (
    <div className="bg-black text-white min-h-screen py-16 px-6 md:px-12 lg:px-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-bold mb-10 text-yellow-300">
          {project.name}
        </h1>

        <div className="relative w-full h-[400px] md:h-[600px] mb-8 mt-5rounded-xl overflow-hidden">
          <Image
            src={project.image || "/images/placeholder.webp"}
            alt={project.name}
            fill
            className="object-cover"
          />
        </div>

        <p className="text-lg text-gray-300 leading-relaxed mb-8">
          {project.description}
        </p>

        <p className="text-sm text-gray-500">Created at: {new Date(project.created_at).toLocaleString()}</p>
      </div>
    </div>
  );
}
