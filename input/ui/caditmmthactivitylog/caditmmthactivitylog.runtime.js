// @ts-nocheck
/* eslint-disable no-undef */
(function (widgetName, isIDE) {
  let widgets = isIDE ? TW.IDE.Widgets : TW.Runtime.Widgets;
  widgets[widgetName] = function () {
    let config = TW.Widget.widgetWrapper.config(widgetName);
    TW.Widget.widgetWrapper.inject(config.elementName, this, config, isIDE);

    //[ custom code
       this.serviceInvoked = function (serviceName) {
          TW.log.error(
            'Link widget, unexpected serviceName invoked "' + serviceName + '"'
          );
      };
//]
  };

  let config = TW.Widget.widgetWrapper.config(widgetName); // = config;
  TW.Widget.widgetWrapper.loadImports(config.imports);
})("caditmmthactivitylog", false);
