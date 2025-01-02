import { Trash2 } from "lucide-react";
import { useNotes } from "@/hooks/use-notes";
import EditorJsRenderer from "@/components/EditorJsRenderer";
import { toast } from "sonner";
import Loader from "@/components/loader";
import { Link } from "react-router-dom";

const Notes = () => {
  const { deleteNote, notes, setNotes, loading } = useNotes();

  // Handle note deletion
  const handleDelete = async (id) => {
    try {
      await deleteNote(id);
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id)); // Update UI after deletion
      toast.success("Note deleted");
    } catch (error) {
      console.error("Error deleting note:", error);
      toast.error("Failed to deleted");
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      {/* Header */}
      <header className="mb-4">
        <ul className="flex gap-4">
          <li>
            <Link
              to="/notes/0?action=new"
              className="text-blue-500 hover:underline"
            >
              Create Note
            </Link>
          </li>

          <li>
            <Link
              className="px-2 py-1 text-blue-500 border border-blue-500 rounded-md hover:text-blue-600"
              href={"/all-categories"}
            >
              view all
            </Link>
          </li>
        </ul>
      </header>

      {/* Main Content */}
      <main className="w-full">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">Notes</h1>
          <p>Total Notes: {notes.length}</p>
        </div>

        {/* Notes Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {!loading &&
            notes.map((note) => (
              <div
                key={note.id}
                className="flex flex-col w-full gap-4 p-4 transition-shadow bg-white rounded shadow hover:shadow-lg"
              >
                {/* Note Title */}
                <Link to={`/notes/${note.id}?action=edit`}>
                  <h2>{note.title}</h2>
                </Link>

                {/* Note Content */}
                <div className="text-sm text-gray-600 mb-4 overflow-hidden max-h-[180px]">
                  {/* <div
                  dangerouslySetInnerHTML={{
                    __html: note.content || "No content available",
                  }}
                /> */}
                  <EditorJsRenderer data={note.content} />
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <Link
                    to={`/notes/${note.id}?action=view`}
                    className="text-sm text-blue-500 hover:underline"
                  >
                    read more
                  </Link>
                  <Trash2
                    className="w-4 h-4 text-red-600 cursor-pointer"
                    onClick={() => handleDelete(note.id)}
                  />
                </div>
              </div>
            ))}

          {loading && <Loader />}
        </div>
      </main>
    </div>
  );
};

export default Notes;
