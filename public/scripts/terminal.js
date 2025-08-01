/*
known issues in function besides basic developmental issues rooted in lack of intended development
(ex. issues such as " 'help' is not a valid command " are not listed as they are not rooted from
development bugs, rather the code is just not fully developed yet, but issues such as
" 'cd ..' moves user ahead a folder instead of behind a folder " are valid issues as they are caused
from buggy code)

- [FIXED] typing "divyanshu" will make it impossible to delete following 
          text because it thinks that it is a newline
          IDEA TO FIX THIS !!! IDEA IS whenever enter is pressed it takes
          the index of the newline and uses that instead of the
          lastindexof"divyanshu" 11
  
- [FIXED] after clearing terminal a ">" key appears to be somewhere?? so no commands work
      [FIXED] =>  no > anymore after changing how input is handled, however commands still do
      do not work after clearing the terminal
      
- [FIXED] does not read first line properly

- [FIXED] fix all of the above problems and make it overall more efficient if instead of just
  looking at a substring of html element keep track of typed characters in seperate
  string
  
- [fixed - css is so useful] user can type out of margins and bounds whops

- cannot delete '<', '>', '&' characters, dont know why (deleted from input string
  but does not disappear in html visual)
  
- Initiating shortcuts such as ctrl a will cause letter such as 'a' to be displayed
  
- [FIXED (mostly) ] history function does not work properly i kinda broke it lol trying to make it better

- moving cursor back and forth does not work properly

- [FIXED] cd dir works but cd dir/ does not

- [FIXED] user is able to cd into files that are not folders

- [FIXED] make 'cd ..' from '/root' not send user to ' ' or decide that there should not be a '/root' and just a ' '

- [FIXED] ls files and folders both folder font/color

- [FIXED] 'cd' will cause error because it is trying to split an undefined

- [FIXED] 'cd invalidDirectory' error message will contain '0' instead of 'invalidDirectory' do not know why

- [FIXED] 'ls directory' does not work

- [FIXED] 'divyanshu:~ cd divyanshu/folder1/invalidDirectory' expected to stay in / directory, rather goes into divyanshu/folder1 directory before encountering error

- consider curDirStr to be arr rather than formatted string

- folders should be sorted in alphabetical order (or atleast printed as such in ls) by default without manual sorting

- tab autofill prints not in alphabetical order

- [FIXED] once anything is inputted into terminal, can no longer unfocus

- directories printing to terminal are not conventionally spaced and sorted

- [FIXED] tree prints lines below last folder in directory shown

- figure out why calling tree multiple times makes the command slow! maybe bc its making so many variables?

- [FIXED] tree does not print correct directory on top when specified and inserts dirs inbetween a 0 and 1

- after download command cannot input any other command

*/

var terminal = document.getElementById("terminal");

var terminalWrap = document.getElementById("terminal-wrap");
var cursor = document.getElementById("cursor");


var isClickedIn = false;



var input = "";
const history = [""];
var historyIndex = 0;

const commands = [
['cat [FILE]', 'concatenate files and print on the standard output'],
['cd [dir]', 'change the shell working directory'],
['clear', 'clear the terminal screen'],
['download', 'downloads the latest uploaded version of resume'],
['help [command]', 'display information about built-in commands'],
['ls [FILE]', 'list directory contents'],
['mkdir [DIRECTORIES]', 'make directories'],
['pwd', 'print the name of the current working directory'],
['projects', 'prints some of my favorite projects'],
['resume', 'prints resume to terminal'],
['tree [dir]', 'prints tree of directories recursively starting from given dir location'],
['whois divyanshu', 'prints out my info']
];

const cmnd = []; 
commands.forEach(e => cmnd.push(e[0].split(" ")[0] + ' '));

var currentDirectory = fileStructure.divyanshu;
var curDirStr = "/divyanshu";

const dateS = new Date();
var date = document.getElementById("date");
date.innerHTML = dateS;


var cursorPositionLeft = 0;

var tabNum = 0;

// called when back button pressed
function backButtonPress()
{
    document.body.removeEventListener('click', bodyClick);
    terminalWrap.removeEventListener('click', terminalClick);
    document.onkeydown = function(e){};
    
    // to stop any monkey business!!!!!
    commandFinished = false;
    
    let button = document.getElementById("back-button");
    button.style.width = "100%";
    
    // to ensure hover properties stay the same after hover
    button.style.setProperty('--scale-num', '1.3');
    button.style.setProperty('--border-rad', '0%');
    button.style.borderRadius = '0%';
    terminalStuff.style.opacity = "0";
    helpText.style.opacity = "0";
    homeScreen.style.display = "flex";
    setTimeout(() => {
        homeScreen.style.opacity = "1";
    }, 1000);
    setTimeout(() => {
      // clear active terminal input to prevent collision if user comes back in help mode
      resetActiveLine();
      
      
      terminalStuff.style.visibility = "hidden";
      helpText.style.visibility = "hidden";
      
      // reset changed attributes of moved objects i.e position
      helpText.style.top = "50%";
      button.style.width = "40px";
      button.style.setProperty('--scale-num', '1');
      button.style.setProperty('--border-rad', '50%');
      button.style.borderRadius = 'var(--border-rad)';
    }, 2000);
}

// clears all user input text from active line
function resetActiveLine()
{
  document.getElementById("cursor").style.backgroundColor = cursor.style.borderColor;
  let lengthWithoutCursor = terminal.innerHTML.length - cursor.innerHTML.length - 43 - cursorPositionLeft;
  terminal.innerHTML = terminal.innerHTML.substr(0, lengthWithoutCursor - input.length) + terminal.innerHTML.substring(lengthWithoutCursor);
  input = "";
}


var commandFinished = false;

// Dynamic helper text - will be populated after GitHub API call
let helperText = ["whois divyanshu", "cat contact", "cat education", "cat skills", 
                    "cat achievements", "cat certifications" , "cat por", "cat references",
                    "cd projects/"];

// Function to update helper text with top 3 recent projects
function updateHelperTextWithProjects() {
  const projectKeys = Object.keys(fileStructure.divyanshu.projects);
  // Get top 3 projects (they're already sorted by recent updates)
  const topProjects = projectKeys.slice(0, 3);
  
  // Add the project commands to helper text
  topProjects.forEach(project => {
    helperText.push(`cat ${project}`);
  });
  
  // Add the final tree command
  helperText.push("tree ..");
}

let terminalStuff = document.getElementById("not-welcome");
let helpText = document.getElementById("help-text");
let homeScreen = document.getElementById("home-screen");


// should rename this so not to be confused wih showTerminal()
// called by buttons on home
function revealTerminal(needHelp = false, text = `okay, i'll just show you around
my resume. just press any key when you're ready`)
{
    pressToSkipTransition(needHelp);
    homeScreen.style.display = "none";
    homeScreen.style.opacity = "0";
    helpText.innerHTML = text;
    showHelpText();
    setTimeout(() => {
        moveHelpText();
        setTimeout(() => {
        showTerminal();
        assignHelper(needHelp);
        }, 1000);
    }, 2000);
}

function showTerminal()
{
  terminalStuff.style.visibility = "visible";
  terminalStuff.style.opacity = "1";
}

function showHelpText()
{
  helpText.style.visibility = "visible";
  helpText.style.opacity = "1";
}

function moveHelpText()
{
  helpText.style.top = "10%";
}

function assignHelper(needHelp)
{
  needHelp ? readyForHelper() : normalInput();
}

function pressToSkipTransition(needHelp)
{
  document.onkeydown = function(e)
  {
    helpText.classList.add('notransition');
    terminalStuff.classList.add('notransition');
    showHelpText();
    moveHelpText();
    helpText.offsetHeight;
    showTerminal();
    terminalStuff.offsetHeight;
    terminalStuff.classList.remove('notransition');
    helpText.classList.remove('notransition');
    assignHelper(needHelp);
  };
}

var helpCommandNum = 0;

function readyForHelper()
{
  // Wait for API call to complete before starting guided tour
  if (typeof apiCallCompleted !== 'undefined' && !apiCallCompleted) {
    setTimeout(() => readyForHelper(), 500);
    return;
  }
  
  document.onkeydown = function(e)
  {
    helpKeyPress();
  };
}

function helpKeyPress()
{
  document.onkeydown = function(e)
  {
    if(commandFinished)
    {
      commandFinished = false;
      typeNextCommand();
    }
  };
  cursor.style.backgroundColor = 'transparent';
  document.getElementById("cursor").style.backgroundColor = cursor.style.borderColor;
  helpText.innerHTML = `let's learn a little bit about me (press any key to proceed throughout)`;
  typeNextCommand();
}

function typeNextCommand(i = 0)
{
  if(i === helperText[0].length)
  {
    setTimeout(() => {
      helpCommandNum ++;
      commandFinished = true;
      enterPress(helperText[0]);
      helperText.splice(0, 1);
        if(helpCommandNum === 8)
        
        {
          helpText.innerHTML = `now we're going to check out some of the projects
          i've been working on`;
          commandFinished = false;
          typeNextCommand();
        }
        if(helperText.length === 0)
        {
          helpText.innerHTML = `<font style="font-size: 70%">those are the highlights! i'm giving you control now.
           here's an outline of my resume. feel free to click on any sections
          that look interesting for a closer look, or type 'download' to download
           my complete resume</font>`;
          normalInput();
          document.getElementById("cursor").style.backgroundColor = cursor.style.borderColor;
          isClickedIn = true;
        }
          
    }, 250);
  }
  else
  {
  setTimeout(() => {
        addText(helperText[0].charAt(i));
        // Play keypress sound during guided tour typing
        if (typeof soundManager !== 'undefined') {
          soundManager.playKeyPress();
        }
        typeNextCommand(i+1);
    }, Math.floor(Math.random() * 20 + 50));
  }
}

function bodyClick()
  {
    document.getElementById("cursor").style.backgroundColor = 'transparent';
    isClickedIn = false;
  }
  
function terminalClick(e)
{
    // stops body onclick from running
    e.stopPropagation();
    document.getElementById("cursor").style.backgroundColor = cursor.style.borderColor;
    isClickedIn = true;
}

function normalInput()
{
  cursor.style.backgroundColor = 'transparent';
  isClickedIn = false;
  document.body.addEventListener('click', bodyClick);
  terminalWrap.addEventListener('click', terminalClick);

  document.onkeydown = function(e)
  {
    if(isClickedIn)
    {
      var key = e.key;
      
      if(key === "Tab")
      {
        e.preventDefault();
        // Play tab sound
        if (typeof soundManager !== 'undefined') {
          soundManager.playTab();
        }
        
        let desiredDir = input.split(" ");
        if(desiredDir.length === 1)
        {
          if(input !== "")
            checkTab(currentDirectory, input, cmnd);
        }
        else
        {
          desiredDir = desiredDir[desiredDir.length - 1];
          if(desiredDir !== undefined)
          {
              let dir;
              let lastSlashIndex = desiredDir.lastIndexOf('/');
              if(lastSlashIndex !== -1)
              {
                
                // desiredDir = desiredDir.split("/");
                // dir = traverseDir(desiredDir.splice(0, desiredDir.length - 1), currentDirectory, curDirStr)[0];
                dir = traverseDir(desiredDir.substring(0, lastSlashIndex + 1), currentDirectory, curDirStr)[0];
                desiredDir = desiredDir.substring(lastSlashIndex + 1);
                
              }
              else
                dir = currentDirectory;
              let dirContent = [];
              switch(input.split(" ")[0])
              {
              case "cd" : case 'mkdir' : case 'tree' :
                Object.keys(dir).forEach(function(e) {if(isFolder(e, dir))dirContent.push(e + '/')});
                break;
              case "help" : 
                dirContent = cmnd;
                break;
              case "whois" :
                dirContent = ["divyanshu"];
                break;
              default :
                Object.keys(dir).forEach(function(e) {let s = ''; if(isFolder(e, dir)) s = '/'; else s = ' '; dirContent.push(e + s)});
                break;
              }
              checkTab(dir, desiredDir, dirContent);
          }
        }
        terminal.scrollTop = terminal.scrollHeight;
      }
      
      if(key === "ArrowUp")
      {
        e.preventDefault();
        if(historyIndex < history.length - 1 && history.length != 0)
        {
          let lengthWithoutCursor = terminal.innerHTML.length - cursor.innerHTML.length - 43 - cursorPositionLeft;
          historyIndex ++;
          terminal.innerHTML = terminal.innerHTML.substr(0, lengthWithoutCursor - input.length) + history[historyIndex] + terminal.innerHTML.substring(lengthWithoutCursor);
          input = history[historyIndex];
        }
      }
      if(key === "ArrowDown")
      {
        e.preventDefault();
        if(historyIndex > 0)
        {
          let lengthWithoutCursor = terminal.innerHTML.length - cursor.innerHTML.length - 43 - cursorPositionLeft;
          historyIndex --;
          terminal.innerHTML = terminal.innerHTML.substr(0, lengthWithoutCursor - input.length) + history[historyIndex] + terminal.innerHTML.substring(lengthWithoutCursor);
          input = history[historyIndex];
          
        }
      }
      
      
      /*
      if(key === "ArrowLeft")
      {
        printCursor("black");
        cursorPositionLeft ++;
        printCursor("white");
      }
      
      */
      
  
      /*
      if(key === "ArrowLeft")
      {
        cursorPositionLeft ++;
        let lengthWithoutCursor = terminal.innerHTML.length - cursor.innerHTML.length - 43 - cursorPositionLeft;
        cursorCharacter = terminal.innerHTML.substr(lengthWithoutCursor - 1, 1);
        
        terminal.innerHTML = terminal.innerHTML.substring(0, lengthWithoutCursor - 1) + terminal.innerHTML.substring(lengthWithoutCursor + 1, lengthWithoutCursor + cursor.innerHTML.length + 65) //+ prevCharacter +  terminal.innerHTML.substr(terminal.innerHTML.length - cursorPositionLeft); //+ prevCharacter; //terminal.innerHTML.substr(lengthWithoutCursor - cursorPositionLeft + 2, 1);
        prevCharacter = cursorCharacter;
      }
      
      */
    
      
      if(key.length === 1)
      {
        addText(key);
        input += key;
        history[historyIndex] += key;
        terminal.scrollTop = terminal.scrollHeight;
        tabNum = 0;
        // Play keypress sound
        if (typeof soundManager !== 'undefined') {
          soundManager.playKeyPress();
        }
      }
      
      else if(key === "Backspace")
      {
        if(input.length > 0)
        {
          let lengthWithoutCursor = terminal.innerHTML.length - cursor.innerHTML.length - 43 - cursorPositionLeft;
          terminal.innerHTML = terminal.innerHTML.substr(0, lengthWithoutCursor - 1) + terminal.innerHTML.substring(lengthWithoutCursor);
          input = input.substr(0, input.length - 1);
          if(historyIndex != -1)
          {
            history[historyIndex] = history[historyIndex].substr(0, history[historyIndex].length - 1);
          }
          // Play backspace sound
          if (typeof soundManager !== 'undefined') {
            soundManager.playBackspace();
          }
        }
      }
      else if(key === "Enter")
      {
        // Play enter sound
        if (typeof soundManager !== 'undefined') {
          soundManager.playEnter();
        }
        enterPress(input);
      }
    }
  };

}

function runCommand(command)
{
  addText(command);
  input += command;
  history[historyIndex] += command;
  enterPress(command);
}

function enterPress(enterInput)
{
  var command = enterInput.split(" ")[0];
  if(command === "clear")
      {
        let lengthWithoutCursor = terminal.innerHTML.length - cursor.innerHTML.length - 43 - cursorPositionLeft;
        terminal.innerHTML = "<font class='userColor'>divyanshu</font>:<font class='dirColor'>~" + curDirStr + "</font> $ " + terminal.innerHTML.substring(lengthWithoutCursor);
      }
      else
      {
        switch(command)
        {
        case '':
          newLine();
          break;
          
        case 'pwd':
          addText('<br><span class="output-text">' + curDirStr + '</span>');
          newLine();
          break;
          
        case 'help':
          helpText.style.opacity = "0";
          setTimeout(() => {
          helpText.style.visibility = "hidden";
          }, 2000);
          help(enterInput.split(" ")[1]);
          break;
          
        case 'cd':
          cd(enterInput.split(" ")[1]);
          break;
        
        case 'ls':
          ls(enterInput.split(" ")[1]);
          break;

        case 'cat':
          cat(enterInput.split(" ").filter(e => e !== ""));
          break;
          
        case 'resume':
          resume();
          break;
          
        case 'projects':
          projects();
          break;
          
        case 'download':
          download();
          break;
          
        case 'mkdir':
          mkdir(enterInput.split(" ").slice(1));
          break;

        // \/ important \/
        case 'wilbur':
          addText('<br>wilbur <font style="font-size: 12px; line-height: 0px">&#128525;&#129409;</font>');
          newLine();
          break;
          
        case 'whois':
          whois(enterInput.split(" ").slice(-1)[0]);
          break;
          
        case 'tree':
          tree(enterInput.split(" ")[1]);
          break;
        
        case 'fritos':
          fritos(enterInput.split(" ")[1]);
          break;
          
        case 'sound':
          toggleSound();
          break;
          
        default:
          addText("<br><span class='error-text'>Unknown Command: " + enterInput.split(" ")[0] + "</span>");
          // Play error sound for unknown commands
          if (typeof soundManager !== 'undefined') {
            soundManager.playError();
          }
          newLine();
        }
      }
      if(historyIndex > 0)
        {
          history[0] = history[historyIndex];
        }
      if(history[historyIndex] !== "")
        if(history[0] !== "")
          history.unshift("");
      historyIndex = 0;
      input = "";
      terminal.scrollTop = terminal.scrollHeight;
      tabNum = 0;
}

function fritos(type)
{
  addText('<br><a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank"><img src="http://mobileimages.lowes.com/product/converted/028400/028400097604.jpg" alt="fritos original" width="40px" height"relative"></a>');
  newLine();
}

function tree(desiredDirStr)
{
  let test = defaultChangeDirectorySafely(desiredDirStr, 'tree');
  if(test[0])
  {
    addText(`<br><font class="dirColor">(tip, click on file name to see the 
    contents!)<br>${test[2] === curDirStr ? '.' : test[2].substring(test[2].lastIndexOf('/') + 1)}</font><br>`);
    console.log(test[1]);
    console.log(test[2]);
    treeRecurse(desiredDirStr, test[1], test[2]);
  }
  newLine();
}

// this is annoying and can prob be a lot more efficient
// we love recursion !!!!!
function treeRecurse(ogStr, dir, dirStr, keyNum = 0, [...numDeep] = [])
{
  let arr = Object.keys(dir).sort().slice(keyNum);
  let nextFile = arr[0];
  if(nextFile === undefined)
  {
    return;
  }
  let isLastInDir = arr.length === 1;
  numDeep.forEach(e => {addText((e ? '│' : '&nbsp;') + '&nbsp;&nbsp;&nbsp;')});
  addText(isLastInDir ? '└── ' : '├── ');
  
  if(isFolder(nextFile, dir))
  {
    addText(`<font class='dirColor'>${nextFile}</font><br>`);
    treeRecurse(ogStr, dir[`${nextFile}`], dirStr + `/${nextFile}`, 0, [...numDeep, isLastInDir ? false : true]);
  }
  else
  {
    addText(`<button class="tree-button" onclick="
    let dir = locateDirectory('${dirStr}', curDirStr); runCommand('cat ' + dir + '${nextFile}')">${nextFile}</button><br>`);
  }
  treeRecurse(ogStr, dir, dirStr, keyNum + 1, numDeep);
}



function whois(name)
{
  if(name === null || name === "")
  {
    addText('<br>Command usage: whois [NAME]<br>Did you mean `whois divyanshu\'?');
  }
  else
  {
  console.log(name);
  addText(name === "divyanshu" ? whoisdivyanshu : `<br>whois: \`${name}': unknown name.<br>
          Did you mean \`whois divyanshu'?`);
  }
  newLine();
}

function newLine()
{
  addText("<br><span class='command-text'>divyanshu</span>:<span class='highlight-text'>~" + curDirStr + "</span> $ ");
}

function mkdir(directories)
{
  if(directories[0] === "" || directories[0] === undefined)
  {
    addText("<br>mkdir: missing operand<br>Try 'help mkdir' for more information");
    newLine();
    return;
  }
  directories.forEach(function(e)
    {
      let lastSlashIndex = e.lastIndexOf("/");
      let name = e.substring(lastSlashIndex + 1);
      let dir = [];
        dir = traverseDir(e.substring(0, lastSlashIndex + 1), currentDirectory, curDirStr);
      switch(dir)
      {
        case -1:
          addText("<br>mkdir: `" + e + "': Not a directory");
          break;
        case 1:
          addText("<br>mkdir: `" + e + "': No such file or directory");
          break;
        default:
          
          if(!Object.keys(dir[0]).includes(e.substring(lastSlashIndex)))
            dir[0][`${name}`] = {};
          else
            addText("<br>mkdir: cannot create directory `" + e + "': File exists");
      }
    });
    console.log(currentDirectory);
  newLine();
}

function download()
{
  //window.jsPDF = window.jspdf.jsPDF;
  //var doc = new jsPDF();
  
  
  //window.open("resume.html", "_blank");
  
  
  ///*
    var link = document.createElement("a");
    link.setAttribute('download', 'CV.pdf');
    link.href = "CV.pdf";
    document.body.appendChild(link);
    link.click();
    link.remove();
    newLine();
   // */
  
}

function cd(arg)
{
  if(arg === undefined || arg === "")
  {
    currentDirectory = fileStructure;
    curDirStr = "";
  }
  else
  {
  // var desiredDir = arg.split("/").filter(e => e !== ""); // "cd test/test1/test2/" = [ 'test', 'test1', 'test2' ]
    let callCd = traverseDir(arg, currentDirectory, curDirStr);
    switch(callCd)
    {
        case -1:
          addText("<br><span class='error-text'>cd: " + arg + ": Not a directory</span>");
          break;
      
      case 1:
        addText("<br><span class='error-text'>cd: " + arg + ": No such file or directory</span>");
        break;
      default:
        currentDirectory = callCd[0];
        curDirStr = callCd[1];
    }
  }
  newLine();
}

// returns array [bool validDir? , newDir, newDirStr]
function defaultChangeDirectorySafely(arg, command = 'cd')
{
  if(arg === undefined || arg === "")
  {
    return [true, currentDirectory, curDirStr];
  }
  else
  {
    let callCd = traverseDir(arg, currentDirectory, curDirStr);
    switch(callCd)
    {
      case -1:
        addText("<br>cd: " + arg + ": Not a directory");
        break;
      case 1:
        addText("<br>cd: " + arg + ": No such file or directory");
        break;
      default:
        return [true, callCd[0], callCd[1]];
    }
    return [false];
  }
}

function cat(arg)
{
  arg = arg.splice(1, arg.length);
  arg.forEach(e => print(e));
  newLine();
}

function ls(inpt)
{
  if(inpt === undefined || inpt === "")
  {
    if(Object.keys(currentDirectory)[0] === undefined)
    {
      newLine();
      return;
    }
    
    // Special handling for projects directory
    if(curDirStr === '/divyanshu/projects') {
      addText('<br><font style="color: #00ff00; font-weight: bold;">📂 GitHub Projects (sorted by 📅 recent updates):</font><br><br>');
      
      let projectKeys = Object.keys(currentDirectory);
      projectKeys.forEach(function(item, index) {
        let projectData = currentDirectory[item];
        
        // Extract basic info from the HTML content
        let projectName = item;
        let isStarred = projectData.includes('⭐');
        let hasLanguage = projectData.includes('Language:');
        
        // Create a nice summary line
        let summary = `<font style="color: #ffffff; font-weight: bold;">${index + 1}. ${projectName}</font>`;
        
        if(isStarred) {
          let starMatch = projectData.match(/⭐ (\d+)/);
          if(starMatch) {
            summary += ` <font style="color: #ffff00;">⭐ ${starMatch[1]}</font>`;
          }
        }
        
        if(hasLanguage) {
          let langMatch = projectData.match(/Language: ([^|]+)/);
          if(langMatch) {
            summary += ` <font style="color: #888;">[${langMatch[1].trim()}]</font>`;
          }
        }
        
        addText(summary + '<br>');
      });
      
      addText('<br><font style="color: #888; font-size: 11px;">💡 Use "cat <project-name>" to see full details, or "projects" to see all at once</font>');
      newLine();
      return;
    }
    
    // Default ls behavior for other directories
    addText('<br>');
    Object.keys(currentDirectory).sort().forEach(function(item) { 
      if(isFolder(item, currentDirectory)) 
        addText('<font class="dirColor">' + item + ' </font>'); 
      else 
        addText(item + ' ');
    });
    newLine();
    return;
  }
  //let lsDir = traverseDir(inpt.split("/").filter(e => e !== ""), currentDirectory, curDirStr);
    let lsDir = traverseDir(inpt, currentDirectory, curDirStr);
  
  if(typeof lsDir[0] === 'object')
  {
    if(Object.keys(lsDir[0])[0] === undefined)
    {
      newLine();
      return;
    }
    addText('<br>');
    Object.keys(lsDir[0]).sort().forEach(function(item) {if(isFolder(item, lsDir[0])) addText('<font class="dirColor">' + item + ' </font>'); else addText(item + ' ');});
  }
  
  else if(lsDir === -1 && inpt.substr(inpt.length - 1) !== '/')
  {
    addText('<br>' + inpt);
  }
  
  else if (lsDir === 1)
  {
    addText('<br>ls: cannot access '+ inpt + ': No such file or directory');
  }
  else
  {
    addText('<br>ls: cannot access '+ inpt + ': Not a directory');
  }
  newLine();
}

function help(arg)
{
  if(arg === '' || arg === undefined)
            commands.forEach(e => addText('<br>' + e[0]));
          else if(cmnd.includes(arg + ' '))
          {
            let index = cmnd.indexOf(arg + ' ');
            addText('<br>' + commands[index][0] + " - " + commands[index][1]);
          }
          else
          {
            addText('<br> help: no help topics match `' + arg + '\'. Try `help help\'.');
          }
          newLine();
}

// note: method of traversing to correct directory only works in linear file structure
// note: now it works from anywhere! bc of locateDirectory function 😍
function resume()
{
  newLine();
  if(curDirStr !== '/divyanshu')
    runCommand('cd ' + locateDirectory('/divyanshu', curDirStr));
  runCommand("whois divyanshu");
  runCommand('cat contact');
  runCommand('cat education');
  runCommand('cat skills');
  runCommand('cat achievements');
  runCommand('cat certifications');
  runCommand('cat por');
  runCommand('cat references');
}

// note: method of traversing to correct directory only works in linear file structure
// note: now it works from anywhere! bc of locateDirectory function 😍
function projects()
{
  newLine();
  if(curDirStr !== '/divyanshu/projects')
    runCommand('cd ' + locateDirectory('/divyanshu/projects', curDirStr));
  
  // Show all GitHub projects dynamically
  addText('<br><font style="color: #00ff00; font-weight: bold;">🎆 Showcasing All GitHub Projects:</font><br><br>');
  
  let projectKeys = Object.keys(fileStructure.divyanshu.projects);
  let count = 0;
  
  projectKeys.forEach(function(projectName) {
    count++;
    addText(`<font style="color: #ffffff; font-weight: bold;">[${count}] ${projectName.toUpperCase()}</font><br>`);
    addText('<font style="color: #888;">========================</font><br>');
    addText(fileStructure.divyanshu.projects[projectName]);
    addText('<br><br>');
  });
  
  addText('<font style="color: #888; font-size: 11px;">📊 Total Projects: ' + count + ' | Updated automatically from GitHub API</font>');
  newLine();
}



// uhh so apparently u can just start path with a / and go straight to the desired dir!!! whoops
// so this function is bascialyl like useless but wtv its still cool
// actually im using it now for clicking on file from tree so its useful!
// ex. locateDirectory('/divyanshu/projects', '/divyanshu') returns 'projects/'
function locateDirectory(desiredDir, currentWorkingDirectoryStr)
{
  // the string of directory path being returned
  let dir;
  let desiredDirArr = desiredDir.split('/').filter(e => e !== "");
  let currDirArr = currentWorkingDirectoryStr.split('/').filter(e => e !== "");
  // this is really smart good job dude
  // thank you
  // i just want someone to love me yk man
  // i feel you broski but this is not really the time to get into this
  // then when is the time? when can i express myself ev  er if not now? can you hear my singing? can you feel my every escaping breath?
  // what the fuck are you talking about
  // the government has been giving the homeless population supplements containing methamphetamine in order to supress their cries
  let lastCommonIndex = -1;
  // sets lastCommonIndex as the level of the lowest shared directory
  // ex. if desiredDirArr = ['home', 'folder1', 'folder2', 'subfolder3'] and currDirArr = ['home', 'folder1', 'jerry', 'crayola']
  // would return 1 as in index 1, 'folder1', their closest common folder
  desiredDirArr.forEach(function(e) {if(e === currDirArr[lastCommonIndex + 1]) lastCommonIndex++; else return;});
  // brings currentDir to common shared folder
  dir = '../'.repeat(currDirArr.length - lastCommonIndex - 1);
  // moves currentDir up filepath of desiredDir
  for(let i = lastCommonIndex + 1; i < desiredDirArr.length; i++)
  {
    dir += desiredDirArr[i] + '/';
  }
  // returns filepath necessary to traverse from currentDirectory to desiredDirectory
  return dir;
}

/*
function printCursor(color)
{
  if(cursorPositionLeft === 0)
  {
    terminal.textContent += "<font style='background-color: " + color + "'>&nbsp;</font>";
    return;
  }
  let index = terminal.textContent.length - cursorPositionLeft;
  terminal.textContent = terminal.textContent.substring(0, index-1) + "<font style='background-color: " + color + "'>" + terminal.textContent.substring(index, index+1) + "</font>" + terminal.textContent.substring(index+1);
}

*/

// i really dislike that i do it this way
function addText(text)
{
  let lengthWithoutCursor = terminal.innerHTML.length - cursor.innerHTML.length - 43 - cursorPositionLeft;
  terminal.innerHTML = terminal.innerHTML.substring(0, lengthWithoutCursor) + text + terminal.innerHTML.substring(lengthWithoutCursor);
}

// prints file to terminal
function print(inpt)
{
        
  let catDir = traverseDir(inpt, currentDirectory, curDirStr);
  switch(catDir)
  {
    case -1:
      let lastSlashIndex = inpt.lastIndexOf("/");
      let fileName = inpt.substring(lastSlashIndex + 1);
      addText('<br>' + traverseDir(inpt.substring(0, lastSlashIndex), currentDirectory, curDirStr)[0][`${fileName}`]);
      break;
    
  case 1:
    addText('<br><span class="error-text">cat: ' + inpt + ': No such file or directory</span>');
    break;
    
  default:
    addText('<br><span class="error-text">cat: ' + inpt + ': Is a directory</span>');
  
  }
}

// takes array of strings and returns a string of first shared consecutive characters
// ex. stringMatch(['hello', 'help!', 'heliograph']) would return 'hel'
function stringMatch( strings, index = 0)
{
  if (strings.length === 1) return strings[0];
  for(let i = 0; i < strings.length - 1; i++)
    if(strings[i].substring(0, index + 1) !== strings[i + 1].substring(0, index + 1))
      return strings[i].substring(0, index);
  return stringMatch(strings, index + 1);
}



function checkTab(dir, tabInput, dirContent)
{
  let match = [];
  dirContent.forEach(function(e) {if(e.indexOf(tabInput) === 0) match.push(e)});
  
  let commonLetters = stringMatch(match);
  let fill = '';
  if(commonLetters !== '')
  {
    fill = commonLetters.substring(tabInput.length);
    addText(fill);
    input += fill;
    history[historyIndex] += fill;
  }
  if(fill === '')
  {
    tabNum++;
    if(tabNum > 1)
    {
      addText('<br>');
      match.forEach(e => addText(e + ' '));
      addText('<br><font class="userColor">divyanshu</font>:<font class="dirColor">~' + curDirStr + '</font> $ ' + input);
    }
  }
}

function isFolder(e, dir)
{
  return typeof dir[`${e}`] === 'object';
}



function traverseDir(desiredDir, dir, dirStr)
{
  if(desiredDir.substring(0, 1) === '/')
  {
    if(desiredDir.length === 1)
      return [fileStructure, ''];
    dir = fileStructure;
    dirStr = '';
  }
  if(desiredDir === "" || desiredDir === undefined)
    return [dir, dirStr];
  desiredDir = desiredDir.split("/").filter(e => e !== "");
  for(let i = 0; i < desiredDir.length; i++)
  {
    let dirCheck = desiredDir[i];
    if(dirCheck in dir && isFolder(dirCheck, dir))
          {
            dir = dir[`${dirCheck}`];
            dirStr += "/" + dirCheck;
          }
    else if(dirCheck === '..')
    {
      [dir, dirStr] = recedingDir(dir, dirStr);
      
      // no longer works after mkdir was added, allowing possibility of folders with names containing numeric literals
      // eval("dir = fileStructure" + dirStr.split("/").join("."));
    }
    else if(dirCheck=== '~')
    {
      dir = fileStructure["divyanshu"];
      dirStr = "/divyanshu";
    }
    // Not a directory
    else if(dirCheck in dir && i === desiredDir.length - 1)
    {
      return -1;
    }
    
    // No such file or directory
    else if(dirCheck !== '.')
    {
      return 1;
    }
  }
  return [dir, dirStr];
}

// returns dir preceding given dir
function recedingDir(dir, dirStr)
{
  dir = fileStructure;
  dirStr = dirStr.substr(0, dirStr.lastIndexOf("/"));
  dirStr.split("/").filter(e => e !== "").forEach(e => dir = dir[`${e}`]);
  return [dir, dirStr];
}

// Toggle sound effects on/off with visual feedback
function toggleSound()
{
  if (typeof soundManager !== 'undefined') {
    soundManager.toggleEnabled();
    let status = soundManager.isEnabled() ? 'ON' : 'OFF';
    let statusColor = soundManager.isEnabled() ? '#00ff00' : '#ff6666';
    let icon = soundManager.isEnabled() ? '🔊' : '🔇';
    
    addText(`<br><span class="highlight-text">${icon} Sound effects: </span><span style="color: ${statusColor}; font-weight: bold;">${status}</span>`);
    
    // Play a test sound if enabling
    if (soundManager.isEnabled()) {
      setTimeout(() => {
        soundManager.playKeyPress();
      }, 100);
    }
  } else {
    addText('<br><span class="error-text">❌ Sound system not available</span>');
  }
  newLine();
}
