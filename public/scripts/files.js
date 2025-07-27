const fileStructure =
{
  divyanshu:
  {
    contact: '<br><div style="margin-bottom: 10px;"><b><a href="mailto: vrmadiv@gmail.com"><font style="line-height: 0px">&#128231;</font> vrmadiv@gmail.com</a></b></div>'
      + '<div style="margin-bottom: 10px;"><b><a href="mailto: divyanshuu.12.09@gmail.com"><font style="line-height: 0px">&#128231;</font> divyanshuu.12.09@gmail.com</a></b></div>'
      + '<div style="margin-bottom: 10px;"><font style="line-height: 0px">&#128222;</font> +91-6280651195</div>'
      + '<div style="margin-bottom: 10px;"><b><a href="https://github.com/verma-divyanshu-git"><img src="github-mark-white.svg" alt="Github:" height="' + document.getElementById("terminal").style.fontSize + '" width="relative"> verma-divyanshu-git </a></b></div>'
      + '<div style="margin-bottom: 10px;"><b><a href="https://divyanshuverma-portfolio.web.app/"><font style="line-height: 0px">🌐</font> Portfolio</a></b></div>'
      + '<div style="margin-bottom: 10px;"><b><a href="https://www.linkedin.com/in/divyanshu-90b026236/"><img src="linkedin.svg" alt="Linkedin:" height="' + document.getElementById("terminal").style.fontSize + '" width="relative"> <strong>linkedin</strong> </a></b></div> <br>',
    education: '<b class="dirColor"><a target="_blank" href="https://goo.gl/maps/uhEDb3tCcfv98qbf9">Punjab Engineering College, Chandigarh</a></b>'
      + '<br>B.Tech in Computer Science and Engineering<br>2021-2025<br>CGPA: 8.6/10 <br>'
      + '<b class="dirColor"><a target="_blank" href="https://goo.gl/maps/1perezkmPyWQEP568">DAV Public School, Patiala</a></b>'
      + '<br>XII (91.8 %)<br>Graduated 2021 <br>'
      + '<b class="dirColor"><a target="_blank" href="https://goo.gl/maps/1perezkmPyWQEP568">DAV Public School, Patiala</a></b>'
      + '<br>X (91.82 %)<br>Graduated 2019<br>',

    skills: '- Programming Languages: C++, Java, Python, SQL, Bash <br>'
      + '- AI/ML Stack: TensorFlow, PyTorch, Scikit-Learn, Pandas, NumPy, OpenCV <br>'
      + '- Backend Development: Django, NodeJS, Flask, REST APIs, Distributed Systems, Microservices <br>'
      + '- Databases: MySQL, PostgreSQL, MongoDB <br>'
      + '- DevOps & Tools: Docker, Kubernetes, Jenkins, Git, Linux, Apache Spark, SonarQube, Postman <br>'
      + '- Cloud & Infrastructure: AWS, Google Cloud Platform, CI/CD, ACME, OpenSSL <br>'
      + '- Professional Skills: Agile Development, Unit Testing, Code Reviews, Cross-functional Collaboration, Technical Documentation, Problem-solving, Continuous Learning <br>',

    projects:
    {
      loading: "Loading projects from GitHub... Please wait.<br><font style='color: #888; font-size: 11px;'>This message will be replaced once the API call completes.</font>"
    },

    achievements: '- Flipkart Grid 6.0: Semi-Finalist with a National Rank < 20 among ~500,000 participants <br>' +
      '- Codeforces: Reached Expert (Max Rating: 1702), Profile: crabbyXpiggy <br>' +
      '- Contest Ranks: Best Global Ranks of 281 (Div-2), 959 (Div-2) and 606 (Div-3) in Codeforces Rounds 795, 794 and 786 <br>' +
      '- Leetcode: Max Rating 1990 (Knight), Profile: divyanshuverma <br>' +
      '- Contest Ranks: Best Global Ranks of 185 (Biweekly Contest 129) out of 25,287 participants and 516 (Biweekly Contest 131) out of 30,286 participants <br>' +
      '- STGI Sponsored Hackathon Winner (2022, 2023): Developed NLP based and Django based projects respectively <br>' +
      '- Amazon ML Summer School 2023: Selected out of tentatively 46,000 applicants <br>' +
      '- JEE Mains: Ranked 8906 (AIR) in JEE Mains, which is given by a pool of 1M+ candidates across the country <br>' +
      '- BITSAT: Scored 318 in BITSAT 2021 <br>' +
      '- JEE Advanced: Qualified JEE Advanced, one of the most prestigious and toughest exams in the country <br>',

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
const whoisdivyanshu = `<br><font style="word-break: normal;">Computer Science graduate from Punjab Engineering College with a passion for systems, backend engineering, and problem-solving. I have successfully applied my skills through impactful internships at Cisco (SDE) and iRage Capital (Quant/HFT), gaining hands-on experience in certificate automation, high-frequency trading, and distributed systems. A strong performer in competitive programming with Expert rating on Codeforces and Knight rating on LeetCode, I excel in both independent projects and collaborative, fast-paced environments. Always eager to tackle complex technical challenges and drive innovation through clean, efficient code.</font>`;

// Global flag to track API completion
var apiCallCompleted = false;

// Function called by resume.html after GitHub API call finishes
function finishedAPICall() {
  apiCallCompleted = true;
  // Update helper text with top 3 recent projects
  if (typeof updateHelperTextWithProjects === 'function') {
    updateHelperTextWithProjects();
  }
}

function download() {
  let test = document?.getElementById("pdf");
  console.log("print");
}
