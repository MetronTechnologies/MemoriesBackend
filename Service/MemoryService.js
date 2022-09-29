import TheMemory from "../Model/TheMemory.js";

function FindTheMemory() {
  return TheMemory.find();
}

function FindTheMemoryById(id) {
  return TheMemory.findById(id);
}

function FindTheMemoryByIdAndUpdate1(id, updatedPost) {
  return TheMemory.findByIdAndUpdate(id, updatedPost);
}



function FindTheMemoryByIdAndRemove(id) {
  return (
    TheMemory.findByIdAndRemove(id)
  );
}

function Save(what) {
  return what.save();
}

export {
  FindTheMemory,
  FindTheMemoryById,
  FindTheMemoryByIdAndUpdate1,
  FindTheMemoryByIdAndRemove,
  Save,
};
