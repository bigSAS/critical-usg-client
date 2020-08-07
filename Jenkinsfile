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
        sh 'docker-compose build cusg-client-web --build-arg CUSG_QUASAR_CONF_FILE=${CUSG_QUASAR_CONF_FILE}'
      }
    }

    stage('Stop service') {
      steps {
        sh 'docker-compose down'
      }
    }

    stage('Run service') {
      steps {
        sh 'docker-compose up -d'
      }
    }

  }
  environment {
    CUSG_VERSION = '1.0.0'
    CUSG_PORT = '8089'
    CUSG_QUASAR_CONF_FILE = 'quasar.conf.prod.js'
  }
}
