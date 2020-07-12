pipeline {
  agent {
    node {
      label 'vps-master'
    }
  }

  triggers {
    pollSCM('*/5 * * * *')
  }

  stages {
    stage('Build docker image') {
      steps {
        sh 'docker build -t $image_name .'
      }
    }

    stage('Stop + delete container') {
      steps {
        sh 'docker stop $container_name || true'
        sh 'docker rm $container_name || true'
      }
    }

    stage('Run app') {
      steps {
        sh '''docker run -d --name $container_name  \\
-p $expose_on_port:80 \\
$image_name'''
      }
    }

  }
  environment {
    image_name = 'cusg-client-web-dev:latest'
    expose_on_port = '8089'
    container_name = 'cusg-client-web-dev'
  }
}
