const fileStructure = 
{
    divyanshu : 
    {
      contact: '<div style="margin-bottom: 10px;"><b><a href="mailto: divyanshuu.12.09@gmail.com"><font style="line-height: 0px">&#128231;</font> divyanshuu.12.09@gmail.com</a></b></div>'
      + '<div style="margin-bottom: 10px;"><font style="line-height: 0px">&#128222;</font> +91 62806 51195</div>'
      + '<div style="margin-bottom: 10px;"><b><a href="https://github.com/verma-divyanshu-git"><img src="github-mark-white.svg" alt="Github:" height="' + document.getElementById("terminal").style.fontSize + '" width="relative"> verma-divyanshu-git </a></b></div>'
      + '<div style="margin-bottom: 10px;"><b><a href="https://www.linkedin.com/in/divyanshu-verma-90b026236"><img src="linkedin.svg" alt="Linkedin:" height="' + document.getElementById("terminal").style.fontSize + '" width="relative"> <strong>linkedin</strong> </a></b></div>',
      education: '<b class="dirColor"><a target="_blank" href="https://goo.gl/maps/uhEDb3tCcfv98qbf9">Punjab Engineering College, Chandigarh</a></b>'
                + '<br>B.Tech in Computer Science and Engineering<br>Graduating 2025<br>CGPA: 8.88/10 <br>'
                + '<b class="dirColor"><a target="_blank" href="https://goo.gl/maps/1perezkmPyWQEP568">DAV Public School, Patiala</a></b>'
                + '<br>XII (91.8 %)<br>Graduated 2021 <br>'
                + '<b class="dirColor"><a target="_blank" href="https://goo.gl/maps/1perezkmPyWQEP568">DAV Public School, Patiala</a></b>'
                + '<br>X (91.82 %)<br>Graduated 2019<br>',
      por: 'PEC-ACM CSS Student Chapter : Member <br>' 
                + 'Asset Management Club (AMC-PEC) : Event Manager <br>' 
                + 'SAASC (Speaker’s Association and Study Circle) : Member <br>' 
                + 'Entrepreneurship and Incubation Cell (EIC) : IB Member <br>'
                + 'Les Amis : Permanent Member <br>'
                + 'Google Developer Student Clubs (GDSC): Member',
      certifications: '<a href="https://graduation.udacity.com/confirm/WHGUKMTS">AWS Machine Learning Foundations: Udacity</a><br>' 
                + '<a href="https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/Goldman%20Sachs/NPdeQ43o8P9HJmJzg_Goldman%20Sachs_yLFupGR3PppGnQiPk_1660256281637_completion_certificate.pdf">Virtual Experience Program Participant: Goldman Sachs</a><br>' 
                + '<a href="https://googlecloud.qwiklabs.com/public_profiles/a5d24d38-4244-4b50-9aa9-31ab7763ea2e">30 Days of Google Cloud: Hands on practice on Google Cloud Platform</a><br>' 
                + '<a href="https://www.coursera.org/account/accomplishments/certificate/Q85AWHNFCGPT">Stock Valuation with Comparable Companies Analysis: Coursera</a><br>',
      projects: 
      {
        // user projects
      },
      skills: '-  Interpersonal Skills: Fast Learner, Problem Solving, Analytical Thinking, Active Listener, Teamwork, <br> Growth Mindset, Code Analysis and Development, Onsite & Digital Marketing <br> '
              + '- Programing Languages: C++, JavaScript, Python, SQL, HTML, CSS, Unix Shell, Assembly <br>'
              + '-  Mathematics: Linear Algebra (Basics), Discrete Structures, Probability and Statistics, Calculus and Ordinary Differential Equations <br>'
              + '- CS subjects: Operating System, Computer Network, DBMS, OOPS, DSA <br>'
              + '- Tools: Git, Linux, Bash, VS Code, LATEX, Chrome Dev Tools <br>'
              + '- Libraries/Frameworks: Firebase, C++ STL, OpenCV, Bootstrap <br>',
    
      achievements: 'JEE Mains : Ranked 8906 (AIR) in JEE Mains, which is given by a pool of 1M+ candidates across the country.<br>'
    + 'BITSAT : Scored 318 in BITSAT 2021.<br>'
    + 'JEE Adv : Qualified JEE Advance, one of the most prestigious and toughest exams of the country.<br>'
    + 'HackerRank : 4 star C++ Badge on HackerRank, Silver level, earned 170 points.<br>'
    + 'Pre-RMO : Qualified Pre-RMO, first stage of the International Mathematics Olympiad which covers pre-college math topics, especially algebra, number theory, combinatorics, and geometry.<br>'
    + 'Organizing Committee : Worked in the OC of the event "Silent Disco" (Les Amis), E-Summit\'22 (EIC) and PECFEST-Creative Committee.<br>',
      
      references: '<br><br><b>Professional References:</b><br>'
    + 'Dr. Sanjeev Sofat<br>'
    + 'Professor(CSE) and Deputy Director, PEC University of Technology, Chandigarh<br>'
    + '<a href="mailto:sanjeevsofat@pec.edu.in"><i class="fa fa-envelope"></i> sanjeevsofat@pec.edu.in</a><br>'
  },
    test :
    {
      test1 :
      {
        test2 : 'test!!',
        test3 : 'testlolol'
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

var request = new XMLHttpRequest();

request.open('GET', 'https://api.github.com/users/verma-divyanshu-git/repos', true)

request.onload = function () {
  var data = JSON.parse(this.response);
  data.forEach(function(e){
    
    let description = "<a target='_blank' href='" + e.html_url + "'><font style='line-height: 0px'>&#128279;</font><b>" + e.full_name + "</b></a><br>"
                      + (e.description ?? "click the link to learn more about this project!");
    
    fileStructure["divyanshu"]["projects"][`${e.name}`] = description;
    
    // lol!! this line of code is trash \/   \/ LOL!!
    //eval('Object.assign(fileStructure.divyanshu.projects, {"' + e.name.replace(/-/g, '_') + '" : "' + description + '"});');
    
  });
  // calls in resume.html context
  finishedAPICall();
};

request.send();

const whoisdivyanshu = `<br><font style="word-break: normal;">As a student at Punjab Engineering College, I have a keen interest in all aspects of computer science. I derive great pleasure from exploring the workings of various technologies and enhancing my knowledge through hands-on experimentation and tinkering. With a track record of successful participation in multiple hackathons, I possess the ability to effectively manage independent projects and collaborate seamlessly as part of a productive team.</font>`;
          
          
// run this to see how many documents are being accessed
function download()
{
  let test = document?.getElementById("pdf");
  console.log("print");
}