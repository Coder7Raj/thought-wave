import axios from "axios";
import { useEffect, useState } from "react";
import { serveruri } from "../App";

export default function ShowAllThoughts() {
  const [thoughts, setThoughts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchThoughts = async () => {
    try {
      const res = await axios.get(`${serveruri}/api/thought/get_thoughts`, {
        withCredentials: true,
      });

      setThoughts(res.data);
      setLoading(false);
    } catch (error) {
      console.log("Fetch error:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchThoughts();
  }, []);

  //
  thoughts?.map((th) => console.log(th?.image));
  return (
    <>
      {loading && <p className="text-center mt-10">Loading thoughts...</p>}
      <div className="space-y-6 p-4">
        {thoughts?.map((thought) => (
          <div key={thought._id} className="flex shadow-md rounded-xl p-4">
            <div>
              {/* Image */}
              {thought.image && (
                <img
                  src={thought.image}
                  alt="thought"
                  className="rounded-lg mb-3 w-full"
                />
              )}
            </div>
            <div>
              {/* Title */}
              <h2 className="text-xl font-bold mb-2">{thought.title}</h2>

              {/* Description */}
              <p className="text-gray-700 mb-3">{thought.description}</p>

              {/* Category + Country */}
              <div className="flex gap-3 text-sm text-gray-500 mb-2">
                <span>📚 {thought.category}</span>
                {thought.country && <span>🌍 {thought.country}</span>}
              </div>

              {/* Stats */}
              <div className="flex justify-between text-sm text-gray-600">
                <span>👍 {thought.likes}</span>
                <span>👀 {thought.views}</span>
                <span>
                  {new Date(thought.createdAt).toLocaleString("en-US", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
