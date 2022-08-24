const gitconfig = require('gitconfig');

async function getUserInfo() {
  const config = await gitconfig.get();
  const { name, email } = config.user;
  return `${name}<${email}>`;
}

module.exports = [
  {
    name: 'componentName',
    type: 'input',
    message: '请输入要创建的组件名称(kebab-case):',
    validate: function(str) {
      return /^[a-z][a-z|-]*[a-z]$/.test(str);
    }
  },
  {
    name: 'componentCnName',
    type: 'input',
    message: '请输入要创建的组件中文名称(中文):',
    validate: function(str) {
      return /[^\x00-\xff]$/.test(str);
    }
  },
  {
    name: 'componentType',
    type: 'list',
    message: '组件类型',
    choices: [
      {
        name: '基础组件',
        value: 'basic',
      },
      {
        name: '布局组件',
        value: 'layout',
      },
      {
        name: '导航组件',
        value: 'navigation',
      },
      {
        name: '信息展示',
        value: 'dataDisplay',
      },
      {
        name: '信息导入',
        value: 'dataEntry',
      },
      {
        name: '操作反馈',
        value: 'feedback',
      }
    ]
  },
  {
    type: 'input',
    name: 'author',
    message: '作者',
    default: async () => {
      return await getUserInfo();
    }
  }
];