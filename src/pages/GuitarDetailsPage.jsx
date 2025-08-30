import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

const GET_MODEL = gql`
  query GetModel($brandId: ID!, $modelId: ID!) {
    findUniqueModel(brandId: $brandId, modelId: $modelId) {
      id
      name
      type
      image
      description
      price
      specs {
        bodyWood
        neckWood
        fingerboardWood
        pickups
        tuners
        scaleLength
        bridge
      }
      musicians {
        name
        musicianImage
        bands
      }
    }
  }
`;

export default function GuitarDetailsPage() {
  const { brandId, modelId } = useParams();
  const { loading, error, data } = useQuery(GET_MODEL, {
    variables: { brandId, modelId },
  });

  const [activeTab, setActiveTab] = useState("specs");
  const [visibleCount, setVisibleCount] = useState(2);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading guitar</p>;
  if (!data?.findUniqueModel) return <p>No guitar found</p>;

  const model = data.findUniqueModel;
  const musicians = model.musicians || [];

  return (
    <div style={{ padding: "20px" }}>
      <h2>{model.name}</h2>
      {model.image && <img src={model.image} alt={model.name} width="300" />}
      <p>{model.description}</p>
      <p>Price: ${model.price}</p>
      <p>Type: {model.type}</p>

      {/* Tabs */}
      <div style={{ marginTop: "20px" }}>
        <button onClick={() => setActiveTab("specs")}>Specs</button>
        <button onClick={() => setActiveTab("musicians")}>Musicians</button>
      </div>

      {/* Specs Tab */}
      {activeTab === "specs" && (
        <div style={{ marginTop: "15px" }}>
          <h3>Specifications</h3>
          <ul>
            <li>Body Wood: {model.specs.bodyWood}</li>
            <li>Neck Wood: {model.specs.neckWood}</li>
            <li>Fingerboard Wood: {model.specs.fingerboardWood}</li>
            <li>Pickups: {model.specs.pickups}</li>
            <li>Tuners: {model.specs.tuners}</li>
            <li>Scale Length: {model.specs.scaleLength}</li>
            <li>Bridge: {model.specs.bridge}</li>
          </ul>
        </div>
      )}

      {/* Musicians Tab */}
      {activeTab === "musicians" && (
        <div style={{ marginTop: "15px" }}>
          <h3>Musicians</h3>
          {musicians.slice(0, visibleCount).map((m, i) => (
            <div key={i} style={{ marginBottom: "10px" }}>
              {m.musicianImage && (
                <img src={m.musicianImage} alt={m.name} width="100" />
              )}
              <p>{m.name}</p>
              {m.bands?.length > 0 && <p>Bands: {m.bands.join(", ")}</p>}
            </div>
          ))}
          {visibleCount < musicians.length && (
            <button onClick={() => setVisibleCount(visibleCount + 2)}>
              Show more
            </button>
          )}
        </div>
      )}
    </div>
  );
}
