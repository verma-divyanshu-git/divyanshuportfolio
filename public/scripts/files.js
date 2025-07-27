const fileStructure =
{
  divyanshu:
  {
    contact: '<br><div style="margin-bottom: 10px;"><b><a href="mailto: divyanshuu.12.09@gmail.com"><font style="line-height: 0px">&#128231;</font> divyanshuu.12.09@gmail.com</a></b></div>'
      + '<div style="margin-bottom: 10px;"><font style="line-height: 0px">&#128222;</font> +91 62806 51195</div>'
      + '<div style="margin-bottom: 10px;"><b><a href="https://github.com/verma-divyanshu-git"><img src="github-mark-white.svg" alt="Github:" height="' + document.getElementById("terminal").style.fontSize + '" width="relative"> verma-divyanshu-git </a></b></div>'
      + '<div style="margin-bottom: 10px;"><b><a href="https://www.linkedin.com/in/divyanshu-verma-90b026236"><img src="linkedin.svg" alt="Linkedin:" height="' + document.getElementById("terminal").style.fontSize + '" width="relative"> <strong>linkedin</strong> </a></b></div> <br>',
    education: '<b class="dirColor"><a target="_blank" href="https://goo.gl/maps/uhEDb3tCcfv98qbf9">Punjab Engineering College, Chandigarh</a></b>'
      + '<br>B.Tech in Computer Science and Engineering<br>Graduating 2025<br>CGPA: 8.6/10 <br>'
      + '<b class="dirColor"><a target="_blank" href="https://goo.gl/maps/1perezkmPyWQEP568">DAV Public School, Patiala</a></b>'
      + '<br>XII (91.8 %)<br>Graduated 2021 <br>'
      + '<b class="dirColor"><a target="_blank" href="https://goo.gl/maps/1perezkmPyWQEP568">DAV Public School, Patiala</a></b>'
      + '<br>X (91.82 %)<br>Graduated 2019<br>',

    skills: '- Interpersonal Skills: Fast Learner, Problem Solving, Analytical Thinking, Active Listener, Teamwork, Growth Mindset, Code Analysis and Development, Debugging, System Design <br>'
      + '- Programming Languages: C++, Java, Python, SQL, Bash <br>'
      + '- Mathematics: Linear Algebra, Discrete Structures, Probability and Statistics, Calculus <br>'
      + '- CS subjects: Operating Systems, Computer Networks, DBMS, OOPS, DSA <br>'
      + '- Tools: Git, Linux, Docker, Jenkins, Postman, Kubernetes, Apache Spark, GDB, VS Code, LaTeX <br>'
      + '- Libraries/Frameworks: Spring Boot, Django, Flask, React.js, Node.js, JobRunr, TensorFlow, SQLAlchemy, Micrometer, Prometheus, Grafana, C++ STL <br>',

    projects:
    {
      loading: "Loading projects from GitHub... Please wait.<br><font style='color: #888; font-size: 11px;'>This message will be replaced once the API call completes.</font>"
    },

    achievements: '- JEE Mains: Ranked 8906 (AIR) in JEE Mains, which is given by a pool of 1M+ candidates across the country.<br>' +
      '- BITSAT: Scored 318 in BITSAT 2021.<br>' +
      '- JEE Adv: Qualified JEE Advanced, one of the most prestigious and toughest exams in the country.< br >' +
      '- Flipkart Grid 6.0: Semi - Finalist with a National Rank< 20 among ~500,000 participants.< br >' +
      '- Codeforces: Reached Expert(Max Rating: 1702), ranked globally 281(Div - 2), 959(Div - 2), and 606(Div - 3) in Rounds 795, 794, and 786 respectively.<br>' +
      '- Leetcode: Max Rating 1990(Knight), with top global ranks of 185(Biweekly 129) and 516(Biweekly 131).< br >' +
      '- STGI Hackathon: Winner in both 2022 and 2023 editions with NLP and Django - based projects.< br >' +
      '- Amazon ML Summer School 2023: Selected from a pool of ~46,000 applicants.< br >',

    certifications: '<a href="https://graduation.udacity.com/confirm/WHGUKMTS">AWS Machine Learning Foundations: Udacity</a><br>'
      + '<a href="https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/Goldman%20Sachs/NPdeQ43o8P9HJmJzg_Goldman%20Sachs_yLFupGR3PppGnQiPk_1660256281637_completion_certificate.pdf">Virtual Experience Program Participant: Goldman Sachs</a><br>'
      + '<a href="https://googlecloud.qwiklabs.com/public_profiles/a5d24d38-4244-4b50-9aa9-31ab7763ea2e">30 Days of Google Cloud: Hands on practice on Google Cloud Platform</a><br>'
      + '<a href="https://www.coursera.org/account/accomplishments/certificate/Q85AWHNFCGPT">Stock Valuation with Comparable Companies Analysis: Coursera</a><br>',


    por: 'PEC-ACM CSS Student Chapter : Member <br>'
      + 'Asset Management Club (AMC-PEC) : Event Manager <br>'
      + 'SAASC (Speaker’s Association and Study Circle) : Member <br>'
      + 'Entrepreneurship and Incubation Cell (EIC) : IB Member <br>'
      + 'Les Amis : Permanent Member <br>'
      + 'Google Developer Student Clubs (GDSC): Member <br>',



    references: '<br><b>Professional References:</b><br>'
      + '<a href="https://pec.ac.in/cse/faculty/sanjeev-sofat"><b>Dr. Sanjeev Sofat</b></a><br>'
      + 'Professor(CSE) and Deputy Director, PEC University of Technology, Chandigarh<br>'
      + '<a href="mailto:sanjeevsofat@pec.edu.in"><i class="fa fa-envelope"></i> sanjeevsofat@pec.edu.in</a><br>'

  },
  test:
  {
    test1:
    {
      test2: 'test!!',
      test3: 'testlolol'
    },
    test4:
    {
      test5:
      {
        test6:
        {
          test7:
          {
            test8: 'lol'
          }
        }
      }
    }
  }
};

// Configuration for GitHub integration
const GITHUB_USERNAME = 'verma-divyanshu-git';

var request = new XMLHttpRequest();

request.open('GET', `https://api.github.com/users/${GITHUB_USERNAME}/repos`, true);

request.onload = function () {
  if (request.status >= 200 && request.status < 300) {
    try {
      var data = JSON.parse(this.response);
      
      // Clear the loading message
      fileStructure["divyanshu"]["projects"] = {};
      
      // Filter public repositories and sort by last updated (most recent first)
      var publicRepos = data.filter(function(e) {
        return e.private === false;
      }).sort(function(a, b) {
        // Sort by last updated (most recent first)
        return new Date(b.updated_at) - new Date(a.updated_at);
      });
      
      if (publicRepos.length === 0) {
        // Fallback if no public repositories found
        fileStructure["divyanshu"]["projects"]["no_public_repos"] = "No public repositories found. Please check back later!";
      } else {
        publicRepos.forEach(function (e) {
          let description = "<a target='_blank' href='" + e.html_url + "'><font style='line-height: 0px'>🔗</font><b>" + e.name + "</b></a><br>";
          
          // Add repository description
          if (e.description !== null && e.description.trim() !== "") {
            description += e.description + "<br>";
          } else {
            description += "Click the link to learn more about this project!<br>";
          }
          
          // Add additional metadata
          let metadata = [];
          if (e.language) {
            metadata.push("Language: " + e.language);
          }
          if (e.stargazers_count > 0) {
            metadata.push("⭐ " + e.stargazers_count);
          }
          if (e.forks_count > 0) {
            metadata.push("🍴 " + e.forks_count);
          }
          
          if (metadata.length > 0) {
            description += "<font style='color: #888; font-size: 11px;'>" + metadata.join(" | ") + "</font>";
          }
          
          fileStructure["divyanshu"]["projects"][`${e.name}`] = description;
        });
      }
    } catch (error) {
      console.error('Error parsing GitHub API response:', error);
      fileStructure["divyanshu"]["projects"] = {};
      fileStructure["divyanshu"]["projects"]["api_error"] = "Error loading projects from GitHub. Please check back later!";
    }
  } else {
    console.error('GitHub API request failed with status:', request.status);
    fileStructure["divyanshu"]["projects"] = {};
    fileStructure["divyanshu"]["projects"]["api_error"] = "Unable to load projects from GitHub (API Error: " + request.status + "). Please check back later!";
  }
  finishedAPICall();
};

request.onerror = function() {
  console.error('GitHub API request failed due to network error');
  fileStructure["divyanshu"]["projects"] = {};
  fileStructure["divyanshu"]["projects"]["network_error"] = "Network error while loading projects from GitHub. Please check your connection!";
  finishedAPICall();
};

request.send();
const whoisdivyanshu = `<br><font style="word-break: normal;">As a Computer Science undergraduate at Punjab Engineering College, I am passionate about systems, backend engineering, and problem solving. I enjoy hands-on experimentation, and have consistently applied my skills through two impactful internships at Cisco (SDE) and iRage Capital (Quant/HFT). A strong performer in competitive programming with top global ranks, I thrive both in independent projects and collaborative, fast-paced environments.</font>`;

function download() {
  let test = document?.getElementById("pdf");
  console.log("print");
}
