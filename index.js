#!/usr/bin/env node

const ora = require('ora')
const figlet = require('figlet')
const chalk = require('chalk')
const inquirer = require('inquirer')

const ps = require('./config/ps')
const managers = require('./config/managers')
const folders = require('./config/folders')
const dependencies = require('./config/dependencies')

const env = require('./scaffold/env')
const gitignore = require('./scaffold/gitignore')
const prettierrc = require('./scaffold/prettierrc')
const eslintrc = require('./scaffold/eslintrc')
const jsconfig = require('./scaffold/jsConfig')
const jestConfig = require('./scaffold/jestConfig')
const babelConfig = require('./scaffold/babel.config')
const package = require('./scaffold/package')
const server = require('./scaffold/server')
const index = require('./scaffold/src/index')
const todoRoutes = require('./scaffold/src/routes/todo')
const todoModel = require('./scaffold/src/models/todo')
const todoController = require('./scaffold/src/controllers/todo')
const dbFile = require('./scaffold/src/config/db')
const envFile = require('./scaffold/src/config/env')
const todoTests = require('./scaffold/tests/routes/todo.test')

console.log(chalk.green(figlet.textSync('Generate')))
console.log(chalk.green(figlet.textSync('NodeJS app')))
console.log(chalk.yellow("\n---------------------------------------------------------"))
console.log(chalk.yellow("Created by Cobasi Labs - github.com/cobasilabs"))
console.log(chalk.yellow("---------------------------------------------------------\n"))
console.log(chalk.green(`This is a CLI to generate the scaffold (A.K.A boilerplate) 
of a NodeJS app using the latest versions of Express, Jest 
and other many commonly used tools to create NodeJS APIs. \n`))

inquirer
  .prompt([{
    type: 'input',
    name: 'appname',
    message: 'What is your app\'s name?',
    validate: value => {
      const letterNumber = /^[0-9a-zA-Z]+$/

      if (!value) {
        return 'The app name must be provided'
      } else if (value.includes(' ')) {
        return 'Your app\'s name cannot have spaces or special chars'
      }

      return true
    }
  },{
    type: 'list',
    name: 'manager',
    message: 'Which package manager do you use?',
    choices: managers.map(item => item.name)
  }])
  .then(async answers => {
    const spinner = ora('Creating your new awesome app (it might take a while)').start()
    
    try {
      const { appname, manager } = answers
      const newEnv = env.replace('{appname}', appname)
      const managerCmd = manager.toLowerCase()
      const managerAdd = managers.find(item => item.name === manager).addCmd
      const managerRun = managers.find(item => item.name === manager).runCmd

      package.name = appname
      await ps.mkdir(appname)

      for (const folder of folders) {
        await ps.mkdir(`${appname}/${folder}`)
      }

      await ps.execInFolder(appname, 'git init')
      await ps.writeFile(`${appname}/.env`, newEnv)
      await ps.writeFile(`${appname}/.env.sample`, newEnv)
      await ps.writeFile(`${appname}/.gitignore`, gitignore)
      await ps.writeFile(`${appname}/.prettierrc`, prettierrc)
      await ps.writeFile(`${appname}/.eslintrc`, eslintrc)
      await ps.writeFile(`${appname}/jsconfig.json`, jsconfig)
      await ps.writeFile(`${appname}/jest.config.js`, jestConfig)
      await ps.writeFile(`${appname}/babel.config.js`, babelConfig)
      await ps.writeFile(`${appname}/server.js`, server)
      await ps.writeFile(`${appname}/package.json`, JSON.stringify(package, null, 2))
      await ps.writeFile(`${appname}/src/index.js`, index)
      await ps.writeFile(`${appname}/src/routes/todo.js`, todoRoutes)
      await ps.writeFile(`${appname}/src/models/todo.js`, todoModel)
      await ps.writeFile(`${appname}/src/controllers/todo.js`, todoController)
      await ps.writeFile(`${appname}/src/config/db.js`, dbFile)
      await ps.writeFile(`${appname}/src/config/env.js`, envFile)
      await ps.writeFile(`${appname}/tests/routes/todo.test.js`, todoTests)
      
      for (const dep of dependencies) {
        await ps.execInFolder(appname, `${managerCmd} ${managerAdd} ${dep.name} ${dep.param}`)
      }

      await ps.execInFolder(appname, 'git add .')
      await ps.execInFolder(appname, 'git commit -m "Generate app initial structure"')

      spinner.stop()
        console.log(chalk.green("\nApp successfully generated!"))
        console.log(chalk.green(`Check the ${appname} folder to start working on your new project`))
        console.log(chalk.green('\nOn the folder you can use the following commands:'))
        console.log(chalk.green(`\n${managerCmd} ${managerRun}serve - To serve your application`))
        console.log(chalk.green(`${managerCmd} ${managerRun}debug - To serve with debugging and live reload`))
        console.log(chalk.green(`${managerCmd} ${managerRun}test - To run all the tests`))
        console.log(chalk.green(`${managerCmd} ${managerRun}lint - To lint your application`))
        console.log(chalk.green("\nAll the serve commands run the lint automatically"))
        console.log(chalk.green("\nHappy coding!"))
    } catch (error) {
      spinner.stop()
      console.log(chalk.red("\nOps, there was an error while creating your app:"))
      console.log(chalk.red(error))
    }
  })
