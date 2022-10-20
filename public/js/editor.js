var generateBtn = document.getElementById('generate');
var saveBtn = document.getElementById('save');
var renameBtn = document.getElementById('rename');
var deleteBtn = document.getElementById('delete');
var makePrivateBtn = document.getElementById('make-private');
var makePublicBtn = document.getElementById('make-public');

//Make Private
const makePrivate = async () => {
  console.log('test1')
  const dataPath = window.location.pathname;
  const saveData = await fetch(`/api/${dataPath}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ is_public: "false" })
  });

  if (saveData.ok) {
    console.log("success");
    location.reload();
  } else {
    console.log("nope")
  }
};

//Make public
const makePublic = async () => {
  console.log('test1')
  const dataPath = window.location.pathname;
  const saveData = await fetch(`/api/${dataPath}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ is_public: "true" })
  });

  if (saveData.ok) {
    console.log("success");
    location.reload();
  } else {
    console.log("nope")
  }
};
//Retrieve document from database and insert into Quill. 
const displayDocument = async () => {

  const dataPath = window.location.pathname;
  const documentData = await fetch(`/api${dataPath}`, {
    method: "GET"
  });

  const document = await documentData.json();
  quill.insertText(0, document.content);

  return;

};

//Rename the document title.
const renameDocument = async () => {

  saveDocument();

  const newname = await window.prompt("What would you like to change the title to?")

  const dataPath = window.location.pathname;

  const rename = await fetch(`/api${dataPath}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: newname })
  })

  location.reload();

}

//Save the document into database
const saveDocument = async () => {

  var length = await quill.getLength();
  var documentData = await quill.getText(0, length);

  const dataPath = window.location.pathname;

  const saveData = await fetch(`/api${dataPath}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content: documentData })
  });

  if (saveData.ok) {
    console.log("autosaved")
  } else { console.log("error") }

};

// Autosave progress from Quill every 2 seconds
setInterval(saveDocument, 2000)


// Save button handler with a window alert
const saveBtnHandler = () => {
  saveDocument();
  window.alert("Document saved successfully.");
}

// Delete document from database
const deleteDocument = async () => {
  const prompt = confirm("Are you sure you want to delete this document? This will be permanent.");

  const dataPath = window.location.pathname;

  if (prompt === true) {
    const deleteDoc = await fetch(`/api${dataPath}`, {
      method: "DELETE"
    });

    if (deleteDoc.ok) {
      document.location.replace('/');
    } else { console.log("error") }
  }

};

// Generate based on user selection 
const generateHandler = async (event) => {
  event.preventDefault();

  const range = await quill.getSelection();
  const textSelectedInput = await quill.getText(range.index, range.length);

  // console.log(textSelectedInput)

  if (range !== null) {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ textSelected: textSelectedInput }),
    });

    const data = await response.json();

    var length = await quill.getLength();

    quill.insertText(length, data.checkresult);

  } else {

    console.log('test');
    
  };


};


displayDocument();


generateBtn.addEventListener('click', generateHandler);
saveBtn.addEventListener('click', saveBtnHandler);
renameBtn.addEventListener("click", renameDocument);
deleteBtn.addEventListener("click", deleteDocument);
if(makePrivateBtn){
  makePrivateBtn.addEventListener("click", makePrivate);
}

if(makePublicBtn){
  makePublicBtn.addEventListener('click', makePublic);
}
