window.addEventListener('DOMContentLoaded', (event) => {
  // Get the checkbox element 		
  let checkbox = document.querySelector("#theme-toggle")
  
  // Get the body tag	
  let body = document.querySelector("body")
  
  // This event handler listens for the checkbox to be checked or unchecked
  // Then, if the checkbox is checked (event.target.checked == true)
  // Then apply `data-theme="dark"` to the body tag
  // Otherwise, remove the attribute
  if( checkbox ){
    checkbox.addEventListener('change', (event) => {
            
      event.target.checked ? body.removeAttribute('data-theme-version', "dark") : body.setAttribute('data-theme-version', "dark")

    });
  }
});