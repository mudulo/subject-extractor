# subject-extractor
This node package extracts the main topic/subject or topics given a string or sentence, that simple!
The program also tries to do simple formatting like capitalization of names (first characters) and places.

# Installation
```npm install subject-extractor```

# Usage 
## extract
Returns a string, denoting the best topic or subject given a string or sentence
```javascript
var subject = require("subject-extractor")

//names
console.log(subject.extract("My name is jose Mourinho"));
> "Jose Mourinho"

//places
console.log(subject.extract("California is better than New York"))
> "CALIFORNIA"
```

## extractAll
Returns an array of topics or subjects from a given string or sentence
```javascript
var subject = require("subject-extractor")

//news article title
console.log(subject.extractAll("Password sharing could be a good thing for Netflix and Hulu"));
> "[ 'netflix', 'Password Sharing', 'Password' ]"
```