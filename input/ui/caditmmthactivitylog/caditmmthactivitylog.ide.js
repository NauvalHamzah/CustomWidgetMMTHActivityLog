/* eslint-disable no-undef */
(function (widgetName, isIDE) {
  let widgets = isIDE ? TW.IDE.Widgets : TW.Runtime.Widgets;
  widgets[widgetName] = function () {
    let config = TW.Widget.widgetWrapper.config(widgetName);
    TW.Widget.widgetWrapper.inject(config.elementName, this, config, isIDE);
    this.widgetIconUrl = function () {
       return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAk1BMVEX///8ES3kARnYASXgARHUAOm8AQXMAN23v8/VQdJQgV4HZ4OZ2j6gAPXEAP3KZq70ANGw+aIxphqEAMmvo7PBJb5E0Yoh/laz4+vususjCzNZcfJq+ydRmg5/R2eHp7fGntcSOorYALmkbVH+HnLKTprnf4+nU2+O3w9A5ZImgscFXeZgAJmUAIWMADl0AAFoAHGFVnlbcAAAAVUlEQVR4nGNgYGBgZEAFTOgijOgqGLjAIoJcQMANUQLWw8XGyMimDhXgZRQEamRkgRkCVoEmwMrPIIZPhTAjO7IZILdhcTCyC3E6XRHhOXEwSxybDgDSwAF9KIjXBQAAAABJRU5ErkJggg==";
};
    //[ custom code

    //]
  };

  let config = TW.Widget.widgetWrapper.config(widgetName); // = config;
  TW.Widget.widgetWrapper.loadImports(config.imports);
})("caditmmthactivitylog", true);
