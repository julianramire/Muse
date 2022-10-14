var generateBtn = document.getElementById('generate');


const generateHandler = async (event) => {
    event.preventDefault();

    const range = await quill.getSelection();
    const textSelectedInput = await quill.getText(range.index, range.length);

    console.log(range)
    console.log(textSelectedInput)

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

};


generateBtn.addEventListener('click', generateHandler)