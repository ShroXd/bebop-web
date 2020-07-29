node {
    stage('Git Pull') {
        git 'https://github.com/ShroXd/bebop-web.git'
    }

    stage('Build Image') {
        try {
            sh 'docker stop novelweb'
            sh 'docker rm novelweb'
            sh 'docker rmi novelweb'
        }
        catch (exc) {
            echo '无需清理容器残余'
        }
        finally {
            sh 'docker build -t novelweb:latest .'
        }
    }

    stage('Deploy') {
        try {
          sh 'docker run -p 18080:8080 --name novelweb -d novelweb'
        }
        catch (exc) {
          echo '运行容器失败'
          sh 'docker stop novelweb'
          sh 'docker rm novelweb'
          sh 'docker run -p 18080:80 --name novelweb -d novelweb'
        }
    }

}
