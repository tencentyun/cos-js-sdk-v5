import * as common from './common.js';
import * as taskAndWorkflow from './taskAndWorkflow.js';
import * as picProcess from './picProcess.js';
import * as ai from './ai.js';
import * as mediaProcess from './mediaProcess.js';
import * as docPreview from './docPreview.js';
import * as audit from './audit.js';
import * as fileProcess from './fileProcess.js';
import * as asr from './asr.js';
import * as meta from './meta.js';

// 函数集合
const moduleFn = {};
// html排版
const contentMap = {
  common: {
    title: 'Common',
    functions: [],
  },
  taskAndWorkflow: {
    title: '任务和工作流',
    functions: [],
  },
  picProcess: {
    title: '图片处理',
    functions: [],
  },
  ai: {
    title: 'AI识别',
    functions: [],
  },
  mediaProcess: {
    title: '媒体处理',
    functions: [],
  },
  docPreview: {
    title: '文档预览',
    functions: [],
  },
  audit: {
    title: '内容审核',
    functions: [],
  },
  fileProcess: {
    title: '文件处理',
    functions: [],
  },
  asr: {
    title: '智能语音',
    functions: [],
  },
  // meta: {
  //   title: '元数据',
  //   functions: [],
  // },
};

function setContent(fnName, module, moduleName) {
  const { name, fn } = module[fnName];
  moduleFn[fnName] = module[fnName].fn;
  contentMap[moduleName].functions.push({ name, fnName });
}
for (let fnName in common) {
  setContent(fnName, common, 'common');
}
for (let fnName in taskAndWorkflow) {
  setContent(fnName, taskAndWorkflow, 'taskAndWorkflow');
}
for (let fnName in picProcess) {
  setContent(fnName, picProcess, 'picProcess');
}
for (let fnName in ai) {
  setContent(fnName, ai, 'ai');
}
for (let fnName in mediaProcess) {
  setContent(fnName, mediaProcess, 'mediaProcess');
}
for (let fnName in docPreview) {
  setContent(fnName, docPreview, 'docPreview');
}
for (let fnName in audit) {
  setContent(fnName, audit, 'audit');
}
for (let fnName in fileProcess) {
  setContent(fnName, fileProcess, 'fileProcess');
}
for (let fnName in asr) {
  setContent(fnName, asr, 'asr');
}
// for (let fnName in meta) {
//   setContent(fnName, meta, 'meta');
// }

(function () {
  const container = document.querySelector('.ci-main');
  const html = [];
  // 渲染html
  for (let i in contentMap) {
    const module = contentMap[i];
    const content = `<div class="module-item"><h4>${module.title}</h4>`;
    let a = '';
    if (module.functions && module.functions.length > 0) {
      a += module.functions
        .map((item) => {
          return `<a href="javascript:void(0)" data-method="${item.fnName}">${item.fnName}(${item.name})</a>`;
        })
        .join('');
    }
    html.push(content, a, '</div>');
  }
  container.innerHTML = html.join('');
  container.onclick = function (e) {
    if (e.target.tagName === 'A') {
      const name = e.target.getAttribute('data-method').trim();
      moduleFn[name]();
    }
  };

  // 设置结果面板跟随窗口自适应高
  const mainPanel = document.querySelector('.ci-main');
  const resultPanel = document.querySelector('.result');
  resultPanel.style.height = getPanelHeight();
  window.onresize = function (e) {
    resultPanel.style.height = getPanelHeight();
  };

  function getPanelHeight() {
    return mainPanel.getBoundingClientRect().height - 80 + 'px';
  }
})();
