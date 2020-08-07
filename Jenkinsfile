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
        sh 'docker-compose build cusg-client-web'
      }
    }

    stage('Stop service') {
      steps {
        sh 'docker-compose up'
      }
    }

    stage('Run service') {
      steps {
        sh 'docker-compose up'
      }
    }

  }
  environment {
    CUSG_VERSION = '1.0.0'
    CUSG_PORT = '8089'
    CUSG_BACKEND_URL = 'https://sas-kodzi.pl/cusg-server/api/'
    CUSG_PUBLIC_PATH = 'https://sas-kodzi.pl/cusg'
  }
}
