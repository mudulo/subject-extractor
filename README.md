# subject-extractor
This node package extracts the main topic or subject given a string or sentence, that simple!
Also does simple formatting like capitalization of names (first characters) and places.

# Installation
```npm install subject-extractor```

# Usage
```javascript
var subject = require("subject-extractor")

console.log(subject.extract("My name is Duncan"))
> "duncan"

console.log(subject.extract("California is better than New York"))
> "CALIFORNIA"
```