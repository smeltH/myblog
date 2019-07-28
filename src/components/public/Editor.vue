<template>
    <froala :config="config"></froala>
</template>

<script>
    export default {
      name: "Editor",
      data() {
          return {
            editor:null,
            config:{
              zIndex: 2501,
              height: "310",
              toolbarSticky: false,
              autofocus: true,
              toolbarButtons: [
                "fullscreen",
                "bold",
                "italic",
                "underline",
                "strikeThrough",
                "subscript",
                "superscript",
                "|",
                "fontFamily",
                "fontSize",
                "color",
                "inlineClass",
                "inlineStyle",
                "paragraphStyle",
                "lineHeight",
                "|",
                "paragraphFormat",
                "align",
                "formatOL",
                "formatUL",
                "outdent",
                "indent",
                "quote", 
                "-",
                "insertLink",
                "insertImage",
                "insertVideo",
                "embedly",
                "insertFile",
                "insertTable",
                "|",
                "emoticons",
                "fontAwesome",
                "specialCharacters",
                "insertHR",
                "selectAll",
                "clearFormatting",
                "|",
                "print",
                "getPDF",
                "spellChecker",
                "help",
                "html",
                "|",
                "undo",
                "redo"
              ],
              placeholder: '请填写内容',
              language: "zh_cn",
              imageDefaultWidth: 500, 
              // imageUploadURL: "xxxxxxxx",
              // videoUploadURL: "xxxxxxx",
              // fileUploadURL: "xxxxxxx",
              // imageManagerLoadURL:"xxxxxx",
              requestHeaders: {
                Authorization: localStorage.eleToken
              },
              events: { 
                "froalaEditor.initialized": (e, editor) => {
                  this.editor = editor;
                },
                "froalaEditor.contentChanged": (e, editor) => {
                  this.$emit("on-change", editor.html.get(true));
                },
              }
            }
          }
      },
      methods: {
        setHtml(html) {
          if (this.editor) {
            this.editor.html.set(html)
          }
        }
      }
    }
</script>

<style scoped lang="less">

</style>
