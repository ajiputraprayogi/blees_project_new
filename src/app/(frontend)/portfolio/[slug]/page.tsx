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
  slug: string;
}

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [jsonData, setJsonData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const fetchProject = async () => {
      try {
        const res = await fetch(`/api/portofolio/${slug}`);
        const data = await res.json();
        setJsonData(data); // simpan JSON mentah
        if (res.ok) {
          setProject(data);
        }
      } catch (err) {
        console.error("Error fetch detail:", err);
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
        <h1 className="text-3xl md:text-5xl font-bold mb-6 text-yellow-300">
          {project.title}
        </h1>

        <div className="relative w-full h-[400px] md:h-[600px] mb-8 rounded-xl overflow-hidden">
          <Image src={project.img} alt={project.title} fill className="object-cover" />
        </div>

        <p className="text-lg text-gray-300 leading-relaxed mb-8">
          {project.desc}
        </p>

        {/* Debug JSON */}
        <div className="bg-gray-900 p-4 rounded-lg">
          <h2 className="text-yellow-400 font-bold mb-2">Raw JSON</h2>
          <pre className="text-xs text-gray-300 whitespace-pre-wrap">
            {JSON.stringify(jsonData, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}
