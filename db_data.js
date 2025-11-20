const DB_TOPICS_PYTHON = [
  {
    id: "variables",
    name: "1. Python Variables",
    // Main: Telusko (11 mins)
    video_main: "https://www.youtube.com/embed/TqPzwenhMj0",
    // Reteach: CS Dojo (6 mins)
    video_reteach: "https://www.youtube.com/embed/Z1Yd7upQsXY",
    
    questions_batch_1: [
      { q: "x = 10. What is the data type of x?", o: ["float", "int", "str", "bool"], a: 1 },
      { q: "Which function outputs text?", o: ["echo()", "print()", "log()", "write()"], a: 1 },
      { q: "Variable names cannot start with...", o: ["A letter", "An underscore", "A number", "Capital letter"], a: 2 },
      { q: "Which assignment is correct?", o: ["10 = x", "x -> 10", "x = 10", "int x = 10"], a: 2 },
      { q: "What represents a string?", o: ["'Text'", "100", "True", "3.14"], a: 0 }
    ],
    questions_batch_2: [
      { q: "Is Python case-sensitive?", o: ["Yes", "No", "Sometimes", "Only in loops"], a: 0 },
      { q: "type(3.14) returns?", o: ["int", "float", "double", "decimal"], a: 1 },
      { q: "Which variable name is valid?", o: ["2cool", "my-var", "my_var", "var!"], a: 2 },
      { q: "Can you change a variable's type?", o: ["Yes (Dynamic)", "No (Static)", "Only once", "Never"], a: 0 },
      { q: "x = True. What type is x?", o: ["int", "str", "bool", "float"], a: 2 }
    ]
  },
  
  {
    id: "if_statements",
    name: "2. If/Else Statements",
    // Main: Mosh (5 mins)
    video_main: "https://www.youtube.com/embed/Zp5MuPOtsSY",
    // Reteach: Telusko (7 mins)
    video_reteach: "https://www.youtube.com/embed/PqFKRqpHrjw",

    questions_batch_1: [
      { q: "Keyword for 'Else If'?", o: ["elseif", "else if", "elif", "if else"], a: 2 },
      { q: "Correct syntax?", o: ["if x > 5:", "if (x > 5)", "if x > 5 then", "if x > 5;"], a: 0 },
      { q: "Check equality?", o: ["=", "==", "===", "equals"], a: 1 },
      { q: "Indentation is...", o: ["Optional", "Mandatory", "Stylistic", "Ignored"], a: 1 },
      { q: "Logical AND operator?", o: ["&&", "and", "&", "AND"], a: 1 }
    ],
    questions_batch_2: [
      { q: "Check 'not equal'?", o: ["<>", "!=", "=/=", "not="], a: 1 },
      { q: "Logical OR operator?", o: ["||", "or", "|", "OR"], a: 1 },
      { q: "What runs if 'if' is false?", o: ["then", "else", "stop", "next"], a: 1 },
      { q: "Can you nest if statements?", o: ["Yes", "No", "Only 1 level", "Never"], a: 0 },
      { q: "True and False evaluates to?", o: ["True", "False", "Error", "None"], a: 1 }
    ]
  },
  {
    id: "loops",
    name: "3. While & For Loops",
    // Main: Mosh (5 mins)
    video_main: "https://www.youtube.com/embed/94UHCEmprCY",
    // Reteach: Telusko (9 mins)
    video_reteach: "https://www.youtube.com/embed/0ZvaDa8eT5s",

    questions_batch_1: [
      { q: "Loop fixed number of times?", o: ["while", "for", "do-while", "repeat"], a: 1 },
      { q: "range(3) outputs?", o: ["1,2,3", "0,1,2", "0,1,2,3", "1,2"], a: 1 },
      { q: "Stop loop immediately?", o: ["stop", "break", "exit", "return"], a: 1 },
      { q: "Skip current iteration?", o: ["pass", "skip", "continue", "next"], a: 2 },
      { q: "Loop while true?", o: ["for", "while", "if", "loop"], a: 1 }
    ],
    questions_batch_2: [
      { q: "range(1, 4) outputs?", o: ["1,2,3,4", "1,2,3", "2,3,4", "0,1,2,3"], a: 1 },
      { q: "Can you loop over a string?", o: ["Yes", "No", "Only lists", "Error"], a: 0 },
      { q: "Keyword for empty block?", o: ["void", "null", "pass", "empty"], a: 2 },
      { q: "What does 'break' do?", o: ["Pauses", "Exits loop", "Skips", "Restarts"], a: 1 },
      { q: "Is there a do-while loop?", o: ["Yes", "No", "Maybe", "Sometimes"], a: 1 }
    ]
  },
  {
    id: "functions",
    name: "4. Python Functions",
    // Main: Mosh (5 mins)
    video_main: "https://www.youtube.com/embed/u-OmVr_fT4s",
    // Reteach: Telusko (8 mins)
    video_reteach: "https://www.youtube.com/embed/BVfCWuca9nw",

    questions_batch_1: [
      { q: "Keyword to define function?", o: ["func", "def", "function", "define"], a: 1 },
      { q: "Send data back from function?", o: ["output", "send", "return", "back"], a: 2 },
      { q: "Inputs to functions are called?", o: ["Parameters", "Variables", "Data", "Types"], a: 0 },
      { q: "Call function named 'myFun'?", o: ["call myFun", "myFun()", "run myFun", "myFun"], a: 1 },
      { q: "Can functions return nothing?", o: ["Yes (None)", "No", "Error", "Must return 0"], a: 0 }
    ],
    questions_batch_2: [
      { q: "Default return value?", o: ["0", "False", "None", "Null"], a: 2 },
      { q: "Variables inside function are?", o: ["Global", "Local", "Static", "Public"], a: 1 },
      { q: "Keyword for global variable?", o: ["super", "global", "root", "all"], a: 1 },
      { q: "Can functions call other functions?", o: ["Yes", "No", "Only once", "Never"], a: 0 },
      { q: "Syntax for default argument?", o: ["def f(a=1)", "def f(a:1)", "def f(a==1)", "def f(a->1)"], a: 0 }
    ]
  },
  {
    id: "dictionaries",
    name: "5. Python Dictionaries",
    // Main: Mosh (6 mins)
    video_main: "https://www.youtube.com/embed/daefaLgNkw0",
    // Reteach: Telusko (10 mins)
    video_reteach: "https://www.youtube.com/embed/2IsF7DEtVjg",

    questions_batch_1: [
      { q: "Dictionaries store data as?", o: ["Key-Value", "Index-Value", "List", "Set"], a: 0 },
      { q: "Brackets used?", o: ["[]", "()", "{}", "<>"], a: 2 },
      { q: "Access value by?", o: ["Index", "Key", "Position", "Loop only"], a: 1 },
      { q: "Are keys unique?", o: ["Yes", "No", "Sometimes", "Not required"], a: 0 },
      { q: "Get list of keys?", o: ["dict.keys()", "dict.list()", "dict.get()", "dict.all()"], a: 0 }
    ],
    questions_batch_2: [
      { q: "Get value without error?", o: ["dict[key]", "dict.get(key)", "dict.fetch(key)", "dict.find(key)"], a: 1 },
      { q: "Remove a key?", o: ["delete", "remove", "pop", "kill"], a: 2 },
      { q: "Are dictionaries ordered?", o: ["Yes", "No", "Random", "Sorted"], a: 0 },
      { q: "Can a list be a key?", o: ["Yes", "No (Mutable)", "Sometimes", "If empty"], a: 1 },
      { q: "Add new item?", o: ["dict.add(k,v)", "dict[k] = v", "dict.push(k,v)", "dict.insert(k,v)"], a: 1 }
    ]
  }
];

const DB_TOPICS_JAVA = [
  {
    id: "variables",
    name: "1. Java Variables and Data Types",
    // FIXED: Main video link for Java Variables
    video_main: "https://www.youtube.com/embed/ra8b5_MvFik", 
    // FIXED: Reteach video link for Java Variables
    video_reteach: "https://www.youtube.com/embed/D-P4CbAfDK4", 
    
    questions_batch_1: [
      { q: "Keyword to declare a class in Java?", o: ["class", "struct", "new", "type"], a: 0 },
      { q: "What data type is used for a whole number in Java?", o: ["float", "String", "int", "boolean"], a: 2 },
      { q: "Which statement must end with a semicolon in Java?", o: ["class declaration", "if condition", "method signature", "variable assignment"], a: 3 },
      { q: "Which is the correct way to output text in Java?", o: ["System.out.print();", "Console.write();", "print();", "System.Console.Out();"], a: 0 },
      { q: "What is the entry point for a Java application?", o: ["main() function", "start() method", "public static void main(String[] args)", "run() method"], a: 2 }
    ],
    questions_batch_2: [
      { q: "Which is not a primitive data type in Java?", o: ["byte", "long", "String", "char"], a: 2 },
      { q: "What is the size of an `int` variable (typically)?", o: ["8 bits", "16 bits", "32 bits", "64 bits"], a: 2 },
      { q: "Which keyword prevents a variable from being modified?", o: ["static", "final", "abstract", "private"], a: 1 },
      { q: "The default value for a boolean variable in Java class members is:", o: ["true", "false", "0", "null"], a: 1 },
      { q: "What is the result of `5 / 2` using integer division?", o: ["2.5", "2", "3", "Error"], a: 1 }
    ]
  },
  {
    id: "conditionals",
    name: "2. Java Conditionals (If/Else)",
    // FIXED: Main video link for Java Conditionals
    video_main: "https://www.youtube.com/embed/74Q7POjS7mQ",
    // FIXED: Reteach video link for Java Conditionals
    video_reteach: "https://www.youtube.com/embed/fGeE6JFqNU8",

    questions_batch_1: [
      { q: "What is the keyword for 'else if' in Java?", o: ["elseif", "else if", "elif", "else-if"], a: 0 },
      { q: "Brackets used to group code blocks in Java?", o: ["()", "[]", "{}", "<>"], a: 2 },
      { q: "Operator for 'equal to' in Java?", o: ["=", "==", "===", "!="], a: 1 },
      { q: "Result of: `(5 > 3) && (10 < 2)`?", o: ["true", "false", "Error", "5"], a: 1 },
      { q: "Result of: `(3 == 3) || (1 == 0)`?", o: ["true", "false", "Error", "3"], a: 0 }
    ],
    questions_batch_2: [
      { q: "Which one is not a logical operator in Java?", o: ["&&", "||", "!", "+"], a: 3 },
      { q: "In a `switch` statement, which keyword is used to stop execution?", o: ["stop", "break", "continue", "exit"], a: 1 },
      { q: "A `boolean` expression must evaluate to:", o: ["true/false", "0/1", "null/void", "Yes/No"], a: 0 },
      { q: "What does the `instanceof` operator check?", o: ["Variable type", "Class inheritance", "Object creation", "String length"], a: 1 },
      { q: "Which comparison operator checks for inequality?", o: ["!=", "><", "==", "=!"], a: 0 }
    ]
  }
  // Add more Java topics here following the same structure
];