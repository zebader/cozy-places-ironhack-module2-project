let buttons = document.querySelectorAll(".button-delete");

buttons.forEach((btn) => {
  btn.addEventListener('click', (e) => {
  e.preventDefault();
  console.log('--------------------', btn.dataset);
  
  const placeId =  btn.dataset.placeid;
  axios.post(`http://localhost:3000/apitest/delete/${placeId}`,{})
  .then((res) => console.log(res));
  })
})