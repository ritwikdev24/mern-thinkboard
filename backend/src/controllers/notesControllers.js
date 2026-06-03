import Note from "../models/Note.js";

export  const getAllNotes = async (_,res) => {
    try {
        const notes = await Note.find().sort({createAt:-1}); // newest first
        res.status(200).json(notes);
    } catch (error) {
        console.log("error in getAllNotes controllers:", error);
        res.status(500).json({message: "Internal server error"});
    }
}

export  const getNoteById = async (req,res) => {
    try {
        const note = await Note.findById(req.params.id);
        if(!note) return res.status(404).json({message:"Not not found"});
        res.json(note)
    } catch (error) {
        console.log("error in getNoteById controllers:", error);
        res.status(500).json({message: "Internal server error"});
    }
}

export const createANotes = async (req, res) => {
    try {
        const { title, content } = req.body;

        const note = new Note({
            title,
            content
        });

        const savedNote = await note.save();

        res.status(201).json({
            message: "Note created successfully"
        });

    } catch (error) {
        console.log("Error in createANotes controller:", error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
}

export const updateANotes = async (req, res) => {
    try {
        const { title, content } = req.body;

        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            { title, content },
            { new: true }
        );

        if (!updatedNote) {
            return res.status(404).json({
                message: "Note not found"
            });
        }

        res.status(200).json(updatedNote);

    } catch (error) {
        console.log("Error in updateANotes controller:", error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
};

export const deleteANotes = async (req,res) => {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if(!deletedNote) return res.status(404).json({message: "Note ot found"})
            res.status(200).json({message: "note deleted successfully!"})
    } catch (error) {
        console.log("Error in deleteANotes controller:", error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
}
