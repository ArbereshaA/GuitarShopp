import { useParams, useNavigate } from "react-router-dom"; // ⬅️ add useNavigate
import { useQuery, gql } from "@apollo/client";
import { useState, useMemo } from "react";

const GET_MODELS_BY_BRAND = gql`
  query ($brandId: ID!) {
    findUniqueBrand(id: $brandId) {
      id
      name

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
    <div className="container" style={{ padding: "20px" }}>
      <h1>🎸 {brandName} Models</h1>

      <input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
        style={{ margin: "10px", padding: "5px" }}
      />

      <select
        value={typeFilter}
        onChange={(e) => {
          setTypeFilter(e.target.value);
          setPage(1);
        }}
        style={{ margin: "10px", padding: "5px" }}
      >
        <option value="">All Types</option>
        <option value="ELECTRIC">Electric</option>
        <option value="ACOUSTIC">Acoustic</option>
        <option value="BASS">Bass</option>
      </select>

      {paginatedModels.length === 0 ? (
        <p>No models found.</p>
      ) : (
        <ul>
          {paginatedModels.map((model) => (
            <li key={model.id}>
              <button
                onClick={() => navigate(`/guitar/${brandId}/${model.id}`)}
              >
                <b>{model.name}</b> – {model.type} – 💲{model.price}
                <img src={model.image} alt={model.name} width="300" />
              </button>
            </li>
          ))}
        </ul>
      )}

      <div style={{ marginTop: "20px" }}>
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
        >
          Prev
        </button>
        <span style={{ margin: "0 10px" }}>
          Page {page} of {totalPages || 1}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages || totalPages === 0}
        >
          Next
        </button>
      </div>
    </div>
  );
}
