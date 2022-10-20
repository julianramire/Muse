const displayDocument = async () => {

    const dataPath = window.location.pathname;
    const documentData = await fetch(`/api${dataPath}`, {
      method: "GET"
    });
  
    const document = await documentData.json();
    quill.insertText(0, document.content);
  
    return;
  
  };

  displayDocument();