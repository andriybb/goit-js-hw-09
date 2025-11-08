const formData = { email: "", message: "" };
const form = document.querySelector(".feedback-form");

function saveToLS(key, value) {
  const zip = JSON.stringify(value);
  const item = localStorage.getItem(key);
  localStorage.setItem(item, zip);
};

function loadFromLS(key) {
  const zip = localStorage.getItem(key);

  try {
    const value = JSON.parse(zip);
    return value;
  } catch {
    return zip;
  }
};

window.addEventListener('DOMContentLoaded', () => {
  const data = loadFromLS("feedback-form-state");
  
  if (data) {
    form.elements.email.value = data.email || '';
    form.elements.message.value = data.message || '';
    formData.email = data.email || '';
    formData.message = data.message || '';
  }
});


form.addEventListener('input', e => {
  formData[e.target.name] = e.target.value;
  saveToLS("feedback-form-state", formData);

});

form.addEventListener(`submit`, e =>
{
  e.preventDefault();
 if (formData.email.trim() === "" || formData.message.trim() === "") {
    alert("Fill please all fields");
    return;
  };
 console.log(formData);
  localStorage.removeItem("feedback-form-state");
  formData.email = "";
  formData.message = "";
  form.reset();
});

