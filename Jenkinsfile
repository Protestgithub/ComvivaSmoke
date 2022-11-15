pipeline {
    //The agent section specifies where the entire Pipeline, or a specific stage, 
    //will execute in the Jenkins environment depending on where the agent section is placed.
    agent any
    
    
    //The parameters directive provides a list of parameters that a user should provide when triggering the Pipeline.
    //The values for these user-specified parameters are made available to Pipeline steps via the params object, see
    //the Parameters, Declarative Pipeline for its specific usage.
    parameters {
        string(name: 'SPEC', defaultValue: 'cypress/integration/BDD/**/*.feature', description: 'Ej: cypress/integration/BDD/*.feature')
        choice(name: 'BROWSER', choices: ['chrome', 'edge', 'firefox'], description: 'Pick the web browser you want to use to run your scripts')
    
    }
    
   

    //The stage directive goes in the stages section and should contain a steps section, an optional agent section, 
    //or other stage-specific directives. Practically speaking, all of the real work done by a Pipeline will be wrapped
    //in one or more stage directives.
    stages {
        
        stage('Build'){
            //The steps section defines a series of one or more steps to be executed in a given stage directive.
            steps {
                echo "Building the application"
            }
        }
        stage('Prerequisites'){
            steps{
                
                 bat "npm install cypress@10.6.0"
               bat "npm install -D @badeball/cypress-cucumber-preprocessor"
                bat  "npm i -D cypress-wait-until"
                bat "npm run cy:parallel --env Adminurl=http://125.16.139.20:8023 ,apiBaseURL=http://172.25.48.237:3133 --browser ${BROWSER} --spec ${SPEC}  "
            }
        }
        stage('Testing') {
            steps{
                bat "npm run cy:parallel --env Adminurl=http://125.16.139.20:8023 ,apiBaseURL=http://172.25.48.237:3133 --browser ${BROWSER} --spec ${SPEC}  "
          
                bat "npm run cy:parallel --env Adminurl=http://125.16.139.20:8023 ,apiBaseURL=http://172.25.48.237:3133 --browser ${BROWSER} --spec ${SPEC}  "
            }
        
       }
        
        stage('Deploy'){
            steps {
                echo "Deploying"
            }
        }
    }

    post {
        always {
            //The script step takes a block of Scripted Pipeline and executes that in the Declarative Pipeline. 
            //For most use-cases, the script step should be unnecessary in Declarative Pipelines, but it can provide
            //a useful "escape hatch." script blocks of non-trivial size and/or complexity should be moved into Shared Libraries instead.
         
            publishHTML([allowMissing: false, alwaysLinkToLastBuild: false, keepAll: true, reportDir: 'reports', reportFiles: 'index.html', reportName: 'HTML Report', reportTitles: ''])           // deleteDir()
              bat "node cucumber-html-report.js"
        }
    }
}
Footer
