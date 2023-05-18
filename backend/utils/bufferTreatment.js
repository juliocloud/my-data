const fs = require('fs');

function getJsonFromAnalyzer(data){
    const bufferArray = data.toJSON().data;

    //98 is the ASCII code for the letter b (the data object starts with the letter b)
    const arrayFirstIndex = bufferArray.indexOf(98);
    
    //39 is index of single comma (last index of the json we want)
    const arrayLastIndex = bufferArray.lastIndexOf(39)
    
    const dataArray = bufferArray.slice(arrayFirstIndex + 2, arrayLastIndex);
    const stringFromBuffer = String.fromCharCode.apply(null, dataArray);
    const jsonFromString = JSON.parse(stringFromBuffer);

    console.log('jsonfromstring <<')
    console.log(jsonFromString)
    return jsonFromString;
}

function addAnotherJsonInput(filePath, json){
    fs.readFile(filePath, 'utf8', function (err, data) {
        if (err) {
          return console.log(err);
        }
        let objectWithBracketsRemoved = data.replace(']', ',');
        console.log("1. Reading")

        fs.writeFile(filePath, objectWithBracketsRemoved, 'utf8', function (err) {
          console.log("2. Exchanging")
          if (err) return console.log(err);
          fs.appendFile(filePath, `${json}]\n`, function (err) {
            if (err) {
              return console.log(err);
            }else{
                console.log("3. New info");
                return true
            }
          });
        });
      });
}


module.exports ={
    getJsonFromAnalyzer,
    addAnotherJsonInput
}