
var CsvFile = 'cypress/downloads/ChurnUserInitiation.csv'
var JSONFile = 'cypress/fixtures/churnData/ChurnUserInitiation.json'

//----------------Imports---------------------------------------------------------------------

Cypress.Commands.add('csvToJSON', (CsvFile, JSONFile) => {
    let result = [];
    cy.readFile(CsvFile)
    .then((data) => {
     var lines = data.split("\n")
     var headers = lines[0].split(",")     
     for(var i=0;i<lines.length;i++){
      var obj = {};
      var currentline=lines[i].split(",");
     
      //cy.get(currentline[0]).trim(',,,,')
        for(var j=0;j<headers.length;j++){
            obj[headers[j]] = '';                       
        }
        
       cy.log(obj)

      }
      cy.writeFile(JSONFile, obj)
      
  })
    })

  Cypress.Commands.add('jsonToCSV', (JSONFile, CsvFile)=>{
        cy.readFile(JSONFile).then((data)=>{
                //var json = data
              var fields =  Object.keys(data)
              var values = Object.values(data)
              var csv1 = fields.map(function() {})
              csv1.unshift(fields.join(','))   // add header column
              let str1 = csv1;
              let sl2 = str1.slice(0, 1)        
              var csv = values.map(function() {})
              csv.unshift(values.join(',')) // add header column
              let str2 = csv;
              let sl3 = str2.slice(0, 1)
                cy.writeFile(CsvFile, sl2 + '\n' + sl3)
        
            })
        
    })
