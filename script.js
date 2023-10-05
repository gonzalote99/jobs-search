let button = document.getElementById('search');
button.addEventListener('click', (event) => {
  event.preventDefault();

  let fname = document.getElementById('searchbar').value;

  console.log(fname);


  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '5209d67708msh2b4c4487ee24df4p1a9455jsn60b60f48436e',
		'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
    }
  };

  let url = `https://jsearch.p.rapidapi.com/search?query=${fname}`;
  let x;
  fetch(url, options)
  .then(response => response.json())
  .then(response => {
    console.log(response)
    x = response.data;
    console.log(x);

    for(let i = 0; i < 10; i++) {
      const firstFiveLines = x[i]["job_description"].split('\n').slice(0, 3).join('\n');
      console.log(firstFiveLines);

      let cookiediv;
      cookiediv = document.createElement('div');
      cookiediv.setAttribute('class', 'cookie-card');
      cookiediv.innerHTML = `
      <span class='title'>result ${i+1}</span>
      <div class='wholedivlogo'>
       <div>
       <p class='description' ><b>job title: </b>${x[i]['job_title']}.</p>
       <p class='description' ><b>job state: </b>${x[i]['job_state']}.</p>
       <p class='description' ><b>job publisher: </b>${x[i]['job_publisher']}.</p>
       </div>
       <div>
        <img class='companylogo' src='${x[i]['employer_logo']}'/>
       </div>
       </div>
       <p class='description'><b>job description:</b> ${firstFiveLines}</p>
       <p class='description'><b>job employment type:</b> ${x[i]['job_employment_type']}.</p>
       <p class='description'><b>job  country:</b> ${x[i]['job_country']}.</p>
       <p class='description'><b>job  city:</b> ${x[i]['job_city']}.</p>
       <p class='description'><b>company type:</b> ${x[i]['employer_company_type']}.</p>
       <form class='actions' action='${x[i]['job_apply_link']}' target='_blank'>
       
       </form>
          <button class='pref'>
             apply link
          </button>

          <button class='accept'>
             apply now
          </button>

      `;
      document.querySelector('.whole-container').append(cookiediv)
    }


  })
  .catch(err => console.error(err))
})
