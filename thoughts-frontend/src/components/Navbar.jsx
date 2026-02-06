import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const countries = [
    "Bangladesh",
    "India",
    "Pakistan",
    "USA",
    "UK",
    "Canada",
    "Australia",
  ];
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const filteredCountries = countries.filter((c) =>
    c.toLowerCase().includes(search.toLowerCase()),
  );

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const user = { email: "das@gmail.com" };

  return (
    <>
      <div className="navbar">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content rounded-box bg-white text-black z-10 mt-3 w-52 p-2 shadow"
            >
              <li className="text-black text-base">
                <Link>Trendings Thoughts</Link>
              </li>

              <li className="text-black text-base">
                <Link>Top Thoughts</Link>
              </li>
              <li className="text-black text-base">
                <Link>Latest Thoughts</Link>
              </li>
              <li ref={dropdownRef} className="text-black text-base">
                <details open={open}>
                  <summary
                    onClick={(e) => {
                      e.preventDefault();
                      setOpen(!open);
                    }}
                  >
                    Country
                  </summary>

                  <ul className="p-2 space-y-2 w-52 bg-white z-10">
                    {/* Search input */}
                    <input
                      type="text"
                      placeholder="Search country..."
                      className="input input-bordered w-full bg-white text-black border-none outline-none"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />

                    {/* Result list */}
                    <ul className="max-h-48 overflow-y-auto">
                      {filteredCountries.map((country, index) => (
                        <li key={index}>
                          <Link onClick={() => setOpen(false)}>{country}</Link>
                        </li>
                      ))}
                    </ul>
                  </ul>
                </details>
              </li>
            </ul>
          </div>
          <Link to={"/"}>Thoughts Wave</Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li className="text-black text-base">
              <Link>Trendings Thoughts</Link>
            </li>

            <li className="text-black text-base">
              <Link>Top Thoughts</Link>
            </li>
            <li className="text-black text-base">
              <Link>Latest Thoughts</Link>
            </li>
            <li ref={dropdownRef} className="text-black text-base">
              <details open={open}>
                <summary
                  onClick={(e) => {
                    e.preventDefault();
                    setOpen(!open);
                  }}
                >
                  Country
                </summary>

                <ul className="p-2 space-y-2 w-52 bg-white z-10">
                  {/* Search input */}
                  <input
                    type="text"
                    placeholder="Search country..."
                    className="input input-bordered w-full bg-white text-black border-none outline-none"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />

                  {/* Result list */}
                  <ul className="max-h-48 overflow-y-auto">
                    {filteredCountries.map((country, index) => (
                      <li key={index}>
                        <Link onClick={() => setOpen(false)}>{country}</Link>
                      </li>
                    ))}
                  </ul>
                </ul>
              </details>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          {user?.email ? (
            <div>
              <button className="btn btn-outline">SignOut</button>
            </div>
          ) : (
            <div>
              <button className="btn btn-outline">SignIn</button>
            </div>
          )}
          <div>
            <img src="" alt="" />
          </div>
        </div>
      </div>
    </>
  );
}
