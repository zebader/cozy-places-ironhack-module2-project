let buttons = document.querySelectorAll(".delete-button");

buttons.forEach((btn) => {
  btn.addEventListener('click', (e) => {
  e.preventDefault();
  console.log('--------------------', e.target.dataset);
  
  const placeId =  btn.dataset.placeid;
  axios.put(`/apitest/${placeId}/delete)`)
  .then((res) => console.log(res));
  })
})