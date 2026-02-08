import axios from "axios";
import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { serveruri } from "../App";

export default function AddThought() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [descript, setDescript] = useState("");
  const [category, setCategory] = useState("");
  const categories = [
    "Life",
    "Technology",
    "Programming",
    "Career",
    "Motivation",
    "Personal Growth",
    "Education",
    "Health",
    "Travel",
    "Opinions",
  ];
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImage = (e) => {
    const file = e.target.files[0];
    setBackImage(file);
    setFrontImage(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", descript);
      formData.append("category", category);
      if (backImage) {
        formData.append("image", backImage);
      }

      const result = await axios.post(
        `${serveruri}/api/thought/add_thought`,
        formData,
        { withCredentials: true },
      );
      dispatch(setMyShopData(result.data));
      setLoading(false);
      navigate("/");
    } catch (error) {
      console.log("form submit error", error);
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center flex-col items-center p-6 relative min-h-screen">
      <div
        className="absolute top-5 left-5 z-10 mb-2 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <IoIosArrowBack size={35} className="text-[#ff4d2d]" />
      </div>
      <div className="max-w-lg w-full bg-white rounded-2xl p-8">
        <div className="flex flex-col items-center mb-6">
          {/* <div className="bg-orange-100 p-4 rounded-full mb-4">
            <FaUtensils size={25} className="text-[#ff4d2d]" />
          </div> */}
          <div className="text-2xl font-medium text-gray-600">
            Add Your Thought's
          </div>
        </div>
        {/* form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Title:
            </label>
            <input
              type="text"
              placeholder="Enter Thought Title"
              className="bg-white w-full py-2 px-1 border-none outline-none rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
            <hr />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Description:
            </label>
            <textarea
              type="text"
              placeholder="Enter Thought Description"
              className="bg-white w-full py-2 px-1 border-none outline-none rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              onChange={(e) => setDescript(e.target.value)}
              value={descript}
            />
            <hr />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Category:
            </label>
            <select
              className="bg-white text-black w-full py-2 px-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
            >
              <option className="bg-white" value="">
                Select Category
              </option>
              {categories?.map((cat, index) => (
                <option className="bg-white text-black" value={cat} key={index}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Image:
            </label>
            <input
              type="file"
              accept="image/*"
              className="w-full py-2 px-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              onChange={handleImage}
            />
            {frontImage && (
              <div className="mt-2">
                <img
                  src={frontImage}
                  alt=""
                  className="w-full h-48 object-cover rounded-lg border"
                />
              </div>
            )}
          </div>
          <button
            disabled={loading}
            className="w-full bg-[#ff4d2d] text-white px-6 py-3 cursor-pointer rounded-lg font-semibold shadow-md hover:bg-orange-600 hover:shadow-lg transition-all"
          >
            {loading ? "Adding Thought..." : "Add Thought"}
          </button>
        </form>
      </div>
    </div>
  );
}
