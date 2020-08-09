pipeline {
  agent {
    node {
      label 'vps-master'
    }
  }

  triggers {
    pollSCM('*/2 * * * *')
  }

  stages {
    stage('Build docker image') {
      steps {
        sh 'docker-compose build cusg-client-web'
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
    CUSG_VERSION = getVer(env.BRANCH_NAME)
    CUSG_PORT = getPort(env.BRANCH_NAME)
    CUSG_QUASAR_CONF_FILE = getConfFile(env.BRANCH_NAME)
  }
}

def getVer(branch) {
  def ver = '1.0.0'
  return branch == 'release/dev' ? ver + '-dev' : ver
}

def getPort(branch) {
  return branch == 'release/dev' ? '8089': '9002'
}

def getConfFile(branch) {
  return branch == 'release/dev': 'quasar.conf.dev.js': 'quasar.conf.prod.js'
}
