function DeleteCommentButton({ onDelete, isDeleting }) {
  return (
    <button className="delete-button" onClick={onDelete} disabled={isDeleting}>
      {isDeleting ? "Deleting..." : "🗑️ Delete"}
    </button>
  );
}

export default DeleteCommentButton;