"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { RiDeleteBin7Line, RiEditLine } from "react-icons/ri";
import { toast } from "sonner";

const ShowBlogs = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://my-portfolio-backend-kappa.vercel.app/posts"
      );
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`https://my-portfolio-backend-kappa.vercel.app/posts/${id}`, {
        method: "DELETE",
      });
      toast.warning("Data Successfully deleted!");
      setPosts(posts.filter((post) => post.id !== id));
      fetchData();
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleEdit = (id) => {
    // Implement the edit functionality as per your requirements
    console.log("Edit post with id:", id);
  };

  return (
    <section className="">
      <div className="container mx-auto mt-8">
        <h2 className="text-2xl font-bold mb-4">Show Data</h2>
        <div className="min-w-full bg-white h-[700px] overflow-y-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Image</th>
                <th className="py-2 px-4 border-b">Title</th>
                <th className="py-2 px-4 border-b">Subtitle</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post._id}>
                  <td className="py-2 px-4 border-b">
                    <Image
                      src={post.image}
                      alt="Blog-Image"
                      width={60}
                      height={60}
                      className="object-cover"
                    />
                  </td>
                  <td className="py-2 px-4 border-b">{post.title}</td>
                  <td className="py-2 px-4 border-b">{post.subtitle}</td>
                  <td className="py-2 px-4 border-b">
                    <div className="flex items-center gap-x-5">
                      <button
                        onClick={() => handleEdit(post._id)}
                        className="text-blue-600 hover:text-blue-500"
                      >
                        <RiEditLine className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(post._id)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <RiDeleteBin7Line className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ShowBlogs;
