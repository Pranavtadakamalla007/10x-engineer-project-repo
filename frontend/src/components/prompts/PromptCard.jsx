function PromptCard({ prompt, onDelete, onEdit }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
      <h3>{prompt.title}</h3>
      <p>{prompt.content}</p>

      <small>ID: {prompt.id}</small>

      <br />

      <button
        onClick={() => {
          console.log("EDIT CLICKED:", prompt.id);
          if (onEdit) {
            onEdit(prompt);
          } else {
            console.log("onEdit is undefined");
          }
        }}
      >
        Edit
      </button>

      <button
        onClick={() => {
          console.log("DELETE CLICKED:", prompt.id);
          if (onDelete) {
            onDelete(prompt.id);
          } else {
            console.log("onDelete is undefined");
          }
        }}
      >
        Delete
      </button>
    </div>
  );
}

export default PromptCard;