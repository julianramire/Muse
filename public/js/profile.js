var makeid = function (length) {
  var result           = '';
  var characters       = '0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const newFormHandler = async (event) => {
  event.preventDefault();

  const id = makeid(6);
  const response = await fetch('/api/ai', {
    method: 'POST',
    body: JSON.stringify({title: "untitled", content: "", id: id}),
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (response.ok) {
    document.location.replace(`/editor/${id}`)
  } else {
    alert("Failed to create project")
  };
  
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/ai/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete project');
    }
  }
};

document
  .querySelector('.new-project-form')
  .addEventListener('submit', newFormHandler);


  if (document.querySelector('.project-list')) {
      document
      .querySelector('.project-list')
      .addEventListener('click', delButtonHandler);
    };

