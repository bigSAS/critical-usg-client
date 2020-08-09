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

def DEV_PORT = '8090'
def PRD_PORT = '9002'
def VERSION = '1.0.0'
def DEV_CONF = 'quasar.conf.dev.js'
def PRD_CONF = 'quasar.conf.prod.js'

def getVer(branch) {
  return branch == 'release/dev' ? VERSION + '-dev' : VERSION
}

def getPort(branch) {
  return branch == 'release/dev' ? DEV_PORT: PRD_PORT
}

def getConfFile(branch) {
  return branch == 'release/dev' ? DEV_CONF: PRD_CONF
}
