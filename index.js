var nlp = require('compromise');

var subject = (function () {

	function extract(title){
	   
	   var topic;

	   if (getPlaces(title).length > 0){
	   	topic = getPlaces(title)[0];
	   	return topic
	   } 

	   if (getNames(title).length > 0) {
	   	topic = getNames(title)[0];
	   	return topic;
	   } 

	   if (getTopics(title).length > 0) {
	   	topic = getTopics(title)[0];
	   	return topic;
	   } 


	   if (getDates(title).length > 0) {
	   	topic = getDates(title)[0];
	   	return topic;
	   } 

	   if (getNouns(title).length > 0) {
	   	topic = getNouns(title)[0];
	   	return topic;
	   } 

	   if (getTopicsTheHardWay(title).length > 0) {
	   	topic = getTopicsTheHardWay(title)[0];
	   	return topic;
	   } 

	   if (getPeople(title).length > 0) {
	   	topic = getPeople(title)[0];
	   	return topic;
	   }

	   
	}


	function extractAll(title){
	   
	   var topics = [];

	   if (getPlaces(title).length > 0){
	   	topic = getPlaces(title)[0];
	   	topics.push(topic)
	   } 

	   if (getNames(title).length > 0) {
	   	topic = getNames(title)[0];
	   	topics.push(topic)
	   } 

	   if (getTopics(title).length > 0) {
	   	topic = getTopics(title)[0];
	   	topics.push(topic)
	   } 


	   if (getDates(title).length > 0) {
	   	topic = getDates(title)[0];
	   	topics.push(topic)
	   } 

	   if (getNouns(title).length > 0) {
	   	topic = getNouns(title)[0];
	   	topics.push(topic)
	   } 

	   if (getTopicsTheHardWay(title).length > 0) {
	   	topic = getTopicsTheHardWay(title)[0];
	   	topics.push(topic)
	   } 

	   if (getPeople(title).length > 0) {
	   	topic = getPeople(title)[0];
	   	topics.push(topic)
	   }

	   return topics;
	}


	function getPlaces(title){

		var places;
		var theplaces = []
		places = nlp(title).places().out('array');
	    //console.log("The places are "+places.length)
		if(places.length > 0)
		{
			for(var j = 0; j < places.length; j++){
				var place = (changeToUpperCase(dePossesivise(places[j])))
				theplaces.push(place)
			}

		}

		return theplaces;
	}

	function getTopics(title){
		var topics;
		var thetopics = [];
		topics = nlp(title).topics().out('array')

		if(topics.length > 0){
			for(let j = 0; j < topics.length; j++){
				var topic = ( dePossesivise(topics[j]))
				thetopics.push(topic)
			}
		}

		return thetopics;
	}

	function getNames(title){

		var fnames;
		var lnames;
		var names = [];

		fnames = nlp(title).people().firstNames().out('array');
		lnames = nlp(title).people().lastNames().out('array');
		
		if(fnames.length > 0){

			lnames = nlp(title).people().lastNames().out('array');
			//console.log("lil "+lnames)
			if(lnames.length > 0){

				if(fnames.length == lnames.length){
					for(var i = 0; i < fnames.length; i++){
						names.push(changeToTitleCase(dePossesivise(fnames[i])+" "+dePossesivise(lnames[i])));
						//console.log(names.length);
					}

				} else {

					if(lnames.length > 0){
						for(var j = 0; j < lnames.length; j++){
							names.push(lnames[j])
						}
						names.push(lnames[0])
					} else if(fnames.length > 0){
						for(k < 0; k < fnames.length; k++){
							names.push(fnames[k])
						}
					}
				}

			}
			

		}

		return names;
	}

	function getPeople(title){
		var people;
		var persons = [];
		people = nlp(title).people().out('array')
		//console.log("People ["+people+"]")
		if(people.length > 0)
		{
			for(let j = 0; j < people.length; j++){

					var person = dePossesivise((people[j]));
					persons.push(person);
			}

		}

		return persons;
	}

	function getDates(title){
		var dates;
		var thedates = []
		dates = nlp(title).dates().out('array')
		if(dates.length > 0)
		{
			for(let j = 0; j < dates.length; j++){
				var thedate = dates[j];
				thedates.push(thedate)
			}
		}

		return thedates;
	}

	function getNouns(title){
		var nouns;
		var thenouns = []
		nouns = nlp(title).nouns().out('array')
							
		if(nouns.length > 0)
		{
			for(let j = 0; j < nouns.length; j++){

					var noun = dePossesivise(changeToTitleCase(nouns[j]));

				
					if(WordCount(noun) < 4){

						//check for acronyms
						//console.log(nlp(noun,).acronyms().out('text'))
						var narray = noun.split(" ");

						for(var p = 0; p < narray.length; p++){

							if(narray[p].length < 4){
								//var t = 
								narray[p] = changeToUpperCase(narray[p])
								

							} else {

								narray[p] = narray[p];

							}

							//thenouns.push(narray.toString().replace(",", " "))
						}

						thenouns.push(narray.toString().replace(",", " "))
						
						

					} else {

						
					}							
				
			}
		}

		return thenouns;
	}


	function getTopicsTheHardWay(title){
		var topics;
		var thetopics = [];

		var words = title.split(" ");
		if(words.length > 0){
			for(var x = 0; x < words.length; x++){
				var word = words[x]
				if(word.charAt(0) == word.charAt(0).toUpperCase()){
					thetopics.push(word)
				}
			}
		}

		return thetopics;
	}


	function changeToTitleCase(str) {
	    return str.replace(/\w\S*/g, function(txt){
	        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	    });
	}

	function changeToNounCase(str){
		return str.charAt(0).toUpperCase() + str.substr(1); //.toLowerCase();
	}

	function changeToUpperCase(str){
		return str.toUpperCase();
	}

	function WordCount(str) { 
	  return str.split(" ").length;
	}

	function dePossesivise(str){
	  if(str.includes("'")){
	  	return str = str.replace(/'s/g, '');
	  } else {
	    return str
	  }
	}

return {
        extract : extract,
        extractAll : extractAll
       };
})();

module.exports = subject;