import { useQuery, gql, from } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import unsplash from "../assets/unsplash.png";
import category from "../assets/category.png";
import group from "../assets/group.png";
import empty from "../assets/empty.png";
import Group5207 from "../assets/Group5207.png";
import Mobile from "../assets/Mobile.png";
import Mobile1 from "../assets/Mobile1.png";
const GET_BRANDS = gql`
  query {
    findAllBrands {
      id
      name
      image
    }
  }
`;

export default function BrandsPage() {
  const { loading, error, data } = useQuery(GET_BRANDS);
  const navigate = useNavigate();

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error)
    return <p className="text-center text-red-500">Error loading brands.</p>;

  return (
    <div className="flex flex-col items-center px-4 py-10">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl mb-16">
        {/* Left Side Text */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center text-center p-10 md:p-16">
          {" "}
          <h1 className="text-4xl font-bold leading-snug">
            {" "}
            Browse top quality <br />{" "}
            <span className="text-orange-500">Guitars</span> online{" "}
          </h1>{" "}
          <p className="text-gray-600 mt-4">
            {" "}
            Explore 50k+ latest collections of branded guitars <br /> online
            with VibeStrings.{" "}
          </p>{" "}
        </div>

        {/* Right Side Photo */}
        <div className="w-full md:w-1/2">
          <img src={unsplash} alt="Guitar and amp" className="rounded-2xl" />
        </div>
      </div>

      {/* Brands Section */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold">
          Featuring the <span className="text-orange-500">Best Brands</span>
        </h2>
        <p className="text-gray-500 mt-1">
          Select your preferred brand and explore our exquisite collection.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-40 pb-40">
        {data.findAllBrands.map((brand) => (
          <div
            key={brand.id}
            onClick={() => navigate(`/models/${brand.id}`)}
            className="cursor-pointer transition-transform transform hover:scale-105 pb-18"
          >
            <img
              src={brand.image}
              alt={brand.name}
              className="w-40 mx-auto grayscale hover:grayscale-0 transition duration-300"
            />
          </div>
        ))}
      </div>

      <div className="w-screen bg-black text-white py-16">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-semibold">
            Why try <span className="text-orange-500">VibeStrings?</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto text-center">
          <div>
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center">
                <span className="text-gray-300 text-2xl">
                  <img src={category}></img>
                </span>
              </div>
            </div>
            <h3 className="font-bold tracking-wide">SMOOTH BROWSING</h3>
            <p className="text-gray-400 mt-2 text-sm">
              Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit.
            </p>
          </div>
          <div>
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center">
                <span className="text-gray-300 text-2xl">
                  <img src={group}></img>
                </span>
              </div>
            </div>
            <h3 className="font-bold tracking-wide">EASY DELIVERY</h3>
            <p className="text-gray-400 mt-2 text-sm">
              Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit.
            </p>
          </div>
          <div>
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center">
                <span className="text-gray-300 text-2xl">
                  <img src={empty}></img>
                </span>
              </div>
            </div>
            <h3 className="font-bold tracking-wide">SWIFT PAYMENTS</h3>
            <p className="text-gray-400 mt-2 text-sm">
              Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl mb-16">
        {/* Left Side Text */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center text-center p-10 md:p-16">
          {" "}
          <h1 className="text-4xl leading-snug">
            {" "}
            Browse and buy your <br />{" "}
            <span className="text-orange-500">favorite guitars</span> with
            VibeStrings.{" "}
          </h1>{" "}
          <div className="flex gap-4 mt-10">
            <img
              src={Mobile}
              alt="Guitar and amp"
              className="rounded-2xl w-1/2"
            />
            <img
              src={Mobile1}
              alt="Guitar and amp"
              className="rounded-2xl w-1/2"
            />
          </div>
        </div>

        <div className="w-full md:w-1/2">
          <img src={Group5207} alt="Guitar and amp" className="rounded-2xl" />
        </div>
      </div>
    </div>
  );
}
