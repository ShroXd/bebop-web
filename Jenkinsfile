pipeline {
   agent any

   stages {
      stage('Git Pull') {
         steps {
            // Get some code from a GitHub repository
            git 'https://github.com/ShroXd/bebop-web.git'

         }
      }
      stage('Build') {
          steps {
              sh 'docker build -t novelweb:latest .'
          }
      }
      stage('Deploy') {
          steps {
              sh 'docker run -p 18080:8080 --name novelweb -d novelweb'
          }
      }
   }
}