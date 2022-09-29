const vscode = require('vscode');
const moment = require('moment');

module.exports = {

  activate(context) {
    let disposable = vscode.commands.registerTextEditorCommand('dateversion.insertupdate',(editor,edit)=>{
      let now = moment();
      let date_part = now;
      let minor_part = 1;

      if ( editor.selection.isSingleLine ) {
        let current_selection = editor.document.getText(new vscode.Range(editor.selection.start,editor.selection.end));
        if ( current_selection.length == 10 ) {
          date_part = moment(current_selection.substring(0,8),'YYYYMMDD',true);
          minor_part = parseInt(current_selection.substring(8));
          if ( ! date_part || ! date_part.isValid() || ! date_part.isSame(now,'day') ) {
            date_part = now;
            minor_part = 0;
          }
          if ( isNaN(minor_part) || minor_part >= 99 || minor_part < 0 ) minor_part = 0;
          minor_part++;
        }
      }

      minor_part = ''+ minor_part;//coerce to string
      edit.replace(editor.selection,date_part.format('YYYYMMDD') + minor_part.padStart(2,'0'));

    });
    context.subscriptions.push(disposable);
  },

};
