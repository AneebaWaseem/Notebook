import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { reset, update, remove } from "../redux/appSlice";
import { Edit3, Trash2, Copy } from "lucide-react";
import toast from "react-hot-toast";

const MyNotes = () => {
  const [searchTitle, setSearchTitle] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editNoteData, setEditNoteData] = useState(null);

  const notes = useSelector((state) => state.app.notes);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Format dates once, memoized
  const formattedNotes = useMemo(() => {
    return notes.map((note) => {
      const dateObj = new Date(note.date);
      return {
        ...note,
        formattedDate: dateObj.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
        formattedTime: dateObj.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        }),
      };
    });
  }, [notes]);

  // Filter notes based on search input
  const filteredNotes = useMemo(() => {
    return formattedNotes.filter((note) =>
      note.title.toLowerCase().includes(searchTitle.toLowerCase())
    );
  }, [searchTitle, formattedNotes]);

  // Open modal and load note data into form
  const openEditModal = (note) => {
    setEditNoteData(note);
    setEditModalOpen(true);
  };

  // Handle form input changes in modal
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditNoteData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit edited note
  const handleEditSubmit = (e) => {
    e.preventDefault();
    dispatch(update(editNoteData)); // dispatch updated note
    setEditModalOpen(false); // close modal
  };

  const handleDelete = (e, note) => {
    e.preventDefault();
    dispatch(remove(note));
  };

  const handleCopy = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("Copied to clipboard");
        toast.success("Copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy:", err);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="flex flex-col w-[90vw] md:w-[70vw]">
        <div className="flex flex-row my-3 justify-between ml-auto">
          <button
            style={{ borderRadius: "1rem" }}
            onClick={() => dispatch(reset())}
            className="py-3 px-4 bg-[#7d060a] text-white hover:bg-[#5e0205] transition-all duration-300 mx-3"
          >
            Delete All
          </button>
          <button
            style={{ borderRadius: "1rem" }}
            onClick={() => navigate("/add")}
            className="py-3 px-4 bg-[#064a01] text-white hover:bg-[#043000] transition-all duration-300"
          >
            Add a Note
          </button>
        </div>

        <input
          style={{ backgroundColor: "#1c1b1b" }}
          placeholder="Search"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
          className="w-[90vw] md:w-[70vw] rounded-xl py-3 px-4 text-[#8a9db8] outline-none border-1 border-[#85888bff]"
        />
      </div>

      <div className="mt-4 cursor-pointer px-2 border border-[#85888bff] rounded-xl">
        {filteredNotes.length === 0 ? (
          <p className="text-white text-center">No matching notes found.</p>
        ) : (
          <>
            <p className="text-white text-center text-xl font-semibold my-2">All Notes</p>
            {filteredNotes.map((note) => (
              <div
                key={note.id}
                className="bg-[#1c1b1b] text-white w-[90vw] md:w-[70vw] rounded-xl shadow-md cursor-pointer border border-[#85888bff] rounded-xl mb-3"
              >
                <div className="flex border-b border-[#85888bff] py-2 px-4">
                  <h2 className="text-base font-semibold">{note.title}</h2>
                  <div className="flex flex-row gap-2 ml-auto items-center">
                    <Edit3
                      className="h-7 w-7 text-blue-500 hover:text-blue-700 cursor-pointer p-1 border border-[#85888bff] rounded-sm"
                      onClick={() => openEditModal(note)}
                    />
                    <Trash2
                      className="h-7 w-7 text-red-500 hover:text-red-700 cursor-pointer p-1 border border-[#85888bff] rounded-sm"
                      onClick={(e) => handleDelete(e, note)}
                    />
                    <Copy
                      className="h-7 w-7 text-green-500 hover:text-green-700 cursor-pointer p-1 border border-[#85888bff] rounded-sm"
                      onClick={() => handleCopy(note.content)}
                    />
                  </div>
                </div>
                <div className="flex flex-row justify-between py-2 px-3">
                  <p className="w-[60vw]  whitespace-pre-line">{note.content}</p>
                  <div className="flex flex-col items-end text-sm">
                    <span>{note.formattedDate}</span>
                    <span>{note.formattedTime}</span>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      {/* Edit Modal */}
      {editModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 gap-4">
          <div className=" bg-[#1c1b1b] rounded-lg shadow-lg w-11/12 max-w-md p-6 relative text-[#616161]">
            <button
              onClick={() => setEditModalOpen(false)}
              className="absolute top-2 right-2 text-[#616161] hover:text-white text-2xl font-bold"
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold mb-4 text-white">
              Edit Memory
            </h2>
            <form
              onSubmit={handleEditSubmit}
              className="flex flex-col gap-4 space-y-4"
            >
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={editNoteData.title}
                onChange={handleChange}
                className="bg-[#1c1b1b] border border-[#616161] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#064a01]"
                required
              />
              <textarea
                name="content"
                placeholder="Content"
                value={editNoteData.content}
                onChange={handleChange}
                rows={10}
                className="bg-[#1c1b1b] border border-[#616161] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#064a01]"
                required
              />
              <button
                type="submit"
                className="bg-[#086101] py-2 rounded hover:bg-[#043000] transition text-white"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyNotes;
