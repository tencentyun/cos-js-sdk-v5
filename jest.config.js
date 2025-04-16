module.exports = {
  collectCoverage: true,  // 是否显示覆盖率报告
  // 告诉 jest 哪些文件需要经过单元测试测试
  collectCoverageFrom: ['**/src/*.js'],
  coverageThreshold: {
    global: {
      statements: 80, // 保证每个语句都执行了
      functions: 70, // 保证每个函数都调用了
      branches: 70, // 保证每个 if 等分支代码都执行了
    },
  },
};