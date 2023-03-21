<template>
  <div>
    <div v-if="cdn.loading || cdn.error" class="text-center pd16">
      <span v-if="cdn.loading">文档编辑器加载中...</span>
      <el-empty v-else-if="cdn.error" :image="cdn.errorImage">
        <template v-slot:description>
          文档编辑器加载出错了
          <a class="mgl6" @click="initialize">点击重试</a>
        </template>
      </el-empty>
    </div>
    <div ref="editor" class="markdown-editor"></div>
    <input
      ref="files"
      style="display: none"
      type="file"
      accept="image/*"
      @change="uploadFile"
    />
    <button id="upload-btn" style="display: none" class="custom-button" />
  </div>
</template>
<script>
/**
 * npm安装有问题 所见即所得不能使用 后面解决了再说
 */
/*
import Editor from 'tui-editor';
import 'tui-editor/dist/tui-editor.css'; // editor's ui
import 'tui-editor/dist/tui-editor-contents.css'; // editor's content
import 'codemirror/lib/codemirror.css'; // codemirror
import 'highlight.js/styles/github.css'; // code block highlight
*/
import imageUpload from "./image-upload.js";
import setting from "@/settings.js";
import { axios } from "@/utils/request.js";
import { certUpload } from "@/api/certificate.js";

export default {
  name: "TcMarkdownEditor",
  props: {
    action: String,
    name: String,
    value: String,
    height: {
      type: String,
      default: "400px",
    },
    // 工具栏
    toolbarItems: {
      type: Array,
      default: () => [
        "heading",
        "bold",
        "italic",
        "strike",
        "divider",
        "hr",
        "quote",
        "divider",
        "ul",
        "ol",
        "task",
        "indent",
        "outdent",
        "divider",
        "table",
        // "image",
        "link",
        "divider",
        "code",
        "codeblock",
      ],
    },
    // 要排除的工具栏
    excludeToolbarItems: {
      type: Array,
      default: () => [],
    },
    initialEditType: {
      // markdown|wysiwyg
      type: String,
      default: "wysiwyg",
    },
  },
  data() {
    return {
      editor: null,
      cdn: {
        src: "https://uicdn.toast.com/tui-editor/latest/tui-editor-Editor-full.min.js",
        links: [
          "https://uicdn.toast.com/tui-editor/latest/tui-editor.css",
          "https://uicdn.toast.com/tui-editor/latest/tui-editor-contents.css",
          "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.48.4/codemirror.css",
          "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/github.min.css",
        ],
        loading: false,
        error: false,
        errorImage: "Empty.PRESENTED_IMAGE_SIMPLE",
      },
    };
  },
  computed: {},
  methods: {
    /**
     * 因为npm的包有问题，使用cdn动态加载
     * 这个包也超级大2.45MB，这个方案能节约不少空间，
     */
    loadCdnTui() {
      return new Promise((resolve, reject) => {
        if (window.tui) {
          resolve(window.tui);
        } else {
          if (!window.tuiCdnLoadCallbacks) window.tuiCdnLoadCallbacks = [];
          window.tuiCdnLoadCallbacks.push({ resolve, reject });
          if (!window.tuiCdnLoad) {
            window.tuiCdnLoad = true;
            const script = document.createElement("SCRIPT");
            script.src = this.cdn.src;
            script.onload = () => {
              clearTimeout(window.tuiCdnLoadTimeout);
              setTimeout(() => {
                if (window.tui) {
                  for (const callback of window.tuiCdnLoadCallbacks || []) {
                    callback.resolve(window.tui);
                  }
                  delete window.tuiCdnLoadCallbacks;
                }
              }, 100);
            };
            document.body.appendChild(script);
            window.tuiCdnLoadTimeout = setTimeout(() => {
              if (window.tuiCdnLoadCallbacks) {
                for (const callback of window.tuiCdnLoadCallbacks) {
                  if (window.tui) {
                    callback.resolve(window.tui);
                  } else {
                    callback.reject(window.tui);
                  }
                }
                delete window.tuiCdnLoadCallbacks;
              }
              if (!window.tui) {
                window.tuiCdnLoad = false;
                document.body.removeChild(script);
              }
            }, 10000);
          }
          if (!window.tuiCdnLinksLoad) {
            window.tuiCdnLinksLoad = true;
            for (const href of this.cdn.links) {
              const link = document.createElement("LINK");
              link.rel = "stylesheet";
              link.href = href;
              document.body.appendChild(link);
            }
          }
        }
      });
    },
    setValue(value) {
      this.editor && this.editor.setValue(value || this.value);
    },
    getHtml() {
      return this.editor ? this.editor.getHtml() : "";
    },
    scrollTop(value) {
      return this.editor ? this.editor.scrollTop(value) : "";
    },
    initialize() {
      this.cdn.loading = true;
      this.cdn.error = false;
      this.loadCdnTui()
        .then((tui) => {
          if (this.$el) {
            this.editor = new tui.Editor({
              el: this.$refs.editor,
              initialEditType: this.initialEditType,
              previewStyle: "vertical",
              height: this.height,
              language: "zh_CN",
              /*hideModeSwitch: true,*/
              toolbarItems: this.toolbarItems.filter(
                (v) => !this.excludeToolbarItems.some((v1) => v1 === v)
              ),
              initialValue: this.value,
              events: {
                change: () => {
                  const markdown = this.editor.getMarkdown();
                  this.$emit("change", {
                    html: this.editor.getHtml(),
                    markdown,
                  });
                  this.$emit("input", markdown);
                },
              },
              hooks: {
                addImageBlobHook: (fileBlob, callback) => {
                  // upload(fileBlob).then((res) => {
                  //   console.log("setting.server.imageUrl + res.body.data.id");
                  //   callback("setting.server.imageUrl + res.body.data.id");
                  // });
                },
              },
            });

            //this.setValue()
            this.customBtn();
          }
        })
        .catch(() => {
          this.cdn.error = true;
        })
        .finally(() => {
          this.cdn.loading = false;
        });
    },
    customBtn() {
      // 获取编辑器上的功能条
      const toolbar = this.editor.getUI().getToolbar();
      // 这里获取到的是上面 input 节点（给input设置了ref="files"）
      const fileDom = this.$refs.files;
      // 添加事件
      this.editor.eventManager.addEventType("uploadEvent");
      this.editor.eventManager.listen("uploadEvent", () => {
        fileDom.click();
      });
      // 添加自定义按钮，第二个参数代表要添加的，不传默认放在最后
      toolbar.addButton(
        {
          name: "customize",
          className: "tui-image", // 这里直接用 tui-editor 自己的类名，相当于设置了图片的icon样式
          event: "uploadEvent",
          tooltip: "insert image", // hover 时的提示信息
          el: document.getElementById("upload-btn"), // 点击上传的按钮节点
        },
        13
      );
    },

    /***** 自定义上传图片处理 *****/
    async uploadFile(e) {
      const target = e.target;
      if (!target.files.length) return;
      const file = target.files[0];
      // 这里我们和 input 标签中 accept 属性设置的值保持一致，给它正则一下
      if (!/\image\//.test(file.type))
        return this.$message.error("文件类型错误");

      const formdata = new FormData();
      formdata.append("file", file);

      // 这是我们往服务器上传图片调接口
      const { data } = await axios({
        method: "post",
        url: setting.uploadUrl,
        data: formdata,
      })
        .then((res) => {
          //上传成功地址拼接
          // let imgUrl = "https://qiniu.****.com/" + res.data.key;
          this.addImgToMd(res.data);
          // console.log(res);
        })
        .catch((error) => {
          console.error(error.response);
        });
      // console.log(data);
      // 将返回来的 url 添加到 markdown 中
      this.addImgToMd(data);
      // 重置 input 中 file 的值
      target.value = "";
    },

    /***** 添加图片到 markdown *****/
    addImgToMd(data) {
      const editor = this.editor.getCodeMirror();
      const editorHtml = this.editor.getCurrentModeEditor();
      const isMarkdownMode = this.editor.isMarkdownMode();
      if (isMarkdownMode) {
        // 这里是markdown语法
        editor.replaceSelection(`![img](${data})`);
      } else {
        const range = editorHtml.getRange();
        const img = document.createElement("img");
        img.src = `${data}`;
        img.style = "width:100%;";
        img.width = "100%";
        img.alt = "img";
        range.insertNode(img);
      }
    },
  },
  mounted() {
    this.initialize();
  },

  beforeDestroy() {
    this.editor = null;
    delete this.editor;
  },
};
</script>
<style scoped lang="scss">
.markdown-editor {
  .tui-editor .te-md-splitter {
    width: 100%;
  }

  .CodeMirror pre.CodeMirror-line,
  #sfEditor .CodeMirror pre.CodeMirror-line-like {
    padding: 0 25px;
  }
}
</style>
