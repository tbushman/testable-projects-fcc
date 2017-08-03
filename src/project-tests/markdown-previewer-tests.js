export default function createMarkdownPreviewerTests() {

  describe('Markdown Previewer tests', function() {
    //var app = require(document.getElementById('thisapp').innerHTML)
    //console.log(app)
    //const Vue = require('vue'); 
    var component, editor, preview, converter;
    let markdownOnLoad,
      previewOnLoad, mounted;
    /*if (!component) {
      component = require('../../local_test/js/inline.js')
    }*/
    if (app && app._isVue) {
      //console.log(component)
      // register
      /*var component_editor = Vue.component('fcc_app', Vue.extend({
        template: '#fcc_app'//document.getElementById('fcc_app').innerHTML
      }));
      
      mounted = new Vue(component_editor).$mount();
      */
      var comptemp = {
        template: document.getElementById('app').innerHTML
      }
      mounted = new Vue({
        /*components: {
          'my-component': comptemp
        }*/
      }).$mount('#app');
      editor = mounted.$el.querySelector('#editor');
      preview = mounted.$el.querySelector('#preview');
    } else {
      editor = document.getElementById('editor');
      preview = document.getElementById('preview');
    }

    function currentValue(comp, callback){
      var comp = comp
      //Vue.nextTick(comp)
      Vue.nextTick(function(){
        callback(comp.$el)
      });
    }
    function triggerChange(str, callback) {
      // REACT
      //editor.value = str;
      //var comp = new component().$mount();
      /*var comp = new Vue({
        el: '#thisapp',
        name: 'my-component',
        data: function(){
          return {
            editorContent: str
          }
        }
      }).$mount()*/
      /*var component_editor = Vue.component('fcc_app', Vue.extend({
        template: '#fcc_app'//document.getElementById('fcc_app').innerHTML
      }));
      
      var comp = new Vue(component_editor).$mount();*/
      var comptemp = {
        template: document.getElementById('app').innerHTML
      }
      var comp = new Vue({
        
      }).$mount('#app');
      comp.editorContent = str;
      editor = comp.$el.querySelector('#editor');
      preview = comp.$el.querySelector('#preview');
      //Vue.nextTick(comp)
      /*Vue.nextTick(function(){
        callback(comp.$el)
      });*/
      callback()
    }
    if (editor)
      markdownOnLoad = editor.value;
    if (preview)
      previewOnLoad = preview.innerHTML;
    
    

    describe('#Tests', function() {

      it('1. I can see a <textarea> element with corresponding id="editor"', function() {
        FCC_Global.assert.isNotNull(editor, '#editor is not defined ');
        FCC_Global.assert.strictEqual(editor.nodeName, 'TEXTAREA', '#editor should be a <textarea> element ');
      });

      it('2. I can see an element with corresponding id="preview"', function() {
        FCC_Global.assert.isNotNull(preview, '#preview is not defined ');
      });

      it('3. When I enter text into the #editor element, the #preview element is updated as I type to display the content of the textarea', function() {
        triggerChange('a', function(file){
          Vue.nextTick(function(){
            console.log(preview.innerText.slice(0, 1))
            FCC_Global.assert.strictEqual(preview.innerText.slice(0, 1), 'a', '#preview is not being updated as I type into #editor (should update on every keyup) ');
          })
          
        });
      });

      it('4. When I enter GitHub flavored markdown into the #editor element, the text is rendered as HTML to #preview as I type (Hint: You don\'t need to parse Markdown yourself - you can import the Marked library for this: https://cdnjs.com/libraries/marked)', function(done) {
        const error = 'The markdown in #editor is not being interpreted  correctly and/or rendered into #preview ';
        var comp = new Vue({}).$mount('#app');
        editor = comp.$el.querySelector('#editor')
        /*var f = currentValue(editor, function(f){
          return f;
        })*/
        //console.log(f)
        var files = [
          {key: '', expected: '', errorMsg: '#preview\'s only children should be those rendered by marked.js '},
          {key: 'testing', expected: '<p>testing</p>\n', errorMsg: error},
          {key: editor.value + ' and...', expected: '<p>testing and...</p>\n', errorMsg: error}
//          {key:}
        ];
        for (var i = 0; i < files.length; i++) {
          //var files = ['', 'testing', f.editor.value + ' and...', '# h1 \n# h2', '**bold**']
          triggerChange(files[i].key, function(){
            Vue.nextTick(function(){
              console.log(editor.innerHTML)
              FCC_Global.assert.strictEqual(editor.innerHTML, files[i].expected, files[i].errorMsg);          
            })
          })

        }
        done()
        /*triggerChange('', function(file){
          console.log('4a :'+file)
          FCC_Global.assert.strictEqual(file.querySelector('#preview').innerHTML, '', '#preview\'s only children should be those rendered by marked.js ');          
        });
        triggerChange('testing', function(file){
          console.log('4b :'+file)
          FCC_Global.assert.strictEqual(file.querySelector('#preview').innerHTML, '<p>testing</p>\n', error);          
        });
        triggerChange(editor.value + ' and...', function(file){
          console.log('4c :'+file)
          FCC_Global.assert.strictEqual(file.querySelector('#preview').innerHTML, '<p>testing and...</p>\n', error);          
        });
        triggerChange('# h1 \n## h2', function(file){
          console.log('4d :'+file)
          FCC_Global.assert.strictEqual(file.querySelector('#preview').innerHTML, '<h1 id="h1">h1</h1>\n<h2 id="h2">h2</h2>\n', error);
        });
        triggerChange('**bold**', function(file){
          console.log('4e :'+file)
          FCC_Global.assert.strictEqual(file.querySelector('#preview').innerHTML, '<p><strong>bold</strong></p>\n', error);
        });*/
      });

      it('5. When my markdown previewer first loads, the #editor field should contain valid default markdown that provides a brief description of the project and demonstrates the previewer\'s capabilities', function() {
        FCC_Global.assert.notStrictEqual(markdownOnLoad, undefined);
        FCC_Global.assert.notStrictEqual(markdownOnLoad, '', '#editor should contain some text ');
      });

      it('6. When my markdown previewer first loads, the default text in the #editor field should contain valid markdown that represents at least one of each of the following elements: a header (H1 size), a sub header (H2 size), a link, inline code, a code block, a list item, a blockquote, an image, and bolded text', function() {
        triggerChange(markdownOnLoad, function(file){
          console.log('6 :'+file)

          const markdown = file.querySelector('#editor').value;

          FCC_Global.assert.notStrictEqual(markdown.search(/#\s.+/), -1, 'write some markdown representing an <h1> '); // h1
          FCC_Global.assert.notStrictEqual(markdown.search(/##\s.+/), -1, 'write some markdown representing an <h2> '); // h2
          FCC_Global.assert.notStrictEqual(markdown.search(/\[.+\]\(.+\..+\)/), -1, 'write some markdown representing an <a> '); // link
          FCC_Global.assert.notStrictEqual(markdown.search(/`.+`/), -1, 'write some markdown representing inline <code> '); // inline code
          FCC_Global.assert.notStrictEqual(markdown.search(/```[^]+```/), -1, 'write some markdown representing a codeblock, i.e. <pre><code>...</code></pre> '); // codeblock
          FCC_Global.assert.notStrictEqual(markdown.search(/(?:-|\d\.)\s[^|\s-*].+/), -1, 'write some markdown representing an <li> item '); // ol or ul list item
          FCC_Global.assert.notStrictEqual(markdown.search(/>\s.+/), -1, 'write some markdown representing a <blockquote> '); // blockquote
          FCC_Global.assert.notStrictEqual(markdown.search(/!\[.*\]\(.+\..+\)/), -1, 'write some markdown representing an <image> '); // image
          FCC_Global.assert.notStrictEqual(markdown.search(/(\*\*|__).+\1/), -1, 'write some markdown representing <strong> text '); // bold text
        });
      });

      it('7. When my markdown previewer first loads, the default markdown in the #editor field should be rendered as HTML in the #preview element', function() {
        triggerChange(markdownOnLoad, function(file){
          console.log('7 :'+file)
          FCC_Global.assert.notStrictEqual(file.querySelector('#preview').innerHTML, '', '#preview should have inner HTML ');
          FCC_Global.assert.strictEqual(file.querySelector('#preview').innerHTML, previewOnLoad, '#editor\'s  markdown does not render correctly on window load ');
          const markdown = file.querySelector('#editor').value;
          // this could be significantly shortened into one test, however feedback would not be specific
          FCC_Global.assert.isAtLeast(document.querySelectorAll('#preview h1').length, 1, '#preview does not contain at least one <h1> ');
          FCC_Global.assert.isAtLeast(document.querySelectorAll('#preview h2').length, 1, '#preview does not contain at least one <h2> ');
          FCC_Global.assert.isAtLeast(document.querySelectorAll('#preview a').length, 1, '#preview does not contain at least one <a> ');
          FCC_Global.assert.isAtLeast(document.querySelectorAll('#preview code').length, 1, '#preview does not contain at least one <code> ');
          FCC_Global.assert.isAtLeast(document.querySelectorAll('#preview pre').length, 1, '#preview does not contain at least one <pre> ');
          FCC_Global.assert.isAtLeast(document.querySelectorAll('#preview li').length, 1, '#preview does not contain at least one <li> ');
          FCC_Global.assert.isAtLeast(document.querySelectorAll('#preview blockquote').length, 1, '#preview does not contain at least one <blockquote> ');
          FCC_Global.assert.isAtLeast(document.querySelectorAll('#preview img').length, 1, '#preview does not contain at least one <img> ');
          FCC_Global.assert.isAtLeast(document.querySelectorAll('#preview strong').length, 1, '#preview does not contain at least one <strong> ');

          // then check a couple of elements to make sure the present elements
          //are actually the ones represented by the markdown:

          // find matching H1 element
          const h1Text = /#\s.*/.exec(markdown)[0].slice(2);
          const h1Match = [];
          document.querySelectorAll('#preview h1').forEach(h1 => {
            if (h1.innerText === h1Text)
              h1Match.push(h1);
            }
          );
          FCC_Global.assert.isAtLeast(h1Match.length, 1, '#preview does not contain the H1 element represented by the markdown in the #editor field with the inner text ' + h1Text + ' ');

          // find matching H2 element
          const h2Text = /##\s.*/.exec(markdown)[0].slice(3);
          const h2Match = [];
          document.querySelectorAll('#preview h2').forEach(h2 => {
            if (h2.innerText === h2Text)
              h2Match.push(h2);
            }
          );
          FCC_Global.assert.isAtLeast(h2Match.length, 1, '#preview does not contain the H2 element represented by the markdown in the #editor field with the inner text ' + h2Text + ' ');
        });

      });

      it('8. OPTIONAL BONUS: When I click a link rendered by my markdown previewer, the link is opened up in a new tab (HINT: read the Marked.js docs for this one!)', function() {
        const links = document.querySelectorAll('#preview a');
        const linksWithTarget_Blank = [];
        links.forEach(a => {
          if (a.hasAttribute('target')) {
            FCC_Global.assert.strictEqual(a.target, '_blank');
          }
        });

      });

      it('9. OPTIONAL BONUS: My markdown previewer interprets carriage returns and renders them as line break', function() {
        // see marked.js options for this and more cool features
      });

    }); // END #Tests
  }); // END Mardown Previewer tests
} // END createMarkdownPreviewerTests()
