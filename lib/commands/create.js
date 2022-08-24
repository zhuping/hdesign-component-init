const ejs = require('ejs');
const path = require('path');
const chalk = require('chalk');
const { majo } = require('majo');
const inquirer = require('inquirer');
const prompts = require('./prompts');
const jetpack = require('fs-jetpack');
const upperCamelCase = require('uppercamelcase');
const glob = require('glob');

const stream = majo();
const CWD = process.cwd();
const COMPONENTS_PATH = path.resolve(CWD, './src/components');

function checkNoRepeat(answers) {
  if (!jetpack.exists(COMPONENTS_PATH)) {
    return Promise.reject(`组件库目录：${COMPONENTS_PATH} 不存在`);
  }

  return jetpack.listAsync(COMPONENTS_PATH).then((files) => {
    return Promise.all(
      files.map((file) =>
        checkFile(COMPONENTS_PATH, file, answers.componentName)
      )
    ).then(() => answers);
  });
}

/**
 * 组件重名检查
 * @param {*} dir
 * @param {*} file
 * @param {*} name
 * @returns
 */
function checkFile(dir, file, name) {
  const filePath = path.resolve(dir, `./${file}`);

  return jetpack.existsAsync(filePath).then((path) => {
    if (path === 'dir' && file === name) {
      return Promise.reject(
        `组件库中已经存在名为【${name}】的组件！请仔细核对后重新创建`
      );
    }
    return;
  });
}

/**
 * 组件创建
 * @param {*} answers
 */
function create(answers) {
  // 创建组件目录
  const outPath = path.resolve(COMPONENTS_PATH, answers.componentName);
  jetpack.dir(outPath);

  stream
    .source(['!.DS_Store'].concat(['**']), {
      baseDir: path.resolve(__dirname, `../templates/${answers.type}`),
    })
    .use(({ files }) => {
      let fileList = Object.keys(files);
      fileList.forEach((relativePath) => {
        const contents = files[relativePath].contents.toString();
        stream.writeContents(relativePath, ejs.render(contents, answers));
      });
    })
    .dest(outPath)
    .then(() => {
      return renameComponent(answers, outPath);
    })
    .then(() => {
      console.log(chalk.green(`组件【${answers.componentName}】创建成功`));
    })
    .catch((err) => {
      return Promise.reject(`组件【${answers.componentName}】创建失败：${err}`);
    });
}

/**
 * 重命名模板组件名称
 * @param {*} answers
 * @param {*} dir
 * @returns
 */
function renameComponent(answers, dir) {
  const files = glob.sync(`${dir}/**/*.*`);

  return Promise.all(
    files.map((file) => {
      if (!!~file.indexOf('name')) {
        const newName = path
          .basename(file)
          .replace(/name/g, answers.componentName);
        return jetpack.renameAsync(file, newName);
      }
    })
  );
}

module.exports = async (type) => {
  inquirer.prompt(prompts).then((opts) => {
    opts = Object.assign(opts, {
      type,
      componentNameUpper: upperCamelCase(opts.componentName),
    });

    Promise.resolve(opts)
      .then(checkNoRepeat)
      .then(create)
      .catch((err) => {
        console.log(chalk.red(err));
      });
  });
};
