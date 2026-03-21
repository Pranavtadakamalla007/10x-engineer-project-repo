import { useEffect, useState } from "react";
import api from "../api/client";
import PromptCard from "../components/prompts/PromptCard";
import PromptForm from "../components/prompts/PromptForm";

function Dashboard() {
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPrompt, setSelectedPrompt] = useState(null); // 🔥 NEW

  const fetchPrompts = () => {
    console.log("FETCHING PROMPTS...");

    setLoading(true);
    setError(null);

    api.get("/prompts/")
      .then((res) => {
        console.log("FETCH RESPONSE:", res.data);
        setPrompts(res.data.prompts);
      })
      .catch((err) => {
        console.error("FETCH ERROR:", err);
        setError("Failed to load prompts");
      })
      .finally(() => setLoading(false));
  };

  const handleDelete = (id) => {
    console.log("HANDLE DELETE:", id);

    api.delete(`/prompts/${id}`)
      .then(() => {
        console.log("DELETED:", id);
        fetchPrompts();
      })
      .catch((err) => console.error("DELETE ERROR:", err));
  };

  const handleEdit = (prompt) => {
    console.log("HANDLE EDIT:", prompt);
    setSelectedPrompt(prompt);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchPrompts();
  }, []);

  return (
    <div>
      <h1>PromptLab</h1>

      <PromptForm
        onSuccess={fetchPrompts}
        selectedPrompt={selectedPrompt}
        setSelectedPrompt={setSelectedPrompt}
      />

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {!loading && prompts.length === 0 && (
        <p>No prompts yet 🚀</p>
      )}

      {!loading &&
        prompts.map((p) => (
          <PromptCard
            key={p.id}
            prompt={p}
            onDelete={handleDelete}
            onEdit={handleEdit}   // 🔥 NEW
          />
        ))}
    </div>
  );
}

export default Dashboard;