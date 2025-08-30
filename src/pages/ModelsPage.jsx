import { useParams, useNavigate } from "react-router-dom"; // ⬅️ add useNavigate
import { useQuery, gql } from "@apollo/client";
import { useState, useMemo } from "react";
import unsplash_ from "../assets/unsplash_.png";
const GET_MODELS_BY_BRAND = gql`
  query ($brandId: ID!) {
    findUniqueBrand(id: $brandId) {
      id
      name
      image
      models {
        id
        image
        name
        type
        price
      }
    }
  }
`;

export default function ModelsPage() {
  const { brandId } = useParams();
  const navigate = useNavigate(); // ⬅️ hook to go to page3
  const { loading, error, data } = useQuery(GET_MODELS_BY_BRAND, {
    variables: { brandId },
  });

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const models = data?.findUniqueBrand?.models || [];

  const brandName = data?.findUniqueBrand?.name || "";
  const brandImage = data?.findUniqueBrand?.image || unsplash_; // fallback if no image

  const filteredModels = useMemo(() => {
    return models.filter((m) => {
      const matchesSearch = m.name.toLowerCase().includes(search.toLowerCase());
      const matchesType = typeFilter ? m.type === typeFilter : true;
      return matchesSearch && matchesType;
    });
  }, [models, search, typeFilter]);

  const totalPages = Math.ceil(filteredModels.length / pageSize);
  const paginatedModels = filteredModels.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  if (loading) return <p>Loading models...</p>;
  if (error) return <p>Error loading models.</p>;
  if (!data?.findUniqueBrand) return <p>No brand found.</p>;

  return (
    <div className="flex flex-col items-center px-4 py-10">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl mb-16">
        {/* Left Side Text */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center text-center p-10 md:p-16">
          {" "}
          <h1 className="text-4xl font-bold leading-snug">
            {" "}
            Play like a <span className="text-orange-500">Rock star</span>{" "}
          </h1>{" "}
          <p className="text-gray-600 mt-4">
            {" "}
            With a legacy dating back to the 1950s, Ibanez blends expert
            craftsmanship with cutting-edge innovation to deliver guitars that
            inspire creativity and elevate your performance. Trusted by top
            artists worldwide, Ibanez guitars are built to play fast, sound
            bold, and stand out on any stage.
            <br /> Ask ChatGPT{" "}
          </p>{" "}
        </div>

        {/* Right Side Photo */}
        <div className="w-full md:w-1/2 relative">
          <img
            src={unsplash_}
            alt="Background"
            className="rounded-2xl w-full object-cover"
          />

          {/* Brand image overlay (centered on top of background) */}
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src={brandImage}
              alt={brandName}
              className="max-w-[50%] rounded-lg "
            />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white text-2xl font-bold bg-black bg-opacity-50 px-4 py-2 rounded">
              {brandName}
            </span>
          </div>
        </div>
      </div>

      <div className="text-center mb-8 ">
        <h2 className="text-2xl font-bold">
          Check out the <span className="text-orange-500">Selection</span>
        </h2>

        <select
          value={typeFilter}
          onChange={(e) => {
            setTypeFilter(e.target.value);
            setPage(1);
          }}
          className="border border-gray-200 rounded-md px-8 py-2 m-6 focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          <option value="">All Types</option>
          <option value="ELECTRIC">Electric</option>
          <option value="ACOUSTIC">Acoustic</option>
          <option value="BASS">Bass</option>
        </select>
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="border border-gray-200 rounded-md px-6 py-2 p-8 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        {paginatedModels.length === 0 ? (
          <p>No models found.</p>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {paginatedModels.map((model) => (
              <li
                key={model.id}
                className="rounded-xl p-4 hover:shadow-lg transition cursor-pointer"
              >
                <button
                  onClick={() => navigate(`/guitar/${brandId}/${model.id}`)}
                  className="flex flex-col items-start text-left w-full bg-white"
                >
                  <img
                    src={model.image}
                    alt={model.name}
                    className="w-full h-48 object-contain mb-4 "
                  />
                  <b className="text-lg">{model.name}</b>

                  <span className="text-gray-400 font-semibold ">
                    ${model.price}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-5 flex items-center space-x-4">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
        >
          {"<"}
        </button>

        <span className="px-4 py-1 border-2 border-orange-500 rounded font-bold">
          {page}
        </span>

        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages || totalPages === 0}
          className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
        >
          {">"}
        </button>
      </div>
    </div>
  );
}
