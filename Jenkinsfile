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
        sh "docker-compose build --build-arg CUSG_CONF_FILE=quasar.conf.${CUSG_ENV}.js --build-arg APP_DIR=${CUSG_APP_DIR}"
      }
    }

    stage('Stop service') {
      steps {
        sh 'docker-compose down'
      }
    }

    stage('Run service') {
      steps {
        sh 'docker-compose up -d  --force-recreate'
      }
    }

  }
  environment {
    CUSG_VERSION = getVer(env.BRANCH_NAME)
    CUSG_PORT = getPort(env.BRANCH_NAME)
    CUSG_QUASAR_CONF_FILE = getConfFile(env.BRANCH_NAME)
    CUSG_ENV = getEnv(env.BRANCH_NAME)
    CUSG_APP_DIR = getAppDir(env.BRANCH_NAME)
  }
}

def devPort() { '9002' }
def prdPort() { '9002' }
def version() { '1.0.0' }
def devConf() { 'quasar.conf.dev.js' }
def prdConf() { 'quasar.conf.prod.js' }

def getEnv(branch) {
  return branch == 'release/prod' ? 'prod': 'dev'
}

def getAppDir(branch) {
  return branch == 'release/prod' ? '/': '/'
}

def getVer(branch) {
  return version()
}

def getPort(branch) {
  return branch == 'release/dev' ? devPort() : prdPort()
}

def getConfFile(branch) {
  return branch == 'release/dev' ? devConf() : prdConf()
}
